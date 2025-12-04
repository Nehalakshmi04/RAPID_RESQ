
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Shield, 
  Phone, 
  Briefcase,
  MapPin,
  Clock,
  User,
  AlertCircle,
  Calendar,
  Star,
  CheckCircle
} from 'lucide-react';

const HelpseekerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState('User');
  const [activeRequests, setActiveRequests] = useState([]);
  const [recentHelp, setRecentHelp] = useState([
    {
      id: 1,
      type: 'emergency',
      title: 'Medical Emergency',
      volunteer: 'Dr. Sarah Patel',
      status: 'completed',
      date: '2024-01-10',
      rating: 5
    },
    {
      id: 2,
      type: 'professional',
      title: 'Legal Consultation',
      volunteer: 'Adv. Rajesh Kumar',
      status: 'completed',
      date: '2024-01-08',
      rating: 4
    }
  ]);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const emergencyServices = [
    {
      title: 'Medical Emergency',
      description: 'Get immediate medical assistance',
      icon: Heart,
      color: 'bg-red-500',
      path: '/emergency-help'
    },
    {
      title: 'Women Safety',
      description: 'Emergency help for women in distress',
      icon: Shield,
      color: 'bg-purple-500',
      path: '/women-safety'
    },
    {
      title: 'Accident Help',
      description: 'Report and get help for accidents',
      icon: AlertCircle,
      color: 'bg-orange-500',
      path: '/accident-help'
    },
    {
      title: 'Fire Emergency',
      description: 'Fire safety and evacuation help',
      icon: AlertCircle,
      color: 'bg-red-600',
      path: '/fire-emergency'
    }
  ];

  const professionalServices = [
    {
      title: 'Mental Health',
      description: 'Professional counseling services',
      icon: Heart,
      color: 'bg-green-500',
      path: '/mental-health-services'
    },
    {
      title: 'Legal Consultation',
      description: 'Legal advice and consultation',
      icon: Briefcase,
      color: 'bg-blue-500',
      path: '/legal-services'
    },
    {
      title: 'Financial Advisory',
      description: 'Financial planning and advice',
      icon: Briefcase,
      color: 'bg-indigo-500',
      path: '/financial-services'
    },
    {
      title: 'Tutoring Services',
      description: 'Educational support and tutoring',
      icon: Briefcase,
      color: 'bg-teal-500',
      path: '/tutoring-services'
    }
  ];

  const petCareServices = [
    {
      title: 'Animal Rescue',
      description: 'Report injured or stray animals',
      icon: Heart,
      color: 'bg-orange-500',
      path: '/animal-rescue'
    },
    {
      title: 'Pet Care Services',
      description: 'Professional pet care and grooming',
      icon: Heart,
      color: 'bg-green-500',
      path: '/pet-care-services'
    },
    {
      title: 'Veterinary Care',
      description: 'Professional veterinary services',
      icon: Heart,
      color: 'bg-blue-500',
      path: '/veterinary-services'
    }
  ];

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  const handleEmergencyCall = () => {
    window.open('tel:112', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600">Get help from our community of volunteers and professionals.</p>
        </div>

        {/* Emergency Call Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={handleEmergencyCall}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse"
          >
            <Phone className="mr-2 h-6 w-6" />
            Emergency Call 112
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Requests</p>
                  <p className="text-2xl font-bold">{activeRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Help Received</p>
                  <p className="text-2xl font-bold">{recentHelp.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Average Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="mr-2 h-5 w-5" />
              Emergency Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyServices.map((service, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleServiceClick(service.path)}>
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-3`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Get Help Now</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Briefcase className="mr-2 h-5 w-5" />
              Professional Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {professionalServices.map((service, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleServiceClick(service.path)}>
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-3`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Book Service</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pet Care Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <Heart className="mr-2 h-5 w-5" />
              Pet Care & Animal Rescue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {petCareServices.map((service, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleServiceClick(service.path)}>
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-3`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {service.title.includes('Rescue') ? 'Report Animal in Need' : 'Get Pet Care'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Help History */}
        {recentHelp.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Help History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHelp.map((help) => (
                  <div key={help.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{help.title}</h3>
                      <Badge variant={help.status === 'completed' ? 'default' : 'secondary'}>
                        {help.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {help.volunteer}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {help.date}
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4" />
                        {help.rating}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HelpseekerDashboard;
