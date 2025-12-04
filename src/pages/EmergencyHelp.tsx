
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Shield, 
  Heart,
  ArrowLeft,
  Navigation,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmergencyHelp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentLocation, setCurrentLocation] = useState('Getting location...');
  const [requestStatus, setRequestStatus] = useState<'searching' | 'found' | 'enroute' | 'arrived'>('searching');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [volunteer, setVolunteer] = useState<any>(null);

  useEffect(() => {
    // Simulate getting current location
    setTimeout(() => {
      setCurrentLocation('Mumbai, Maharashtra, India');
    }, 2000);

    // Simulate finding volunteer
    setTimeout(() => {
      setVolunteer({
        name: 'Rahul Sharma',
        rating: 4.8,
        distance: '0.8 km',
        eta: '3 minutes',
        phone: '+91 9876543210',
        vehicleType: 'Bike',
        completedRescues: 127
      });
      setRequestStatus('found');
      toast({
        title: "Volunteer Found!",
        description: "Rahul is on the way to help you. Stay safe!",
      });
    }, 5000);

    // Simulate volunteer enroute
    setTimeout(() => {
      setRequestStatus('enroute');
      toast({
        title: "Help is Coming!",
        description: "Your volunteer is on the way. ETA: 3 minutes",
      });
    }, 8000);

    // Timer
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallVolunteer = () => {
    if (volunteer?.phone) {
      window.open(`tel:${volunteer.phone}`, '_self');
    }
  };

  const handleCallEmergency = () => {
    window.open('tel:112', '_self');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'searching': return 'bg-yellow-500';
      case 'found': return 'bg-blue-500';
      case 'enroute': return 'bg-green-500';
      case 'arrived': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'searching': return 'Searching for volunteers';
      case 'found': return 'Volunteer found';
      case 'enroute': return 'Help is on the way';
      case 'arrived': return 'Volunteer has arrived';
      default: return 'Unknown status';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Status Header */}
        <Card className="mb-6 border-2 border-red-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(requestStatus)} animate-pulse`}></div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {getStatusText(requestStatus)}
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Emergency Request Active</CardTitle>
            <div className="flex items-center justify-center space-x-4 mt-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{currentLocation}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Tracking */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="h-5 w-5 text-blue-600" />
                <span>Live Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-red-600 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">Showing your location and volunteer route</p>
                </div>
              </div>
              
              {volunteer && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Distance to you:</span>
                    <Badge variant="outline">{volunteer.distance}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated arrival:</span>
                    <Badge className="bg-green-100 text-green-800">{volunteer.eta}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Travel mode:</span>
                    <Badge variant="secondary">{volunteer.vehicleType}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Volunteer Information */}
          <div className="space-y-6">
            {volunteer && (
              <Card className="shadow-lg border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-green-600" />
                    <span>Your Volunteer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{volunteer.name}</h3>
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
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed rescues:</span>
                      <span className="font-semibold">{volunteer.completedRescues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold">{volunteer.phone}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCallVolunteer}
                    className="w-full bg-green-600 hover:bg-green-700 text-white mb-3"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Volunteer
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Emergency Actions */}
            <Card className="shadow-lg border-2 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Shield className="h-5 w-5" />
                  <span>Emergency Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleCallEmergency}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Services (112)
                </Button>
                
                <Button
                  onClick={() => navigate('/emergency/police')}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Contact Police (100)
                </Button>
                
                <Button
                  onClick={() => navigate('/emergency/medical')}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Medical Emergency (108)
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="shadow-lg bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Stay calm and in a safe location</li>
                  <li>• Keep your phone charged and accessible</li>
                  <li>• Share your live location with trusted contacts</li>
                  <li>• Verify volunteer's identity when they arrive</li>
                  <li>• Don't hesitate to call emergency services if needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Timeline */}
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle>Request Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Emergency request sent - {formatTime(0)}</span>
              </div>
              {requestStatus !== 'searching' && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Volunteer found and accepted - {formatTime(5)}</span>
                </div>
              )}
              {(requestStatus === 'enroute' || requestStatus === 'arrived') && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Volunteer is on the way - {formatTime(8)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyHelp;
