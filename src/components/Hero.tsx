import heroImage from "@/assets/hero-safari.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown, Compass, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/10" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-accent/20 blur-2xl animate-float" />
      <div className="absolute bottom-1/3 right-16 w-32 h-32 rounded-full bg-primary/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Authentic African Adventures</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-accent text-accent" />
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary-foreground drop-shadow-2xl leading-tight">
            Discover the{" "}
            <span className="text-gradient-safari">Magic</span>
            {" "}of Africa
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-primary-foreground/90 drop-shadow-lg leading-relaxed">
            Experience unforgettable safaris, breathtaking landscapes, and authentic cultural encounters with Kenya's premier travel experts
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate('/tours')}
            >
              Explore Tours
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg bg-card/80 backdrop-blur-sm border-2 hover:bg-card text-foreground shadow-lg transition-all duration-300"
              onClick={() => navigate('/contact')}
            >
              Plan Your Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-3 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 animate-bounce hover:bg-card/80 transition-colors"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
