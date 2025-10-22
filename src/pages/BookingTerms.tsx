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
              <p>A deposit of 30% of the total tour cost is required to confirm your booking. The remaining balance must be paid no later than 60 days before the tour departure date.</p>
              <p>Payment can be made via bank transfer, credit card, or other methods as agreed upon.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>More than 90 days before departure: 10% cancellation fee</li>
                <li>60-90 days before departure: 30% cancellation fee</li>
                <li>30-59 days before departure: 50% cancellation fee</li>
                <li>Less than 30 days before departure: 100% cancellation fee (no refund)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Travel Documents</h2>
              <p>It is the traveler's responsibility to ensure all travel documents (passport, visa, vaccination certificates) are valid and up to date. MB Travels is not responsible for any issues arising from invalid or missing documentation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Health & Safety</h2>
              <p>Travelers must inform MB Travels of any medical conditions, dietary requirements, or special needs at the time of booking. We recommend consulting with your physician regarding necessary vaccinations and health precautions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Travel Insurance</h2>
              <p>We strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical expenses, emergency evacuation, and loss of belongings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Liability</h2>
              <p>MB Travels acts as an agent for tour operators, hotels, and other service providers. While we take every precaution to ensure quality services, we are not liable for any injury, loss, or damage caused by third-party providers or circumstances beyond our control.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Itinerary</h2>
              <p>MB Travels reserves the right to modify tour itineraries due to weather conditions, safety concerns, or other unforeseen circumstances. Every effort will be made to provide comparable alternatives.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p>For questions regarding our booking terms, please contact us directly. We're here to help ensure your safari experience is smooth from start to finish.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingTerms;
