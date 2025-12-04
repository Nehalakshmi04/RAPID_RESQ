
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, ArrowLeft, Upload, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userType = searchParams.get('type') || 'helpseeker';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    idProof: null as File | null,
    agreeTerms: false
  });
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        idProof: e.target.files[0]
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    if (userType === 'volunteer' && !formData.idProof) {
      toast({
        title: "ID Proof Required",
        description: "Please upload your ID proof for verification.",
        variant: "destructive",
      });
      return;
    }

    // Simulate signup
    toast({
      title: "Account Created Successfully!",
      description: userType === 'volunteer' 
        ? "Your account will be verified within 24-48 hours. You'll receive an email confirmation."
        : "Welcome to Rapid Rescue! You can now access all services.",
    });
    
    setTimeout(() => {
      navigate('/login?type=' + userType);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <div className={`p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
              userType === 'volunteer' 
                ? 'bg-gradient-to-r from-blue-600 to-green-600' 
                : 'bg-gradient-to-r from-red-600 to-blue-600'
            }`}>
              {userType === 'volunteer' ? <Users className="h-8 w-8 text-white" /> : <Shield className="h-8 w-8 text-white" />}
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Join Rapid Rescue
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {userType === 'volunteer' ? 'Become a Community Hero' : 'Get Help When You Need It'}
            </p>
          </CardHeader>

          <CardContent>
            <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSignup} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                {userType === 'volunteer' && (
                  <div className="space-y-2">
                    <Label htmlFor="idProof">ID Proof (Aadhar/PAN/Driving License)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="idProof"
                        name="idProof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        required
                        className="h-12"
                      />
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500">
                      Upload clear image/PDF of your government ID for verification
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <span className="text-blue-600 cursor-pointer">Terms & Conditions</span> and <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold text-lg"
                >
                  Create Account
                </Button>
              </form>
            </Tabs>

            <div className="text-center space-y-4 mt-6">
              {userType === 'volunteer' && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <h4 className="font-semibold text-blue-800 mb-2">Volunteer Verification Process:</h4>
                  <ul className="text-blue-700 space-y-1 text-left">
                    <li>• ID verification (24-48 hours)</li>
                    <li>• Background check</li>
                    <li>• Training completion</li>
                    <li>• Account activation</li>
                  </ul>
                </div>
              )}
              
              <div className="text-gray-600">
                Already have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate(`/login?type=${userType}`)}
                  className="text-blue-600 hover:text-blue-700 p-0"
                >
                  Sign in here
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate(`/signup?type=${userType === 'volunteer' ? 'helpseeker' : 'volunteer'}`)}
                className="w-full mt-4"
              >
                Sign up as {userType === 'volunteer' ? 'Help Seeker' : 'Volunteer'} instead
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
