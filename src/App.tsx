import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ToursPage from "./pages/ToursPage";
import DestinationsPage from "./pages/DestinationsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import TourDetails from "./pages/TourDetails";
import BookingTerms from "./pages/BookingTerms";
import TravelInsurance from "./pages/TravelInsurance";
import VisaRequirements from "./pages/VisaRequirements";
import SafariTips from "./pages/SafariTips";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tour/:tourId" element={<TourDetails />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booking-terms" element={<BookingTerms />} />
          <Route path="/travel-insurance" element={<TravelInsurance />} />
          <Route path="/visa-requirements" element={<VisaRequirements />} />
          <Route path="/safari-tips" element={<SafariTips />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
