import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Loading testimonials...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent/10 border border-accent/20">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Traveler Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from adventurers who've explored Africa with us
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="card-elevated animate-scale-in relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote decoration */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-16 w-16 text-primary" />
                </div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Stars */}
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating 
                            ? "fill-accent text-accent" 
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-8 leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
