
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Star,
  Edit,
  Save,
  Camera
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState<'volunteer' | 'helpseeker' | null>(null);
  const [volunteerSubdomains, setVolunteerSubdomains] = useState<string[]>([]);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    joinDate: '',
    bio: ''
  });

  const [stats, setStats] = useState({
    totalHelps: 0,
    rating: 0,
    earnings: 0,
    badges: [] as string[]
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Load user data
    const type = localStorage.getItem('userType') as 'volunteer' | 'helpseeker' | null;
    const name = localStorage.getItem('userName') || 'User';
    const subdomains = localStorage.getItem('volunteerSubdomains');
    
    setUserType(type);
    setProfileData(prev => ({
      ...prev,
      name,
      email: 'user@example.com',
      phone: '+91 9876543210',
      location: 'Bangalore, Karnataka',
      joinDate: 'January 2024',
      bio: type === 'volunteer' ? 'Passionate about helping others in need and making a positive impact in my community.' : 'Grateful for the amazing volunteer community that helps people like me.'
    }));

    if (subdomains) {
      setVolunteerSubdomains(JSON.parse(subdomains));
    }

    // Set mock stats based on user type
    if (type === 'volunteer') {
      setStats({
        totalHelps: 47,
        rating: 4.8,
        earnings: 5420,
        badges: ['First Responder', 'Community Hero', 'Trusted Helper', 'Emergency Expert']
      });
    } else {
      setStats({
        totalHelps: 8,
        rating: 4.9,
        earnings: 0,
        badges: ['Grateful Member', 'Community Supporter']
      });
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userName', profileData.name);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    toast({
      title: "Photo Upload",
      description: "Profile photo upload feature will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
            <p className="text-gray-600">
              {userType === 'volunteer' ? 'Manage your volunteer profile and track your impact' : 'View and update your profile information'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <Button
                        onClick={handleImageUpload}
                        size="sm"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
                    <p className="text-gray-600 mb-2 capitalize">{userType}</p>
                    <div className="flex items-center justify-center mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{stats.rating}/5.0</span>
                    </div>
                    
                    {userType === 'volunteer' && volunteerSubdomains.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Specializations</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {volunteerSubdomains.slice(0, 3).map((subdomain) => (
                            <Badge key={subdomain} variant="secondary" className="text-xs capitalize">
                              {subdomain.replace('-', ' ')}
                            </Badge>
                          ))}
                          {volunteerSubdomains.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{volunteerSubdomains.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {userType === 'volunteer' ? 'People Helped' : 'Times Helped'}
                    </span>
                    <span className="font-semibold">{stats.totalHelps}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rating</span>
                    <span className="font-semibold">{stats.rating}/5.0</span>
                  </div>
                  {userType === 'volunteer' && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Earnings</span>
                      <span className="font-semibold">₹{stats.earnings}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-semibold">{profileData.joinDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <Button
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        variant={isEditing ? "default" : "outline"}
                        size="sm"
                      >
                        {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                        {isEditing ? 'Save' : 'Edit'}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Badges & Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.badges.map((badge, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <Award className="h-8 w-8 text-yellow-500" />
                            <div>
                              <h3 className="font-semibold">{badge}</h3>
                              <p className="text-sm text-gray-600">Earned for outstanding service</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { date: '2024-01-15', action: 'Helped with emergency response', rating: 5 },
                          { date: '2024-01-12', action: 'Provided tutoring session', rating: 5 },
                          { date: '2024-01-08', action: 'Assisted with pet rescue', rating: 4 },
                          { date: '2024-01-03', action: 'Emergency first aid response', rating: 5 }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-gray-600">{activity.date}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(activity.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
