import { useState, useEffect } from "react";
import TourCard from "./TourCard";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";
import { Search, Compass } from "lucide-react";

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
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Loading tours...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tours" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Curated Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Safari Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully curated adventures designed to showcase Africa's most incredible destinations
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tours by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-12 h-14 text-base rounded-2xl border-2 bg-card shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
          
          {showSuggestions && searchQuery === "" && topBookedTours.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card border-2 border-border rounded-2xl shadow-xl z-20 overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground">🔥 Most Booked Tours</p>
              </div>
              {topBookedTours.map((tour) => (
                <button
                  key={tour.tourId}
                  onClick={() => {
                    setSearchQuery(tour.title);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3"
                >
                  <span className="text-foreground font-medium">{tour.title}</span>
                  <span className="text-xs text-muted-foreground ml-auto px-2 py-1 bg-muted rounded-full">
                    {tour.bookingCount} bookings
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-xl text-muted-foreground">
              {searchQuery ? "No tours match your search." : "No tours available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
