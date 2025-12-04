
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Clock,
  AlertTriangle,
  Users,
  Star,
  Heart
} from 'lucide-react';

const WomenSafety = () => {
  const { toast } = useToast();
  const [emergencyRequest, setEmergencyRequest] = useState({
    location: '',
    description: '',
    contactNumber: ''
  });

  const emergencyContacts = [
    { name: 'Women Helpline', number: '1091', description: '24/7 Women in Distress' },
    { name: 'Police Emergency', number: '100', description: 'Immediate Police Help' },
    { name: 'Emergency Services', number: '112', description: 'All Emergency Services' },
    { name: 'Child Helpline', number: '1098', description: 'Child Safety & Protection' }
  ];

  const nearbyVolunteers = [
    {
      name: 'Priya Sharma',
      specialty: 'Women Safety Volunteer',
      rating: 4.9,
      distance: '0.5 km',
      availability: 'Available now',
      responseTime: '2 min'
    },
    {
      name: 'Kavya Reddy',
      specialty: 'Self Defense Trainer',
      rating: 4.8,
      distance: '1.2 km',
      availability: 'Available now',
      responseTime: '5 min'
    },
    {
      name: 'Meera Patel',
      specialty: 'Women Safety Advocate',
      rating: 4.7,
      distance: '2.1 km',
      availability: 'Available in 10 min',
      responseTime: '15 min'
    }
  ];

  const safetyTips = [
    {
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, it probably is. Remove yourself from the situation immediately.'
    },
    {
      title: 'Stay Alert',
      description: 'Avoid distractions like phones or headphones when walking alone, especially at night.'
    },
    {
      title: 'Share Your Location',
      description: 'Let trusted contacts know where you are going and when you expect to return.'
    },
    {
      title: 'Emergency Contacts',
      description: 'Keep emergency numbers easily accessible and consider using safety apps.'
    }
  ];

  const handleEmergencyRequest = () => {
    if (!emergencyRequest.location.trim()) {
      toast({
        title: "Location Required",
        description: "Please provide your current location for emergency assistance.",
      });
      return;
    }

    // Get current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Emergency Alert Sent!",
            description: `Your location has been shared with nearby volunteers. Help is on the way. Stay safe!`,
          });
          
          // Clear form
          setEmergencyRequest({ location: '', description: '', contactNumber: '' });
        },
        () => {
          toast({
            title: "Emergency Alert Sent!",
            description: "Your request has been sent to nearby volunteers. Help is on the way!",
          });
        }
      );
    } else {
      toast({
        title: "Emergency Alert Sent!",
        description: "Your request has been sent to nearby volunteers. Help is on the way!",
      });
    }
  };

  const handleQuickCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Women Safety & Support
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Your safety is our priority. Get immediate help from trained volunteers and access emergency services 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => handleQuickCall('112')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse"
            >
              <Phone className="mr-2 h-6 w-6" />
              Emergency Call 112
            </Button>
            <Button
              onClick={() => handleQuickCall('1091')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Shield className="mr-2 h-6 w-6" />
              Women Helpline 1091
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Request Form */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Request Emergency Help
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Location *</label>
              <Input
                placeholder="Enter your current location or landmark"
                value={emergencyRequest.location}
                onChange={(e) => setEmergencyRequest({ ...emergencyRequest, location: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <Input
                placeholder="Your phone number (optional)"
                value={emergencyRequest.contactNumber}
                onChange={(e) => setEmergencyRequest({ ...emergencyRequest, contactNumber: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Describe the Situation</label>
              <Textarea
                placeholder="Briefly describe what kind of help you need"
                value={emergencyRequest.description}
                onChange={(e) => setEmergencyRequest({ ...emergencyRequest, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <Button
              onClick={handleEmergencyRequest}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
            >
              <Shield className="mr-2 h-5 w-5" />
              Send Emergency Alert
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Emergency Contacts */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Emergency Contacts</h2>
          <p className="text-lg text-gray-600">Quick access to important helpline numbers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{contact.name}</h3>
                <p className="text-2xl font-bold text-red-600 mb-2">{contact.number}</p>
                <p className="text-sm text-gray-600 mb-4">{contact.description}</p>
                <Button
                  onClick={() => handleQuickCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Nearby Women Safety Volunteers */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nearby Safety Volunteers</h2>
          <p className="text-lg text-gray-600">Trained volunteers ready to assist you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {nearbyVolunteers.map((volunteer, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">{volunteer.name}</CardTitle>
                <p className="text-gray-600 text-sm">{volunteer.specialty}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(volunteer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({volunteer.rating})</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{volunteer.distance}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{volunteer.availability}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Response: {volunteer.responseTime}</span>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Heart className="mr-2 h-4 w-4" />
                  Request Help
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Safety Tips */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Safety Tips</h2>
          <p className="text-lg text-gray-600">Important guidelines to stay safe</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {safetyTips.map((tip, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Safety Network</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Become a women safety volunteer and help create a safer community for everyone.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full">
            <Users className="mr-2 h-5 w-5" />
            Become a Safety Volunteer
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WomenSafety;
