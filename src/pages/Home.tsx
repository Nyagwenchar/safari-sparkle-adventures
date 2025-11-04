import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Quick Links Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Discover Africa with MB Travels
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your gateway to unforgettable African adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-8 flex-col gap-3 hover:border-primary hover:bg-primary/5 bg-card/60 backdrop-blur-sm border-2 rounded-2xl"
              onClick={() => handleQuickLinkClick("/tours")}
            >
              <span className="text-2xl font-bold">Explore Tours</span>
              <span className="text-muted-foreground">Discover our curated safari experiences</span>
              <ArrowRight className="h-5 w-5 text-primary" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-auto py-8 flex-col gap-3 hover:border-primary hover:bg-primary/5 bg-card/60 backdrop-blur-sm border-2 rounded-2xl"
              onClick={() => handleQuickLinkClick("/destinations")}
            >
              <span className="text-2xl font-bold">Our Destinations</span>
              <span className="text-muted-foreground">Explore the wonders of Kenya</span>
              <ArrowRight className="h-5 w-5 text-primary" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-auto py-8 flex-col gap-3 hover:border-primary hover:bg-primary/5 bg-card/60 backdrop-blur-sm border-2 rounded-2xl"
              onClick={() => handleQuickLinkClick("/contact")}
            >
              <span className="text-2xl font-bold">Book Now</span>
              <span className="text-muted-foreground">Start planning your adventure</span>
              <ArrowRight className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
