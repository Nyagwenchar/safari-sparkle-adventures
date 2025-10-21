import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const VisaRequirements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Visa Requirements</h1>
          <p className="text-muted-foreground">Most visitors require a visa for Kenya.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisaRequirements;
