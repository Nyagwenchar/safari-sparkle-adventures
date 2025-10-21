import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "An absolutely incredible experience! The wildlife sightings were breathtaking, and our guide was knowledgeable and passionate. MB Travels made our dream trip a reality.",
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      text: "Professional, well-organized, and truly memorable. From the luxury camps to the expert guides, every detail was perfect. Highly recommend for anyone seeking authentic safari adventures.",
    },
    {
      name: "Emma Williams",
      location: "London, UK",
      rating: 5,
      text: "The cultural immersion tour was life-changing. Meeting the Maasai community and learning about their traditions was a privilege. MB Travels respects local cultures beautifully.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from adventurers who've explored Africa with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="hover:shadow-xl transition-all duration-300 bg-card/70 backdrop-blur-sm border-2 rounded-2xl animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
