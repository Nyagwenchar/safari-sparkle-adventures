import { MapPin, Camera, Mountain, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Destinations = () => {
  const destinations = [
    {
      icon: MapPin,
      title: "Maasai Mara",
      description: "Witness the spectacular Great Migration and explore endless savannas teeming with wildlife",
      highlight: "Best for: Wildlife Photography",
    },
    {
      icon: Mountain,
      title: "Mount Kenya",
      description: "Challenge yourself with Africa's second-highest peak and experience alpine ecosystems",
      highlight: "Best for: Adventure Seekers",
    },
    {
      icon: Waves,
      title: "Coastal Kenya",
      description: "Pristine beaches, coral reefs, and centuries-old Swahili culture along the Indian Ocean",
      highlight: "Best for: Beach Lovers",
    },
    {
      icon: Camera,
      title: "Amboseli",
      description: "Iconic views of elephants against the backdrop of Mount Kilimanjaro",
      highlight: "Best for: Photography",
    },
  ];

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
      </div>
    </section>
  );
};

export default Destinations;
