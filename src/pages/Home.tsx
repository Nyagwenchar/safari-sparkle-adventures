import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, MapPin, Compass, Calendar, Users, Shield, Award } from "lucide-react";
import tourBeach from "@/assets/tour-beach.jpg";
import tourWildlife from "@/assets/tour-wildlife.jpg";
import tourMountain from "@/assets/tour-mountain.jpg";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLinkClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  const features = [
    { icon: Shield, title: "Safe & Secure", desc: "Licensed and insured tours" },
    { icon: Award, title: "Expert Guides", desc: "Local knowledge experts" },
    { icon: Users, title: "Small Groups", desc: "Personalized experiences" },
    { icon: Calendar, title: "Flexible Booking", desc: "Easy rescheduling" },
  ];

  const destinations = [
    { image: tourWildlife, title: "Safari Adventures", location: "Masai Mara" },
    { image: tourBeach, title: "Coastal Escapes", location: "Diani Beach" },
    { image: tourMountain, title: "Mountain Treks", location: "Mount Kenya" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* Features Strip */}
      <section className="py-6 bg-primary/5 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section with Images */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-primary font-medium mb-2 uppercase tracking-wider text-sm">Your Journey Starts Here</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Discover Africa with MB Travels
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your gateway to unforgettable African adventures, curated with care and expertise
            </p>
          </div>

          {/* Destination Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {destinations.map((dest, index) => (
              <Card 
                key={dest.title}
                className="group overflow-hidden card-elevated cursor-pointer"
                onClick={() => handleQuickLinkClick("/tours")}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-1">
                      <MapPin className="h-4 w-4" />
                      <span>{dest.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary-foreground">{dest.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card 
              className="card-elevated group cursor-pointer"
              onClick={() => handleQuickLinkClick("/tours")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Explore Tours</h3>
                <p className="text-muted-foreground mb-4">Discover our curated safari experiences</p>
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                  <span>View All Tours</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="card-elevated group cursor-pointer"
              onClick={() => handleQuickLinkClick("/destinations")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Our Destinations</h3>
                <p className="text-muted-foreground mb-4">Explore the wonders of Kenya</p>
                <div className="flex items-center justify-center gap-2 text-secondary font-medium">
                  <span>See Destinations</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="card-elevated group cursor-pointer bg-gradient-to-br from-primary to-primary/80"
              onClick={() => handleQuickLinkClick("/contact")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-foreground">Book Now</h3>
                <p className="text-primary-foreground/80 mb-4">Start planning your adventure</p>
                <div className="flex items-center justify-center gap-2 text-primary-foreground font-medium">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 section-nature" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-secondary font-medium mb-2 uppercase tracking-wider text-sm">Why MB Travels</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Experience Africa Like Never Before
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              With over a decade of experience, we've crafted the perfect blend of adventure, 
              comfort, and authentic cultural immersion. Our expert guides and carefully designed 
              itineraries ensure every moment of your journey is extraordinary.
            </p>
            <Button 
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={() => handleQuickLinkClick("/about")}
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
