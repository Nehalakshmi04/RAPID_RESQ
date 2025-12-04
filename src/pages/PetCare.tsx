
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import EmergencyButton from '@/components/EmergencyButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Phone, 
  MapPin, 
  Clock,
  Star,
  Shield,
  Users,
  Camera,
  AlertTriangle
} from 'lucide-react';

const PetCare = () => {
  const navigate = useNavigate();

  const emergencyServices = [
    {
      title: 'Report Injured Animal',
      description: 'Immediate rescue for injured street animals',
      icon: Heart,
      path: '/petcare/emergency-report'
    },
    {
      title: 'Animal Abuse Report',
      description: 'Report animal cruelty and abuse cases',
      icon: Shield,
      path: '/petcare/abuse-report'
    },
    {
      title: 'Emergency Vet Call',
      description: '24/7 emergency veterinary assistance',
      icon: Phone,
      path: '/petcare/emergency-vet'
    }
  ];

  const professionalServices = [
    {
      title: 'Veterinary Care',
      description: 'Professional veterinary consultation and treatment',
      icon: Heart,
      path: '/petcare/veterinary'
    },
    {
      title: 'Pet Grooming',
      description: 'Professional grooming and hygiene services',
      icon: Star,
      path: '/petcare/grooming'
    },
    {
      title: 'Pet Training',
      description: 'Behavior training and obedience classes',
      icon: Users,
      path: '/petcare/training'
    },
    {
      title: 'Pet Boarding',
      description: 'Safe and comfortable pet boarding services',
      icon: Shield,
      path: '/petcare/boarding'
    }
  ];

  const nearbyVets = [
    {
      name: 'Dr. Meera Patel',
      specialty: 'Small Animal Veterinarian',
      rating: 4.9,
      distance: '1.2 km',
      availability: 'Available now',
      phone: '+91 9876543210'
    },
    {
      name: 'Dr. Arjun Reddy',
      specialty: 'Emergency Pet Care',
      rating: 4.8,
      distance: '2.1 km',
      availability: '24/7 Emergency',
      phone: '+91 9876543211'
    },
    {
      name: 'Dr. Kavya Singh',
      specialty: 'Pet Surgery Specialist',
      rating: 4.7,
      distance: '3.5 km',
      availability: 'Available today',
      phone: '+91 9876543212'
    }
  ];

  const handleEmergencyReport = () => {
    navigate('/petcare/emergency-report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pet Care & Animal Rescue
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Help street animals in need or get professional care for your beloved pets. Our network includes veterinarians, rescuers, and animal care specialists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={handleEmergencyReport}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <AlertTriangle className="mr-2 h-6 w-6" />
              Report Animal Emergency
            </Button>
            <Button
              onClick={() => navigate('/petcare/services')}
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-8 rounded-full text-lg"
            >
              Browse Pet Services
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Animal Rescue */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Emergency Animal Rescue</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Report injured or distressed animals and connect with nearby rescuers and veterinarians immediately.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

      {/* Professional Pet Care Services */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl mx-4 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Professional Pet Care</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access verified pet care professionals for veterinary care, grooming, training, and boarding services.
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

      {/* Nearby Veterinarians */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nearby Veterinarians</h2>
          <p className="text-lg text-gray-600">Find qualified veterinarians near your location</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {nearbyVets.map((vet, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">{vet.name}</CardTitle>
                <p className="text-gray-600 text-sm">{vet.specialty}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(vet.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({vet.rating})</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{vet.distance}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{vet.availability}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => window.open(`tel:${vet.phone}`, '_self')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button
                    onClick={() => navigate(`/petcare/vet/${index + 1}`)}
                    variant="outline"
                    className="flex-1"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Help Animals */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How to Help Animals</h2>
          <p className="text-lg text-gray-600">Simple steps to make a difference in animal lives</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Report & Document</h3>
            <p className="text-gray-600">Take photos/videos of injured animals and report through our app with location details.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Connect with Rescuers</h3>
            <p className="text-gray-600">Our network of volunteers and professionals will respond to provide immediate help.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Follow Up & Care</h3>
            <p className="text-gray-600">Track the rescue progress and contribute to the animal's recovery and rehabilitation.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Animal Rescue Community</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Become a volunteer rescuer, veterinarian, or simply someone who cares about animal welfare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/signup?type=volunteer&category=petcare')}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full"
            >
              Become a Pet Rescuer
            </Button>
            <Button
              onClick={() => navigate('/petcare/register-professional')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-full"
            >
              Register as Professional
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetCare;
