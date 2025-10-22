import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Heart, Plane, AlertCircle } from "lucide-react";

const TravelInsurance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Travel Insurance</h1>
          
          <div className="bg-primary/10 border-l-4 border-primary p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-semibold text-foreground">
              We strongly recommend all travelers purchase comprehensive travel insurance before embarking on their safari adventure.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why Travel Insurance?</h2>
              <p className="text-muted-foreground mb-6">
                Safari adventures involve unique circumstances and potential risks. Travel insurance provides peace of mind and financial protection against unexpected events.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-6">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Trip Cancellation</h3>
                  <p className="text-muted-foreground">Protection if you need to cancel your trip due to illness, family emergencies, or other covered reasons.</p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <Heart className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Medical Coverage</h3>
                  <p className="text-muted-foreground">Coverage for medical emergencies, hospital stays, and medical evacuations while traveling.</p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <Plane className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Travel Delays</h3>
                  <p className="text-muted-foreground">Compensation for additional expenses due to flight delays, cancellations, or missed connections.</p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <AlertCircle className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Lost Belongings</h3>
                  <p className="text-muted-foreground">Coverage for lost, stolen, or damaged luggage and personal items during your trip.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What to Look For</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Emergency medical coverage of at least $100,000</li>
                <li>Emergency medical evacuation coverage</li>
                <li>Trip cancellation and interruption coverage</li>
                <li>24/7 emergency assistance services</li>
                <li>Coverage for adventure activities (safari-specific)</li>
                <li>Baggage and personal effects coverage</li>
                <li>Pre-existing medical condition waivers (if applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Recommended Providers</h2>
              <p className="text-muted-foreground mb-4">
                While MB Travels does not sell insurance directly, we recommend researching reputable providers such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>World Nomads</li>
                <li>Allianz Global Assistance</li>
                <li>Travel Guard</li>
                <li>IMG Global</li>
                <li>Your local insurance provider</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Important Notes</h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  ✓ Purchase insurance as soon as you book your trip for maximum coverage
                </p>
                <p className="text-muted-foreground mb-4">
                  ✓ Read the policy carefully to understand what is and isn't covered
                </p>
                <p className="text-muted-foreground mb-4">
                  ✓ Keep all insurance documents accessible during your trip
                </p>
                <p className="text-muted-foreground">
                  ✓ Contact your insurance provider immediately if you need to make a claim
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelInsurance;
