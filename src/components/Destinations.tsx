import { useState, useEffect } from "react";
import { MapPin, Camera, Mountain, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Destinations = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map icon strings to icon components
  const iconMap: { [key: string]: any } = {
    MapPin,
    Camera,
    Mountain,
    Waves,
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Map database fields including icon strings to components
        const mappedDestinations = data?.map(dest => ({
          icon: iconMap[dest.icon] || MapPin, // fallback to MapPin if icon not found
          title: dest.title,
          description: dest.description,
          highlight: dest.highlight,
        })) || [];

        setDestinations(mappedDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section id="destinations" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">Loading destinations...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore Our Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From vast savannas to pristine beaches, discover Kenya's diverse landscapes
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">No destinations available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => {
              const Icon = destination.icon;
              return (
                <Card
                  key={destination.title}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/70 backdrop-blur-sm border-2 rounded-2xl animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {destination.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {destination.description}
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {destination.highlight}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
