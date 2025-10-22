import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ToursManager from "@/components/admin/ToursManager";
import DestinationsManager from "@/components/admin/DestinationsManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import { Loader2 } from "lucide-react";

const AdminPanel = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">Admin Panel</CardTitle>
              <CardDescription>
                Manage your tours, destinations, and testimonials
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="tours" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tours">Tours</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tours" className="mt-6">
              <ToursManager />
            </TabsContent>
            
            <TabsContent value="destinations" className="mt-6">
              <DestinationsManager />
            </TabsContent>
            
            <TabsContent value="testimonials" className="mt-6">
              <TestimonialsManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
