import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BookingTerms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Booking Terms & Conditions</h1>
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Booking & Payment</h2>
              <p>A deposit of 30% is required to confirm your booking.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingTerms;
