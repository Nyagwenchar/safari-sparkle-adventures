import Navigation from "@/components/Navigation";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Destinations />
      </div>
      <Footer />
    </div>
  );
};

export default DestinationsPage;
