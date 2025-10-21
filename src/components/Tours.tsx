import TourCard from "./TourCard";
import wildlifeImage from "@/assets/tour-wildlife.jpg";
import mountainImage from "@/assets/tour-mountain.jpg";
import beachImage from "@/assets/tour-beach.jpg";
import cultureImage from "@/assets/tour-culture.jpg";

const Tours = () => {
  const tours = [
    {
      tourId: "maasai-mara-safari",
      title: "Maasai Mara Safari",
      description: "Experience the Great Migration and witness the Big Five in their natural habitat. Expert guides, luxury camps, and unforgettable wildlife encounters await.",
      image: wildlifeImage,
      duration: "5 Days / 4 Nights",
      groupSize: "Up to 6 people",
      location: "Maasai Mara, Kenya",
      price: "$2,499",
      featured: true,
    },
    {
      tourId: "kilimanjaro-adventure",
      title: "Kilimanjaro Adventure",
      description: "Conquer Africa's highest peak on this challenging yet rewarding expedition. Professional mountain guides ensure your safety on this bucket-list climb.",
      image: mountainImage,
      duration: "7 Days / 6 Nights",
      groupSize: "Up to 8 people",
      location: "Mount Kilimanjaro, Tanzania",
      price: "$3,299",
      featured: true,
    },
    {
      tourId: "coastal-paradise",
      title: "Coastal Paradise",
      description: "Relax on pristine white-sand beaches along the Indian Ocean. Snorkeling, dhow cruises, and fresh seafood in a tropical paradise setting.",
      image: beachImage,
      duration: "4 Days / 3 Nights",
      groupSize: "Up to 10 people",
      location: "Diani Beach, Kenya",
      price: "$1,899",
    },
    {
      tourId: "cultural-immersion",
      title: "Cultural Immersion",
      description: "Connect with local Maasai communities, learn traditional crafts, witness ceremonial dances, and experience authentic African hospitality.",
      image: cultureImage,
      duration: "3 Days / 2 Nights",
      groupSize: "Up to 12 people",
      location: "Maasai Villages, Kenya",
      price: "$999",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.title}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TourCard {...tour} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;
