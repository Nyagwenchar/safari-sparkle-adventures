import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Calendar, ArrowLeft, Check, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Tour {
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

const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('tour_id', tourId)
          .single();

        if (error) throw error;
        
        const mappedTour: Tour = {
          ...data,
          includes: (data.includes as string[]) || [],
          itinerary: (data.itinerary as { day: number; title: string; description: string }[]) || [],
        };
        
        setTour(mappedTour);
      } catch (error) {
        console.error('Error fetching tour:', error);
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="relative h-[60vh] overflow-hidden">
        <img src={tour.image_url} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button variant="ghost" onClick={() => navigate("/tours")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />Back to Tours
            </Button>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{tour.title}</h1>
            {tour.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {tour.overview && (
              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Overview</h2>
                <p className="text-lg text-muted-foreground">{tour.overview}</p>
              </section>
            )}

            {tour.includes && tour.includes.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-foreground">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-1" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tour.itinerary && tour.itinerary.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-primary pl-6 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold text-foreground">Day {day.day}: {day.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{day.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-4xl font-bold text-primary">{tour.price}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{tour.group_size}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{tour.location}</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" onClick={() => navigate("/contact", { state: { tourName: tour.title } })}>
                  Book This Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TourDetails;
