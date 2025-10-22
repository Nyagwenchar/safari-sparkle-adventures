import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, UserPlus, Lock } from "lucide-react";

const AdminInstructions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl">Admin Panel Access</CardTitle>
              </div>
              <CardDescription>
                How to access and use the admin panel to manage your website content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <UserPlus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Step 1: Create an Account</h3>
                    <p className="text-muted-foreground mb-3">
                      The first user to sign up automatically becomes an admin. If you haven't created an account yet, click the button below to sign up.
                    </p>
                    <Button onClick={() => navigate("/auth")}>
                      Sign Up / Sign In
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Step 2: Access the Admin Panel</h3>
                    <p className="text-muted-foreground mb-3">
                      Once signed in as an admin, you'll see an "Admin" button in the navigation menu. Click it to access the admin panel where you can:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Add, edit, and delete tours</li>
                      <li>Manage destinations</li>
                      <li>Update testimonials</li>
                      <li>Upload tour images</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6">
                  <h4 className="font-bold mb-2 text-accent">Important Note</h4>
                  <p className="text-sm text-muted-foreground">
                    Only the first user to sign up gets admin privileges automatically. If you need to make additional users admins, you'll need to update their role in the database.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => navigate("/auth")} size="lg">
                    Get Started
                  </Button>
                  <Button onClick={() => navigate("/")} variant="outline" size="lg">
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInstructions;
