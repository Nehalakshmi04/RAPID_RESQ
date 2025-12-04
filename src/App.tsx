
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import EmergencyHelp from '@/pages/EmergencyHelp';
import ProfessionalHelp from '@/pages/ProfessionalHelp';
import BookConsultation from '@/pages/BookConsultation';
import PetCare from '@/pages/PetCare';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import VolunteerDashboard from '@/pages/VolunteerDashboard';
import HelpseekerDashboard from '@/pages/HelpseekerDashboard';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import WomenSafety from '@/pages/WomenSafety';
import AnimalRescue from '@/pages/AnimalRescue';
import PetCareServices from '@/pages/PetCareServices';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/emergency-help" element={<EmergencyHelp />} />
          <Route path="/professional-help" element={<ProfessionalHelp />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/petcare" element={<PetCare />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/helpseeker-dashboard" element={<HelpseekerDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* New service pages */}
          <Route path="/women-safety" element={<WomenSafety />} />
          <Route path="/animal-rescue" element={<AnimalRescue />} />
          <Route path="/pet-care-services" element={<PetCareServices />} />
          
          {/* Placeholder routes for other services */}
          <Route path="/accident-help" element={<EmergencyHelp />} />
          <Route path="/fire-emergency" element={<EmergencyHelp />} />
          <Route path="/mental-health-services" element={<ProfessionalHelp />} />
          <Route path="/legal-services" element={<ProfessionalHelp />} />
          <Route path="/financial-services" element={<ProfessionalHelp />} />
          <Route path="/tutoring-services" element={<ProfessionalHelp />} />
          <Route path="/veterinary-services" element={<PetCareServices />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
