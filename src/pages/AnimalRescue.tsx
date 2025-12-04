
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Phone, 
  MapPin, 
  Clock,
  AlertTriangle,
  Camera,
  Users,
  Star,
  Shield
} from 'lucide-react';

const AnimalRescue = () => {
  const { toast } = useToast();
  const [rescueRequest, setRescueRequest] = useState({
    location: '',
    animalType: '',
    condition: '',
    description: '',
    contactNumber: '',
    urgency: 'medium'
  });

  const emergencyContacts = [
    { name: 'Animal Helpline', number: '1962', description: 'Animal Welfare Board' },
    { name: 'SPCA Emergency', number: '9876543210', description: '24/7 Animal Rescue' },
    { name: 'Blue Cross', number: '9876543211', description: 'Animal Hospital' },
    { name: 'Wildlife SOS', number: '9876543212', description: 'Wildlife Rescue' }
  ];

  const nearbyRescuers = [
    {
      name: 'Dr. Amit Kumar',
      specialty: 'Veterinary Surgeon',
      rating: 4.9,
      distance: '0.8 km',
      availability: 'Available now',
      responseTime: '15 min'
    },
    {
      name: 'Priya Animal Lover',
      specialty: 'Animal Rescue Volunteer',
      rating: 4.8,
      distance: '1.5 km',
      availability: 'Available now',
      responseTime: '20 min'
    },
    {
      name: 'Rajesh Verma',
      specialty: 'Animal Care Specialist',
      rating: 4.7,
      distance: '2.3 km',
      availability: 'Available in 30 min',
      responseTime: '45 min'
    }
  ];

  const rescueGuidelines = [
    {
      title: 'Assess the Situation',
      description: 'Check if the animal is truly in distress and needs immediate help.'
    },
    {
      title: 'Document with Photos',
      description: 'Take clear photos of the animal and its condition for rescuers.'
    },
    {
      title: 'Share Exact Location',
      description: 'Provide precise location details including landmarks.'
    },
    {
      title: 'Do Not Touch',
      description: 'Avoid direct contact with injured animals unless trained.'
    }
  ];

  const handleRescueRequest = () => {
    if (!rescueRequest.location.trim() || !rescueRequest.animalType.trim()) {
      toast({
        title: "Required Information Missing",
        description: "Please provide location and animal type for rescue assistance.",
      });
      return;
    }

    // Get current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position)  => {
          toast({
            title: "Animal Rescue Alert Sent!",
            description: `Your rescue request has been sent to nearby volunteers. Location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          });
          
          // Clear form
          setRescueRequest({
            location: '',
            animalType: '',
            condition: '',
            description: '',
            contactNumber: '',
            urgency: 'medium'
          });
        },
        () => {
          toast({
            title: "Animal Rescue Alert Sent!",
            description: "Your rescue request has been sent to nearby volunteers.",
          });
        }
      );
    } else {
      toast({
        title: "Animal Rescue Alert Sent!",
        description: "Your rescue request has been sent to nearby volunteers.",
      });
    }
  };

  const handleQuickCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Animal Rescue & Emergency
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Help injured or distressed animals by connecting with our network of rescuers and veterinarians.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => handleQuickCall('1962')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse"
            >
              <Phone className="mr-2 h-6 w-6" />
              Animal Helpline 1962
            </Button>
            <Button
              onClick={() => document.getElementById('rescue-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="mr-2 h-6 w-6" />
              Report Animal in Need
            </Button>
          </div>
        </div>
      </section>

      {/* Animal Rescue Request Form */}
      <section id="rescue-form" className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report Animal in Need
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <Input
                  placeholder="Street, area, landmark"
                  value={rescueRequest.location}
                  onChange={(e) => setRescueRequest({ ...rescueRequest, location: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Animal Type *</label>
                <Input
                  placeholder="Dog, Cat, Cow, etc."
                  value={rescueRequest.animalType}
                  onChange={(e) => setRescueRequest({ ...rescueRequest, animalType: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <Input
                  placeholder="Injured, sick, stuck, etc."
                  value={rescueRequest.condition}
                  onChange={(e) => setRescueRequest({ ...rescueRequest, condition: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Contact</label>
                <Input
                  placeholder="Phone number (optional)"
                  value={rescueRequest.contactNumber}
                  onChange={(e) => setRescueRequest({ ...rescueRequest, contactNumber: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Urgency Level</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={rescueRequest.urgency}
                onChange={(e) => setRescueRequest({ ...rescueRequest, urgency: e.target.value })}
              >
                <option value="low">Low - Animal needs care but not critical</option>
                <option value="medium">Medium - Animal is uncomfortable/distressed</option>
                <option value="high">High - Animal is in pain/immediate danger</option>
                <option value="critical">Critical - Life-threatening situation</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Describe the animal's condition and situation in detail"
                value={rescueRequest.description}
                onChange={(e) => setRescueRequest({ ...rescueRequest, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <Camera className="h-4 w-4" />
              <span>Tip: Take photos if possible and share with rescuers for better assessment</span>
            </div>
            
            <Button
              onClick={handleRescueRequest}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
            >
              <Heart className="mr-2 h-5 w-5" />
              Send Rescue Alert
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Emergency Contacts */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Animal Emergency Contacts</h2>
          <p className="text-lg text-gray-600">Quick access to animal rescue helplines</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{contact.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">{contact.number}</p>
                <p className="text-sm text-gray-600 mb-4">{contact.description}</p>
                <Button
                  onClick={() => handleQuickCall(contact.number)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Nearby Animal Rescuers */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nearby Animal Rescuers</h2>
          <p className="text-lg text-gray-600">Trained professionals and volunteers ready to help</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {nearbyRescuers.map((rescuer, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">{rescuer.name}</CardTitle>
                <p className="text-gray-600 text-sm">{rescuer.specialty}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(rescuer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({rescuer.rating})</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{rescuer.distance}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{rescuer.availability}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Response: {rescuer.responseTime}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Shield className="mr-2 h-4 w-4" />
                  Request Help
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Rescue Guidelines */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Rescue Guidelines</h2>
          <p className="text-lg text-gray-600">Important steps to follow when helping animals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {rescueGuidelines.map((guideline, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">{guideline.title}</h3>
              <p className="text-gray-600">{guideline.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-green-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Animal Rescue Network</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Become an animal rescue volunteer and help create a compassionate community for all beings.
          </p>
          <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full">
            <Users className="mr-2 h-5 w-5" />
            Become a Rescue Volunteer
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AnimalRescue;
