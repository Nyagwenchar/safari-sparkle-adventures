import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Calendar, ArrowLeft, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import wildlifeImage from "@/assets/tour-wildlife.jpg";
import mountainImage from "@/assets/tour-mountain.jpg";
import beachImage from "@/assets/tour-beach.jpg";
import cultureImage from "@/assets/tour-culture.jpg";

const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const tours = {
    "maasai-mara-safari": {
      title: "Maasai Mara Safari",
      description: "Experience the Great Migration and witness the Big Five in their natural habitat.",
      image: wildlifeImage,
      duration: "5 Days / 4 Nights",
      groupSize: "Up to 6 people",
      location: "Maasai Mara, Kenya",
      price: "$2,499",
      featured: true,
      fullDescription: "Embark on an unforgettable journey through the Maasai Mara, one of Africa's most iconic wildlife reserves.",
      includes: ["Professional safari guide", "Luxury tented accommodation", "All meals and beverages", "Game drives twice daily", "Park entrance fees", "Airport transfers"],
      itinerary: [
        { day: 1, title: "Arrival & Orientation", description: "Meet your guide and settle into your luxury camp" },
        { day: 2, title: "Morning & Evening Game Drive", description: "Witness incredible wildlife in their natural habitat" },
        { day: 3, title: "Full Day Safari", description: "Experience the Great Migration up close" },
        { day: 4, title: "Cultural Village Visit", description: "Meet local Maasai communities" },
        { day: 5, title: "Departure", description: "Final morning drive and transfer to airport" }
      ]
    },
    "kilimanjaro-adventure": {
      title: "Kilimanjaro Adventure",
      description: "Conquer Africa's highest peak.",
      image: mountainImage,
      duration: "7 Days / 6 Nights",
      groupSize: "Up to 8 people",
      location: "Mount Kilimanjaro, Tanzania",
      price: "$3,299",
      featured: true,
      fullDescription: "Challenge yourself with a trek to the roof of Africa.",
      includes: ["Experienced mountain guides", "Mountain hut accommodation", "All meals during trek", "Porter services", "Safety equipment", "Park fees and permits"],
      itinerary: [
        { day: 1, title: "Arrival", description: "Pre-climb briefing" },
        { day: 2, title: "Rainforest Zone", description: "Begin ascent" },
        { day: 3, title: "Moorland Zone", description: "Trek to higher elevations" },
        { day: 4, title: "Alpine Desert", description: "Acclimatization day" },
        { day: 5, title: "Arctic Zone", description: "Prepare for summit" },
        { day: 6, title: "Summit Day", description: "Reach Uhuru Peak" },
        { day: 7, title: "Descent", description: "Return and celebrate" }
      ]
    },
    "coastal-paradise": {
      title: "Coastal Paradise",
      description: "Relax on pristine beaches.",
      image: beachImage,
      duration: "4 Days / 3 Nights",
      groupSize: "Up to 10 people",
      location: "Diani Beach, Kenya",
      price: "$1,899",
      featured: false,
      fullDescription: "Discover the stunning Kenyan coast.",
      includes: ["Beachfront resort", "Daily meals", "Snorkeling equipment", "Dhow cruise", "Airport transfers", "All activities"],
      itinerary: [
        { day: 1, title: "Beach Arrival", description: "Check in and relax" },
        { day: 2, title: "Snorkeling", description: "Explore coral reefs" },
        { day: 3, title: "Dhow Cruise", description: "Sunset sailing" },
        { day: 4, title: "Departure", description: "Final beach morning" }
      ]
    },
    "cultural-immersion": {
      title: "Cultural Immersion",
      description: "Connect with Maasai communities.",
      image: cultureImage,
      duration: "3 Days / 2 Nights",
      groupSize: "Up to 12 people",
      location: "Maasai Villages, Kenya",
      price: "$999",
      featured: false,
      fullDescription: "Experience authentic Maasai culture.",
      includes: ["Cultural guide", "Traditional accommodation", "All meals", "Craft workshops", "Dance performances", "Transportation"],
      itinerary: [
        { day: 1, title: "Village Welcome", description: "Traditional ceremony" },
        { day: 2, title: "Cultural Activities", description: "Learn beadwork and cooking" },
        { day: 3, title: "Farewell", description: "Ceremonial dance" }
      ]
    }
  };

  const tour = tours[tourId as keyof typeof tours];

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
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
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
            <section>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Overview</h2>
              <p className="text-lg text-muted-foreground">{tour.fullDescription}</p>
            </section>

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
                    <span>{tour.groupSize}</span>
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
