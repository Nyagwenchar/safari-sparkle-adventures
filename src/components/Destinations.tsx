import { useState, useEffect } from "react";
import { MapPin, Camera, Mountain, Waves, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Destinations = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

        const mappedDestinations = data?.map(dest => ({
          icon: iconMap[dest.icon] || MapPin,
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
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Loading destinations...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 section-nature" />
      <div className="absolute inset-0 pattern-lines" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-secondary/10 border border-secondary/20">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Top Destinations</span>
          </div>
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
                  className="group card-elevated animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    {/* Decorative header */}
                    <div className="h-24 bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 relative">
                      <div className="absolute inset-0 pattern-dots opacity-30" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 rounded-2xl bg-card shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border/50">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-12 pb-6 px-6 text-center">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {destination.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {destination.description}
                      </p>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                        {destination.highlight}
                      </div>
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
