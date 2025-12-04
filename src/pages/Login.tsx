import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, ArrowLeft, Heart, Shield, AlertCircle, Briefcase, Users, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userType = searchParams.get('type') || 'helpseeker';
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    idProof: null as File | null,
    professionalCertificate: null as File | null
  });
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedSubdomains, setSelectedSubdomains] = useState<string[]>([]);
  const [showDomainSelection, setShowDomainSelection] = useState(false);
  const [showSubdomainSelection, setShowSubdomainSelection] = useState(false);
  const [showIdUpload, setShowIdUpload] = useState(false);

  const domains = [
    {
      id: 'emergency',
      name: 'Emergency Services',
      icon: AlertCircle,
      color: 'text-red-600',
      subcategories: [
        { id: 'accident', name: 'Accident Response', description: 'First aid and accident site management' },
        { id: 'elderly', name: 'Elderly Care', description: 'Senior citizen assistance and care' },
        { id: 'women-safety', name: 'Women Safety', description: 'Women safety and security assistance' },
        { id: 'fire', name: 'Fire Emergency', description: 'Fire safety and evacuation assistance' }
      ]
    },
    {
      id: 'professional',
      name: 'Professional Help',
      icon: Briefcase,
      color: 'text-blue-600',
      subcategories: [
        { id: 'mental-health', name: 'Mental Health Support', description: 'Counseling and psychological support' },
        { id: 'legal', name: 'Legal Aid', description: 'Legal consultation and assistance' },
        { id: 'financial', name: 'Financial Advisory', description: 'Financial planning and advice' },
        { id: 'tutoring', name: 'Tutoring', description: 'Educational support and tutoring' }
      ]
    },
    {
      id: 'petcare',
      name: 'Pet Care Services',
      icon: Heart,
      color: 'text-green-600',
      subcategories: [
        { id: 'rescue', name: 'Animal Rescue', description: 'Animal rescue and rehabilitation' },
        { id: 'daycare', name: 'Pet Daycare', description: 'Pet sitting and daycare services' },
        { id: 'veterinary', name: 'Veterinary Care', description: 'Veterinary assistance and care' },
        { id: 'training', name: 'Pet Training', description: 'Animal training and behavior modification' }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleDomainToggle = (domainId: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleSubdomainToggle = (subdomainId: string) => {
    setSelectedSubdomains(prev => 
      prev.includes(subdomainId) 
        ? prev.filter(id => id !== subdomainId)
        : [...prev, subdomainId]
    );
  };

  const handleInitialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }
    
    if (userType === 'volunteer') {
      setShowDomainSelection(true);
    } else {
      completeLogin();
    }
  };

  const handleDomainNext = () => {
    if (selectedDomains.length > 0) {
      setShowSubdomainSelection(true);
    }
  };

  const handleSubdomainNext = () => {
    if (selectedSubdomains.length > 0) {
      setShowIdUpload(true);
    }
  };

  const completeLogin = () => {
    // Store user data in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', formData.name || 'User');
    
    if (userType === 'volunteer' && selectedDomains.length > 0) {
      localStorage.setItem('volunteerDomains', JSON.stringify(selectedDomains));
      localStorage.setItem('volunteerSubdomains', JSON.stringify(selectedSubdomains));
    }
    
    toast({
      title: "Login Successful!",
      description: `Welcome ${formData.name}! Redirecting to your dashboard...`,
    });
    
    setTimeout(() => {
      if (userType === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/');
      }
    }, 1500);
  };

  const getAvailableSubcategories = () => {
    return domains
      .filter(domain => selectedDomains.includes(domain.id))
      .flatMap(domain => domain.subcategories);
  };

  // ID Upload Screen
  if (showIdUpload) {
    const needsProfessionalCert = selectedSubdomains.some(sub => 
      ['mental-health', 'legal', 'financial', 'veterinary'].includes(sub)
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Button
            onClick={() => setShowIdUpload(false)}
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Specializations
          </Button>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Upload Required Documents
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Please upload your identification and professional certificates
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Government ID */}
              <div className="border rounded-lg p-4">
                <Label className="text-lg font-semibold mb-3 block">Government ID Proof *</Label>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a clear image of your Aadhar Card, PAN Card, Driving License, or Passport
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    name="idProof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required
                    className="h-12"
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                {formData.idProof && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.idProof.name} uploaded</p>
                )}
              </div>

              {/* Professional Certificate */}
              {needsProfessionalCert && (
                <div className="border rounded-lg p-4">
                  <Label className="text-lg font-semibold mb-3 block">Professional Certificate *</Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload your professional license, degree, or certification relevant to your expertise:
                  </p>
                  <ul className="text-sm text-gray-600 mb-4 space-y-1">
                    {selectedSubdomains.includes('mental-health') && <li>• Psychology/Counseling degree/license</li>}
                    {selectedSubdomains.includes('legal') && <li>• Law degree/Bar council enrollment</li>}
                    {selectedSubdomains.includes('financial') && <li>• CA/CFA/Financial advisor certification</li>}
                    {selectedSubdomains.includes('veterinary') && <li>• Veterinary degree/license</li>}
                  </ul>
                  <div className="flex items-center gap-2">
                    <Input
                      name="professionalCertificate"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      required
                      className="h-12"
                    />
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  {formData.professionalCertificate && (
                    <p className="text-sm text-green-600 mt-2">✓ {formData.professionalCertificate.name} uploaded</p>
                  )}
                </div>
              )}

              {/* Verification Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Verification Process:</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Document verification (24-48 hours)</li>
                  <li>• Background verification</li>
                  <li>• Reference check (if applicable)</li>
                  <li>• Account activation notification</li>
                </ul>
              </div>

              <Button
                onClick={completeLogin}
                disabled={!formData.idProof || (needsProfessionalCert && !formData.professionalCertificate)}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg"
              >
                Complete Registration
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your documents will be securely stored and used only for verification purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showSubdomainSelection) {
    const availableSubcategories = getAvailableSubcategories();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Button
            onClick={() => setShowSubdomainSelection(false)}
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domain Selection
          </Button>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Select Your Specializations
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Choose specific areas within your expertise domains
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 mb-6">
                {availableSubcategories.map((subcategory) => (
                  <div key={subcategory.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={subcategory.id}
                        checked={selectedSubdomains.includes(subcategory.id)}
                        onCheckedChange={() => handleSubdomainToggle(subcategory.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={subcategory.id} className="font-semibold cursor-pointer block mb-1">
                          {subcategory.name}
                        </Label>
                        <p className="text-sm text-gray-600">{subcategory.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubdomainNext}
                disabled={selectedSubdomains.length === 0}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-lg"
              >
                Next: Upload Documents ({selectedSubdomains.length} specializations selected)
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                You can update your specializations anytime from your dashboard settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showDomainSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Button
            onClick={() => setShowDomainSelection(false)}
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Choose Your Expertise
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Select the areas where you'd like to help (you can choose multiple)
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 mb-6">
                {domains.map((domain) => (
                  <div key={domain.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={domain.id}
                        checked={selectedDomains.includes(domain.id)}
                        onCheckedChange={() => handleDomainToggle(domain.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <domain.icon className={`h-5 w-5 ${domain.color}`} />
                          <Label htmlFor={domain.id} className="font-semibold cursor-pointer">
                            {domain.name}
                          </Label>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="mb-2">Subcategories:</p>
                          <div className="flex flex-wrap gap-1">
                            {domain.subcategories.map((sub, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {sub.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleDomainNext}
                disabled={selectedDomains.length === 0}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg"
              >
                Next: Choose Specializations ({selectedDomains.length} selected)
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                You can update your preferences anytime from your dashboard settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <div className="bg-gradient-to-r from-red-600 to-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {userType === 'volunteer' ? 'Volunteer Portal' : 'Help Seeker Portal'}
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

              <form onSubmit={handleInitialLogin} className="space-y-4 mt-6">
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold text-lg"
                >
                  {userType === 'volunteer' ? 'Next: Choose Expertise' : 'Sign In'}
                </Button>
              </form>
            </Tabs>

            <div className="text-center space-y-4">
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Forgot Password?
              </Button>
              
              <div className="text-gray-600">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate(`/signup?type=${userType}`)}
                  className="text-blue-600 hover:text-blue-700 p-0"
                >
                  Sign up here
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                {userType === 'volunteer' && (
                  <p className="bg-blue-50 p-3 rounded-lg">
                    <strong>Note:</strong> Volunteer accounts require verification with ID proof and relevant certificates before activation.
                  </p>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => navigate(`/login?type=${userType === 'volunteer' ? 'helpseeker' : 'volunteer'}`)}
                className="w-full mt-4"
              >
                Switch to {userType === 'volunteer' ? 'Help Seeker' : 'Volunteer'} Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
