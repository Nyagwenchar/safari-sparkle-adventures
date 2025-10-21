import Navigation from "@/components/Navigation";
import Tours from "@/components/Tours";
import Footer from "@/components/Footer";

const ToursPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Tours />
      </div>
      <Footer />
    </div>
  );
};

export default ToursPage;
