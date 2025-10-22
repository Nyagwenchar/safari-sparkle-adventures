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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from("testimonials")
          .update(formData)
          .eq("id", editingTestimonial.id);

        if (error) throw error;
        toast.success("Testimonial updated successfully");
      } else {
        const { error } = await supabase
          .from("testimonials")
          .insert([formData]);

        if (error) throw error;
        toast.success("Testimonial created successfully");
      }

      setDialogOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      text: testimonial.text,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      location: "",
      rating: 5,
      text: "",
    });
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
          <CardTitle>Testimonials Management</CardTitle>
          <CardDescription>Add, edit, or remove testimonials</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? "Update testimonial information" : "Create a new testimonial"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="New York, USA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">Testimonial Text</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? "Update" : "Create"}
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
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Text</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No testimonials found. Add your first testimonial to get started.
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.location}</TableCell>
                  <TableCell>{testimonial.rating} ⭐</TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.text}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialsManager;
