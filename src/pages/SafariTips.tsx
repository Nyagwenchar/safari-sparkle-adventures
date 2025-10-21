import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SafariTips = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Safari Tips & Advice</h1>
          <p className="text-muted-foreground">Expert tips for your African safari adventure.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SafariTips;
