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

interface Destination {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

const iconOptions = [
  { value: "MapPin", label: "Map Pin" },
  { value: "Mountain", label: "Mountain" },
  { value: "Waves", label: "Waves" },
  { value: "Camera", label: "Camera" },
  { value: "Compass", label: "Compass" },
  { value: "Palmtree", label: "Palm Tree" },
];

const DestinationsManager = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    highlight: "",
    icon: "MapPin",
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDestinations(data || []);
    } catch (error: any) {
      toast.error("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDestination) {
        const { error } = await supabase
          .from("destinations")
          .update(formData)
          .eq("id", editingDestination.id);

        if (error) throw error;
        toast.success("Destination updated successfully");
      } else {
        const { error } = await supabase
          .from("destinations")
          .insert([formData]);

        if (error) throw error;
        toast.success("Destination created successfully");
      }

      setDialogOpen(false);
      resetForm();
      fetchDestinations();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    try {
      const { error } = await supabase
        .from("destinations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Destination deleted successfully");
      fetchDestinations();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setFormData({
      title: destination.title,
      description: destination.description,
      highlight: destination.highlight,
      icon: destination.icon,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingDestination(null);
    setFormData({
      title: "",
      description: "",
      highlight: "",
      icon: "MapPin",
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
          <CardTitle>Destinations Management</CardTitle>
          <CardDescription>Add, edit, or remove destinations</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDestination ? "Edit Destination" : "Add New Destination"}</DialogTitle>
              <DialogDescription>
                {editingDestination ? "Update destination information" : "Create a new destination"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="highlight">Highlight</Label>
                <Input
                  id="highlight"
                  value={formData.highlight}
                  onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                  placeholder="Best for: Wildlife Photography"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDestination ? "Update" : "Create"}
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
              <TableHead>Description</TableHead>
              <TableHead>Highlight</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No destinations found. Add your first destination to get started.
                </TableCell>
              </TableRow>
            ) : (
              destinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell className="font-medium">{destination.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{destination.description}</TableCell>
                  <TableCell>{destination.highlight}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(destination)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(destination.id)}
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

export default DestinationsManager;
