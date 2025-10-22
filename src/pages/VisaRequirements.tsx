import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileCheck, Clock, DollarSign, FileText } from "lucide-react";

const VisaRequirements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Visa Requirements for Kenya</h1>
          
          <div className="bg-primary/10 border-l-4 border-primary p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-semibold text-foreground">
              Most visitors to Kenya require a visa. Below is essential information to help you prepare for your safari adventure.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Kenya eVisa System</h2>
              <p className="text-muted-foreground mb-4">
                Kenya operates an electronic visa (eVisa) system, making it easy to apply for your visa online before traveling.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-border rounded-lg p-6">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Processing Time</h3>
                  <p className="text-muted-foreground">Typically 2-7 business days. Apply at least 2 weeks before your departure date.</p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <DollarSign className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Visa Fees</h3>
                  <p className="text-muted-foreground">Single entry: $51 USD. Transit visa: $21 USD. Fees are subject to change.</p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <FileCheck className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Validity</h3>
                  <p className="text-muted-foreground">Single entry visa valid for 90 days. Your passport must be valid for at least 6 months.</p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <FileText className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Easy Application</h3>
                  <p className="text-muted-foreground">Apply online at evisa.go.ke with your passport and travel details.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How to Apply</h2>
              <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                <li>Visit the official Kenya eVisa portal: <a href="https://www.evisa.go.ke" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.evisa.go.ke</a></li>
                <li>Create an account and complete the online application form</li>
                <li>Upload required documents (passport copy, passport photo, travel itinerary)</li>
                <li>Pay the visa fee using a credit or debit card</li>
                <li>Receive your eVisa approval via email</li>
                <li>Print your eVisa to present upon arrival in Kenya</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Required Documents</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Valid passport with at least 6 months validity and 2 blank pages</li>
                <li>Recent passport-size photograph (digital copy)</li>
                <li>Copy of your passport bio page</li>
                <li>Travel itinerary or hotel booking confirmation</li>
                <li>Return/onward flight ticket</li>
                <li>Credit/debit card for payment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Visa-Exempt Countries</h2>
              <p className="text-muted-foreground mb-4">
                Citizens of certain countries may be exempt from visa requirements or eligible for visa-on-arrival. These include some East African Community members. Check the official Kenya immigration website for the most current list.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">East Africa Tourist Visa</h2>
              <p className="text-muted-foreground mb-4">
                If you plan to visit Kenya, Uganda, and Rwanda, consider the East Africa Tourist Visa ($100 USD), which allows multiple entries to all three countries for 90 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Important Tips</h2>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <p className="text-muted-foreground">✓ Apply early to avoid last-minute issues</p>
                <p className="text-muted-foreground">✓ Double-check all information before submitting</p>
                <p className="text-muted-foreground">✓ Print multiple copies of your eVisa approval</p>
                <p className="text-muted-foreground">✓ Keep digital copies accessible on your phone</p>
                <p className="text-muted-foreground">✓ Ensure your passport has blank pages for stamps</p>
                <p className="text-muted-foreground">✓ Contact your embassy if you have special circumstances</p>
              </div>
            </section>

            <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-foreground mb-3">Disclaimer</h2>
              <p className="text-muted-foreground">
                Visa requirements can change. Always verify current requirements with the official Kenya immigration website or your local Kenyan embassy before traveling. MB Travels provides this information as a guide only.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisaRequirements;
