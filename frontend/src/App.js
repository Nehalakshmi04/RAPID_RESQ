import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import DomainSelection from './pages/DomainSelection';
import VolunteerDashboard from './pages/VolunteerDashboard';
import HelpSeekerDashboard from './pages/HelpSeekerDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import RequestHelp from './pages/RequestHelp';
import TrackRequest from './pages/TrackRequest';
import LegalAid from './pages/professional/LegalAid';
import FinancialSupport from './pages/professional/FinancialSupport';
import MentalHealth from './pages/professional/MentalHealth';
import WeekendTutoring from './pages/professional/WeekendTutoring';
import PetCare from './pages/PetCare';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/domain-selection" element={<DomainSelection />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/helpseeker-dashboard" element={<HelpSeekerDashboard />} />
          <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
          <Route path="/request-help" element={<RequestHelp />} />
          <Route path="/track-request/:requestId" element={<TrackRequest />} />
          <Route path="/professional/legal-aid" element={<LegalAid />} />
          <Route path="/professional/financial-support" element={<FinancialSupport />} />
          <Route path="/professional/mental-health" element={<MentalHealth />} />
          <Route path="/professional/weekend-tutoring" element={<WeekendTutoring />} />
          <Route path="/pet-care" element={<PetCare />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
