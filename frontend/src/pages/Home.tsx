
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import EmergencyButton from '@/components/EmergencyButton';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Heart, 
  Shield, 
  Users, 
  MapPin, 
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    navigate('/emergency-help');
  };

  const emergencyServices = [
    {
      title: 'Accident Help',
      description: 'Immediate response for accidents with nearby volunteers and emergency services',
      icon: Phone,
      path: '/emergency/accident'
    },
    {
      title: 'Elderly Care',
      description: 'Quick assistance for elderly people in need of help',
      icon: Heart,
      path: '/emergency/elderly'
    },
    {
      title: 'Women Safety',
      description: '24/7 safety assistance for women in distress',
      icon: Shield,
      path: '/emergency/women-safety'
    },
    {
      title: 'Fire Emergency',
      description: 'Fire safety help and evacuation assistance',
      icon: Phone,
      path: '/emergency/fire'
    }
  ];

  const professionalServices = [
    {
      title: 'Mental Health Support',
      description: 'Professional counseling and mental health services',
      icon: Heart,
      path: '/professional/mental-health'
    },
    {
      title: 'Legal Aid',
      description: 'Affordable legal consultation and support',
      icon: Shield,
      path: '/professional/legal'
    },
    {
      title: 'Financial Advisory',
      description: 'Expert financial planning and advisory services',
      icon: Star,
      path: '/professional/financial'
    },
    {
      title: 'Weekend Tutoring',
      description: 'Quality education support on weekends',
      icon: Users,
      path: '/professional/tutoring'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Rapid Rescue
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Your lifeline in emergencies. Connect with volunteers instantly or access professional help when you need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <EmergencyButton onClick={handleEmergencyClick} />
            <Button
              onClick={() => navigate('/services')}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full text-lg"
            >
              Browse Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5000+</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">&lt;5 min</div>
              <div className="text-gray-600">Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Emergency Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get immediate help from nearby volunteers. Our network responds within minutes to get you the help you need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {emergencyServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isEmergency={true}
              onClick={() => navigate(service.path)}
            />
          ))}
        </div>
      </section>

      {/* Professional Services */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl mx-4 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Professional Help</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access verified professionals for mental health, legal, financial, and educational support at affordable rates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {professionalServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isProfessional={true}
              onClick={() => navigate(service.path)}
            />
          ))}
        </div>
      </section>

      {/* Pet Care Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Pet Care Services</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Help street animals or get professional care for your pets. Our network includes veterinarians and animal care specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/petcare/rescue')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full"
            >
              Report Animal in Need
            </Button>
            <Button
              onClick={() => navigate('/petcare/services')}
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full"
            >
              Pet Care Services
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600">Simple steps to get help when you need it</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Request Help</h3>
            <p className="text-gray-600">Tap emergency button or select service type. Your location is automatically detected.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Get Connected</h3>
            <p className="text-gray-600">Nearby volunteers or professionals receive your request and respond immediately.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Track & Receive</h3>
            <p className="text-gray-600">Track your helper's location in real-time and get the assistance you need.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Become a volunteer and help others in your community, or sign up to access our network of helpers and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/signup?type=volunteer')}
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full"
            >
              Become a Volunteer
            </Button>
            <Button
              onClick={() => navigate('/signup?type=helpseeker')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-8 rounded-full"
            >
              Sign Up for Help
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Rapid Rescue</span>
              </div>
              <p className="text-gray-400">Your lifeline in emergencies. Connecting help when you need it most.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Emergency</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Accident Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Elderly Care</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Women Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fire Emergency</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Professional</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mental Health</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Aid</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Financial Advisory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoring</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rapid Rescue. All rights reserved. Saving lives, one click at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
