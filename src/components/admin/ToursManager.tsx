import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Tour {
  id: string;
  tour_id: string;
  title: string;
  description: string;
  image_url: string;
  duration: string;
  group_size: string;
  location: string;
  price: string;
  featured: boolean;
  overview?: string;
  includes?: string[];
  itinerary?: { day: number; title: string; description: string }[];
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

const ToursManager = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    tour_id: "",
    title: "",
    description: "",
    image_url: "",
    duration: "",
    group_size: "",
    location: "",
    price: "",
    featured: false,
    overview: "",
    includes: [] as string[],
    itinerary: [] as ItineraryDay[],
  });
  const [newInclude, setNewInclude] = useState("");
  const [newItinerary, setNewItinerary] = useState<ItineraryDay>({
    day: 1,
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const mappedTours = data?.map(tour => ({
        ...tour,
        includes: (tour.includes as unknown as string[]) || [],
        itinerary: (tour.itinerary as unknown as ItineraryDay[]) || [],
      })) || [];
      
      setTours(mappedTours);
    } catch (error: any) {
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tour-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tour-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        ...formData,
        includes: formData.includes as any,
        itinerary: formData.itinerary as any,
      };

      if (editingTour) {
        const { error } = await supabase
          .from("tours")
          .update(dataToSubmit)
          .eq("id", editingTour.id);

        if (error) throw error;
        toast.success("Tour updated successfully");
      } else {
        const { error } = await supabase
          .from("tours")
          .insert([dataToSubmit]);

        if (error) throw error;
        toast.success("Tour created successfully");
      }

      setDialogOpen(false);
      resetForm();
      fetchTours();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      const { error } = await supabase
        .from("tours")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Tour deleted successfully");
      fetchTours();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      tour_id: tour.tour_id,
      title: tour.title,
      description: tour.description,
      image_url: tour.image_url,
      duration: tour.duration,
      group_size: tour.group_size,
      location: tour.location,
      price: tour.price,
      featured: tour.featured,
      overview: tour.overview || "",
      includes: tour.includes || [],
      itinerary: tour.itinerary || [],
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTour(null);
    setFormData({
      tour_id: "",
      title: "",
      description: "",
      image_url: "",
      duration: "",
      group_size: "",
      location: "",
      price: "",
      featured: false,
      overview: "",
      includes: [],
      itinerary: [],
    });
    setNewInclude("");
    setNewItinerary({ day: 1, title: "", description: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tours Management</CardTitle>
          <CardDescription>Add, edit, or remove tours</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tour
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTour ? "Edit Tour" : "Add New Tour"}</DialogTitle>
              <DialogDescription>
                {editingTour ? "Update tour information" : "Create a new tour"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tour_id">Tour ID (URL-friendly)</Label>
                <Input
                  id="tour_id"
                  value={formData.tour_id}
                  onChange={(e) => setFormData({ ...formData, tour_id: e.target.value })}
                  placeholder="maasai-mara-safari"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Tour Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-32 w-full object-cover rounded" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="overview">Overview (Landing Page)</Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  rows={3}
                  placeholder="Embark on an unforgettable journey..."
                />
              </div>
              <div className="space-y-2">
                <Label>What's Included</Label>
                <div className="flex gap-2">
                  <Input
                    value={newInclude}
                    onChange={(e) => setNewInclude(e.target.value)}
                    placeholder="e.g., Professional safari guide"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newInclude.trim()) {
                        setFormData({ ...formData, includes: [...formData.includes, newInclude.trim()] });
                        setNewInclude("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.includes.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {formData.includes.map((item, index) => (
                      <li key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span>{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              includes: formData.includes.filter((_, i) => i !== index),
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="space-y-2">
                <Label>Itinerary</Label>
                <div className="grid grid-cols-12 gap-2">
                  <Input
                    type="number"
                    className="col-span-2"
                    value={newItinerary.day}
                    onChange={(e) => setNewItinerary({ ...newItinerary, day: parseInt(e.target.value) })}
                    placeholder="Day"
                  />
                  <Input
                    className="col-span-4"
                    value={newItinerary.title}
                    onChange={(e) => setNewItinerary({ ...newItinerary, title: e.target.value })}
                    placeholder="Title"
                  />
                  <Input
                    className="col-span-5"
                    value={newItinerary.description}
                    onChange={(e) => setNewItinerary({ ...newItinerary, description: e.target.value })}
                    placeholder="Description"
                  />
                  <Button
                    type="button"
                    className="col-span-1"
                    onClick={() => {
                      if (newItinerary.title && newItinerary.description) {
                        setFormData({
                          ...formData,
                          itinerary: [...formData.itinerary, newItinerary].sort((a, b) => a.day - b.day),
                        });
                        setNewItinerary({ day: newItinerary.day + 1, title: "", description: "" });
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.itinerary.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {formData.itinerary.map((item, index) => (
                      <li key={index} className="flex items-start justify-between bg-muted p-2 rounded">
                        <div>
                          <strong>Day {item.day}:</strong> {item.title} - {item.description}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              itinerary: formData.itinerary.filter((_, i) => i !== index),
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="5 Days / 4 Nights"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group_size">Group Size</Label>
                  <Input
                    id="group_size"
                    value={formData.group_size}
                    onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
                    placeholder="Up to 6 people"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$2,499"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="featured">Featured Tour</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTour ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No tours found. Add your first tour to get started.
                </TableCell>
              </TableRow>
            ) : (
              tours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">{tour.title}</TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>{tour.price}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell>{tour.featured ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(tour)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(tour.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ToursManager;
