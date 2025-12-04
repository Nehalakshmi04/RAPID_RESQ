
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User, 
  Phone,
  Mail,
  Globe,
  Eye,
  Lock,
  Trash2,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<'volunteer' | 'helpseeker' | null>(null);
  const [volunteerSubdomains, setVolunteerSubdomains] = useState<string[]>([]);
  
  const [notificationSettings, setNotificationSettings] = useState({
    emergencyAlerts: true,
    professionalRequests: true,
    petCareRequests: true,
    smsNotifications: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showRating: true,
    showLocation: false,
    shareData: false
  });

  const [accountSettings, setAccountSettings] = useState({
    twoFactorAuth: false,
    autoLogout: true,
    dataExport: false
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
    const subdomains = localStorage.getItem('volunteerSubdomains');
    
    setUserType(type);
    if (subdomains) {
      setVolunteerSubdomains(JSON.parse(subdomains));
    }
  }, [navigate]);

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been updated.",
    });
  };

  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been updated.",
    });
  };

  const handleAccountToggle = (setting: keyof typeof accountSettings) => {
    setAccountSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Account Settings Updated",
      description: "Your account preferences have been updated.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Change",
      description: "Password change feature will be available soon. You'll receive an email with instructions.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support for account deletion. This action cannot be undone.",
      variant: "destructive",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Your data export will be emailed to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">
              Manage your account preferences and privacy settings
            </p>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Emergency Alerts</Label>
                        <p className="text-sm text-gray-600">Receive notifications for emergency requests</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emergencyAlerts}
                        onCheckedChange={() => handleNotificationToggle('emergencyAlerts')}
                      />
                    </div>

                    {userType === 'volunteer' && (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">Professional Requests</Label>
                            <p className="text-sm text-gray-600">Get notified about professional help requests</p>
                          </div>
                          <Switch
                            checked={notificationSettings.professionalRequests}
                            onCheckedChange={() => handleNotificationToggle('professionalRequests')}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">Pet Care Requests</Label>
                            <p className="text-sm text-gray-600">Receive pet care assistance notifications</p>
                          </div>
                          <Switch
                            checked={notificationSettings.petCareRequests}
                            onCheckedChange={() => handleNotificationToggle('petCareRequests')}
                          />
                        </div>
                      </>
                    )}

                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-4">Delivery Methods</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <Label>SMS Notifications</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.smsNotifications}
                            onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-600" />
                            <Label>Email Notifications</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-gray-600" />
                            <Label>Push Notifications</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Show Profile</Label>
                        <p className="text-sm text-gray-600">Allow others to see your public profile</p>
                      </div>
                      <Switch
                        checked={privacySettings.showProfile}
                        onCheckedChange={() => handlePrivacyToggle('showProfile')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Show Rating</Label>
                        <p className="text-sm text-gray-600">Display your rating publicly</p>
                      </div>
                      <Switch
                        checked={privacySettings.showRating}
                        onCheckedChange={() => handlePrivacyToggle('showRating')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Share Location</Label>
                        <p className="text-sm text-gray-600">Share your approximate location for better matching</p>
                      </div>
                      <Switch
                        checked={privacySettings.showLocation}
                        onCheckedChange={() => handlePrivacyToggle('showLocation')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Data Analytics</Label>
                        <p className="text-sm text-gray-600">Allow anonymous data collection for service improvement</p>
                      </div>
                      <Switch
                        checked={privacySettings.shareData}
                        onCheckedChange={() => handlePrivacyToggle('shareData')}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button onClick={handleExportData} variant="outline" className="w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      Export My Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={accountSettings.twoFactorAuth}
                        onCheckedChange={() => handleAccountToggle('twoFactorAuth')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Auto Logout</Label>
                        <p className="text-sm text-gray-600">Automatically log out after period of inactivity</p>
                      </div>
                      <Switch
                        checked={accountSettings.autoLogout}
                        onCheckedChange={() => handleAccountToggle('autoLogout')}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <Button onClick={handleChangePassword} variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>

                    <Button onClick={handleDeleteAccount} variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    {userType === 'volunteer' ? 'Volunteer Preferences' : 'User Preferences'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {userType === 'volunteer' && (
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium mb-3 block">Current Specializations</Label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {volunteerSubdomains.map((subdomain) => (
                            <Badge key={subdomain} variant="secondary" className="capitalize">
                              {subdomain.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => window.location.href = '/login?type=volunteer'}
                          className="w-full"
                        >
                          Update Specializations
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <Label className="font-medium mb-3 block">Availability Settings</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>Maximum Distance (km)</Label>
                            <Input type="number" defaultValue="5" className="w-20" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Response Time (minutes)</Label>
                            <Input type="number" defaultValue="15" className="w-20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium mb-3 block">Language Preferences</Label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="kn">Kannada</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                      </select>
                    </div>

                    <div>
                      <Label className="font-medium mb-3 block">Theme Preference</Label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
