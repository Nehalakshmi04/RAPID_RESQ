
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import EmergencyHelp from "./pages/EmergencyHelp";
import ProfessionalHelp from "./pages/ProfessionalHelp";
import PetCare from "./pages/PetCare";
import BookConsultation from "./pages/BookConsultation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/emergency-help" element={<EmergencyHelp />} />
          <Route path="/professional-help" element={<ProfessionalHelp />} />
          <Route path="/petcare" element={<PetCare />} />
          
          {/* Emergency Routes */}
          <Route path="/emergency/accident" element={<EmergencyHelp />} />
          <Route path="/emergency/elderly" element={<EmergencyHelp />} />
          <Route path="/emergency/women-safety" element={<EmergencyHelp />} />
          <Route path="/emergency/fire" element={<EmergencyHelp />} />
          
          {/* Professional Routes */}
          <Route path="/professional/mental-health" element={<ProfessionalHelp />} />
          <Route path="/professional/legal" element={<ProfessionalHelp />} />
          <Route path="/professional/financial" element={<ProfessionalHelp />} />
          <Route path="/professional/tutoring" element={<ProfessionalHelp />} />
          
          {/* Booking Routes */}
          <Route path="/professional/:id/book" element={<BookConsultation />} />
          
          {/* Pet Care Routes */}
          <Route path="/petcare/rescue" element={<PetCare />} />
          <Route path="/petcare/services" element={<PetCare />} />
          <Route path="/petcare/emergency-report" element={<EmergencyHelp />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
