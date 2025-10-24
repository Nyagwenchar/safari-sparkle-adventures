import { useState, useEffect } from "react";
import TourCard from "./TourCard";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Tours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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
          bookingCount: tour.booking_count || 0,
        })) || [];

        // Sort: featured tours first, then by booking count
        mappedTours.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.bookingCount - a.bookingCount;
        });

        setTours(mappedTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topBookedTours = tours
    .filter(tour => tour.bookingCount > 0)
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 3);

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
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Safari Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully curated adventures designed to showcase Africa's most incredible destinations
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tours by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          {showSuggestions && searchQuery === "" && topBookedTours.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-medium text-muted-foreground">Most Booked Tours</p>
              </div>
              {topBookedTours.map((tour) => (
                <button
                  key={tour.tourId}
                  onClick={() => {
                    setSearchQuery(tour.title);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <span>🔥</span>
                  <span className="text-foreground">{tour.title}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {tour.bookingCount} bookings
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredTours.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">
              {searchQuery ? "No tours match your search." : "No tours available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredTours.map((tour, index) => (
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
