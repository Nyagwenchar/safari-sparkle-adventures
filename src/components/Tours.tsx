import { useState, useEffect } from "react";
import TourCard from "./TourCard";
import { supabase } from "@/integrations/supabase/client";

const Tours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Map database fields to component props
        const mappedTours = data?.map(tour => ({
          tourId: tour.tour_id,
          title: tour.title,
          description: tour.description,
          image: tour.image_url,
          duration: tour.duration,
          groupSize: tour.group_size,
          location: tour.location,
          price: tour.price,
          featured: tour.featured,
        })) || [];

        setTours(mappedTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <section id="tours" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">Loading tours...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tours" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Safari Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully curated adventures designed to showcase Africa's most incredible destinations
          </p>
        </div>

        {tours.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">No tours available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tours.map((tour, index) => (
              <div
                key={tour.tourId}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TourCard {...tour} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tours;
