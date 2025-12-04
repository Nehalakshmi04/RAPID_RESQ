
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { 
  Phone, 
  Shield, 
  Heart, 
  AlertTriangle,
  Users,
  PawPrint,
  Star,
  ArrowRight,
  Clock
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const emergencyServices = [
    {
      title: 'Accident Help',
      description: 'Immediate response for road accidents and medical emergencies',
      icon: AlertTriangle,
      onClick: () => navigate('/emergency/accident')
    },
    {
      title: 'Elderly Support',
      description: '24/7 assistance for elderly citizens in need of urgent help',
      icon: Heart,
      onClick: () => navigate('/emergency/elderly')
    },
    {
      title: 'Women Safety',
      description: 'Emergency support for women in unsafe situations',
      icon: Shield,
      onClick: () => navigate('/emergency/women-safety')
    },
    {
      title: 'Fire Emergency',
      description: 'Rapid response for fire incidents and evacuations',
      icon: AlertTriangle,
      onClick: () => navigate('/emergency/fire')
    }
  ];

  const professionalServices = [
    {
      title: 'Mental Health',
      description: 'Professional counseling and therapy sessions with verified psychologists',
      icon: Heart,
      onClick: () => navigate('/professional/mental-health')
    },
    {
      title: 'Legal Aid',
      description: 'Affordable legal consultation with experienced lawyers',
      icon: Shield,
      onClick: () => navigate('/professional/legal')
    },
    {
      title: 'Financial Advisory',
      description: 'Expert financial planning and investment guidance',
      icon: Star,
      onClick: () => navigate('/professional/financial')
    },
    {
      title: 'Weekend Tutoring',
      description: 'Quality education support for students on weekends',
      icon: Users,
      onClick: () => navigate('/professional/tutoring')
    }
  ];

  const petServices = [
    {
      title: 'Pet Rescue',
      description: 'Emergency rescue services for stray and injured animals',
      icon: PawPrint,
      onClick: () => navigate('/petcare/rescue')
    },
    {
      title: 'Pet Care Services',
      description: 'Daily pet care, grooming, and boarding services',
      icon: Heart,
      onClick: () => navigate('/petcare/services')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive emergency response, professional help, and pet care services designed to help you in every situation
          </p>
        </div>

        {/* Emergency Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Emergency Services</h2>
            <p className="text-lg text-gray-600">Immediate help when you need it most</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                isEmergency={true}
                onClick={service.onClick}
              />
            ))}
          </div>
        </div>

        {/* Professional Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Professional Help</h2>
            <p className="text-lg text-gray-600">Expert services at affordable rates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {professionalServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                isProfessional={true}
                onClick={service.onClick}
              />
            ))}
          </div>
        </div>

        {/* Pet Care Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Pet Care</h2>
            <p className="text-lg text-gray-600">Caring for our furry friends</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {petServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                onClick={service.onClick}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Making a difference in people's lives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">10K+</div>
              <p className="text-gray-600">Emergency Responses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <p className="text-gray-600">Professional Consultations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2K+</div>
              <p className="text-gray-600">Pets Rescued</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Availability</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Get Help?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of people who trust Rapid Rescue for their emergency and professional needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/emergency-help')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Phone className="inline mr-2 h-6 w-6" />
              Emergency Help
            </button>
            <button
              onClick={() => navigate('/professional-help')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Star className="inline mr-2 h-6 w-6" />
              Professional Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
