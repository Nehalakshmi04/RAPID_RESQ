import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import EmergencyAssistance from '@/components/EmergencyAssistance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  Heart, 
  Shield, 
  Briefcase,
  Bell,
  Calendar,
  Navigation,
  AlertCircle,
  CheckCircle,
  Timer,
  Settings,
  DollarSign,
  ToggleLeft
} from 'lucide-react';

const VolunteerDashboard = () => {
  const { toast } = useToast();
  const [isAvailable, setIsAvailable] = useState(true);
  const [volunteerDomains, setVolunteerDomains] = useState<string[]>([]);
  const [volunteerSubdomains, setVolunteerSubdomains] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [earnings, setEarnings] = useState({ total: 5420, thisMonth: 1280 });
  const [activeEmergency, setActiveEmergency] = useState<any>(null);
  const [userName, setUserName] = useState('Volunteer');

  useEffect(() => {
    // Load volunteer preferences and user data
    const domains = localStorage.getItem('volunteerDomains');
    const subdomains = localStorage.getItem('volunteerSubdomains');
    const name = localStorage.getItem('userName');
    
    if (domains) {
      setVolunteerDomains(JSON.parse(domains));
    }
    if (subdomains) {
      setVolunteerSubdomains(JSON.parse(subdomains));
    }
    if (name) {
      setUserName(name);
    }
  }, []);

  // Filter requests based on volunteer's selected subdomains
  const emergencyRequests = volunteerSubdomains.some(sub => ['accident', 'elderly', 'women-safety', 'fire'].includes(sub)) ? [
    {
      id: 1,
      type: 'accident',
      title: 'Road Accident',
      location: 'MG Road, Bangalore',
      distance: '0.8 km',
      time: '2 minutes ago',
      priority: 'high',
      requester: 'Rahul Kumar',
      phone: '+91 98765 43210',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      subdomain: 'accident'
    },
    {
      id: 2,
      type: 'elderly',
      title: 'Elderly Person Needs Help',
      location: 'Koramangala, Bangalore', 
      distance: '1.2 km',
      time: '5 minutes ago',
      priority: 'medium',
      requester: 'Priya Sharma',
      phone: '+91 87654 32109',
      coordinates: { lat: 12.9279, lng: 77.6271 },
      subdomain: 'elderly'
    }
  ].filter(req => volunteerSubdomains.includes(req.subdomain)) : [];

  const professionalRequests = volunteerSubdomains.some(sub => ['mental-health', 'legal', 'financial', 'tutoring'].includes(sub)) ? [
    {
      id: 1,
      type: 'mental-health',
      title: 'Counseling Session Request',
      client: 'John Doe',
      scheduledTime: '2024-01-15 14:00',
      duration: '60 minutes',
      fee: '₹800',
      status: 'confirmed',
      subdomain: 'mental-health'
    },
    {
      id: 2,
      type: 'tutoring',
      title: 'Math Tutoring - Class 10',
      client: 'Sarah Smith',
      scheduledTime: '2024-01-16 10:00',
      duration: '90 minutes',
      fee: 'Volunteer',
      status: 'pending',
      subdomain: 'tutoring'
    }
  ].filter(req => volunteerSubdomains.includes(req.subdomain)) : [];

  const petCareRequests = volunteerSubdomains.some(sub => ['rescue', 'daycare', 'veterinary', 'training'].includes(sub)) ? [
    {
      id: 1,
      type: 'rescue',
      title: 'Injured Dog Rescue',
      location: 'HSR Layout, Bangalore',
      distance: '1.5 km',
      time: '10 minutes ago',
      reporter: 'Animal Lover',
      status: 'urgent',
      petType: 'Dog',
      duration: '2-3 hours',
      fee: 'Volunteer',
      subdomain: 'rescue'
    },
    {
      id: 2,
      type: 'daycare',
      title: 'Pet Daycare Service',
      location: 'Whitefield, Bangalore',
      distance: '2.1 km',
      time: '15 minutes ago',
      reporter: 'Pet Owner',
      status: 'scheduled',
      petType: 'Golden Retriever',
      duration: '1 hour',
      fee: '₹300',
      subdomain: 'daycare'
    }
  ].filter(req => volunteerSubdomains.includes(req.subdomain)) : [];

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
    toast({
      title: isAvailable ? "You're now offline" : "You're now available",
      description: isAvailable ? "You won't receive new requests" : "You'll receive requests in your selected domains",
    });
  };

  const handleEmergencyAlert = () => {
    // Simulate sending emergency alert
    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast({
          title: "Emergency Alert Sent!",
          description: `Your location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}) has been broadcast to nearby emergency services.`,
        });
      },
      () => {
        toast({
          title: "Emergency Alert Sent!",
          description: "Your availability has been broadcast to nearby emergency services.",
        });
      }
    );
  };

  const handleViewEarnings = () => {
    toast({
      title: "Earnings Overview",
      description: `Total Earned: ₹${earnings.total} | This Month: ₹${earnings.thisMonth} | Pending: ₹240`,
    });
  };

  const handleUpdatePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your volunteer preferences have been saved successfully.",
    });
    setShowSettings(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'accident': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'elderly': return <Heart className="h-4 w-4 text-blue-600" />;
      case 'women-safety': return <Shield className="h-4 w-4 text-purple-600" />;
      case 'mental-health': return <Heart className="h-4 w-4 text-green-600" />;
      case 'tutoring': return <Briefcase className="h-4 w-4 text-indigo-600" />;
      case 'rescue': return <Heart className="h-4 w-4 text-orange-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleAcceptRequest = (requestId: number, type: string) => {
    if (type === 'emergency' || emergencyRequests.find(req => req.id === requestId)) {
      const request = emergencyRequests.find(req => req.id === requestId);
      if (request) {
        setActiveEmergency(request);
        toast({
          title: "Emergency Request Accepted",
          description: "You are now responding to this emergency. Stay safe!",
        });
      }
    } else {
      toast({
        title: "Request Accepted",
        description: `You've accepted the ${type} request. Contact details will be shared.`,
      });
    }
  };

  const handleCompleteEmergency = (requestId: number) => {
    setActiveEmergency(null);
    setEarnings(prev => ({ ...prev, thisMonth: prev.thisMonth + 200 }));
    toast({
      title: "Emergency Assistance Completed",
      description: "Thank you for your service! Your earnings have been updated.",
    });
  };

  const handleCancelEmergency = (requestId: number) => {
    setActiveEmergency(null);
    toast({
      title: "Emergency Assistance Cancelled",
      description: "Emergency response has been cancelled.",
    });
  };

  const handleNavigate = (coordinates: any) => {
    if (coordinates) {
      window.open(`https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Active Emergency */}
        {activeEmergency && (
          <div className="mb-8">
            <EmergencyAssistance
              request={activeEmergency}
              onComplete={handleCompleteEmergency}
              onCancel={handleCancelEmergency}
            />
          </div>
        )}

        {/* Welcome Section with Availability Toggle */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {userName}!</h1>
            <p className="text-gray-600">Help people in your community. Your quick response can save lives.</p>
            {volunteerSubdomains.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-2">Your specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {volunteerSubdomains.map((subdomain) => (
                    <Badge key={subdomain} variant="secondary" className="text-xs capitalize">
                      {subdomain.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border">
            <span className="text-sm font-medium">Available</span>
            <Switch
              checked={isAvailable}
              onCheckedChange={handleAvailabilityToggle}
            />
            <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
              {isAvailable ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Emergency Requests</p>
                  <p className="text-2xl font-bold">{emergencyRequests.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Professional Requests</p>
                  <p className="text-2xl font-bold">{professionalRequests.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Pet Care Requests</p>
                  <p className="text-2xl font-bold">{petCareRequests.length}</p>
                </div>
                <Heart className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Monthly Earnings</p>
                  <p className="text-2xl font-bold">₹{earnings.thisMonth}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Show message if no subdomains selected */}
        {volunteerSubdomains.length === 0 && (
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Complete Your Profile</h3>
              <p className="text-yellow-700 mb-4">
                You haven't selected any specializations yet. Please log in again to choose your specific areas of expertise.
              </p>
              <Button onClick={() => window.location.href = '/login?type=volunteer'} className="bg-yellow-600 hover:bg-yellow-700">
                Update Specializations
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Requests */}
          {emergencyRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                  Emergency Requests Nearby
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(request.type)}
                          <h3 className="font-semibold">{request.title}</h3>
                        </div>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {request.location} ({request.distance} away)
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {request.time}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          {request.requester}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleAcceptRequest(request.id, 'emergency')}
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          size="sm"
                          disabled={!!activeEmergency}
                        >
                          Accept & Help
                        </Button>
                        <Button 
                          onClick={() => handleNavigate(request.coordinates)}
                          variant="outline" 
                          size="sm"
                          className="border-blue-600 text-blue-600"
                        >
                          <Navigation className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => window.open(`tel:${request.phone}`, '_self')}
                          variant="outline" 
                          size="sm"
                          className="border-red-600 text-red-600"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Professional Appointments */}
          {professionalRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Professional Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionalRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(request.type)}
                          <h3 className="font-semibold">{request.title}</h3>
                        </div>
                        <Badge variant={request.status === 'confirmed' ? 'default' : 'secondary'}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Client: {request.client}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {new Date(request.scheduledTime).toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Timer className="mr-2 h-4 w-4" />
                          Duration: {request.duration}
                        </div>
                        <div className="flex items-center font-semibold text-green-600">
                          Fee: {request.fee}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                          size="sm"
                        >
                          {request.status === 'confirmed' ? 'Join Session' : 'Confirm'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-600 text-gray-600"
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pet Care Requests */}
          {petCareRequests.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-green-600" />
                  Pet Care Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {petCareRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(request.type)}
                          <h3 className="font-semibold">{request.title}</h3>
                        </div>
                        {request.status && (
                          <Badge className={request.status === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                            {request.status}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {request.location}
                          {request.distance && ` (${request.distance} away)`}
                        </div>
                        {request.time && (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {request.time}
                          </div>
                        )}
                        {request.petType && (
                          <div className="flex items-center">
                            <span className="mr-2">🐕</span>
                            Pet: {request.petType}
                          </div>
                        )}
                        {request.duration && (
                          <div className="flex items-center">
                            <Timer className="mr-2 h-4 w-4" />
                            Duration: {request.duration}
                          </div>
                        )}
                        {request.fee && (
                          <div className="flex items-center font-semibold text-green-600">
                            Fee: {request.fee}
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleAcceptRequest(request.id, 'pet-care')}
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          size="sm"
                        >
                          {request.type === 'rescue' ? 'Help Rescue' : 'Accept Request'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-blue-600 text-blue-600"
                        >
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={handleEmergencyAlert}
                className="bg-red-600 hover:bg-red-700 text-white h-12 w-full"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Emergency Alert
              </Button>
              <Button 
                onClick={handleAvailabilityToggle}
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 h-12 w-full"
              >
                <ToggleLeft className="mr-2 h-4 w-4" />
                {isAvailable ? 'Go Offline' : 'Go Online'}
              </Button>
              <Button 
                onClick={handleViewEarnings}
                className="bg-green-600 hover:bg-green-700 text-white h-12 w-full"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                View Earnings
              </Button>
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-50 h-12 w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Volunteer Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Profile Information</h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm"><strong>Name:</strong> {userName}</p>
                        <p className="text-sm"><strong>Status:</strong> <span className={isAvailable ? 'text-green-600' : 'text-gray-500'}>{isAvailable ? 'Available' : 'Offline'}</span></p>
                        <p className="text-sm"><strong>Total Earnings:</strong> ₹{earnings.total}</p>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Current Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {volunteerSubdomains.map((subdomain) => (
                          <Badge key={subdomain} variant="secondary" className="capitalize">
                            {subdomain.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = '/login?type=volunteer'}
                        className="w-full"
                      >
                        Update Specializations
                      </Button>
                    </div>

                    {/* Notification Preferences */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Notification Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Emergency Alerts</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Professional Requests</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pet Care Requests</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">SMS Notifications</span>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    {/* Availability Settings */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Availability Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Auto-accept emergency requests</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Maximum distance (5km)</span>
                          <Button variant="outline" size="sm">Change</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleUpdatePreferences} className="flex-1">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setShowSettings(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
