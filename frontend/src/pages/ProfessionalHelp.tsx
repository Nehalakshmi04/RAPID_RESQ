import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Shield, 
  Star, 
  Users, 
  Search,
  Filter,
  MapPin,
  Clock,
  Phone,
  Award
} from 'lucide-react';

const ProfessionalHelp = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: Users },
    { id: 'mental-health', name: 'Mental Health', icon: Heart },
    { id: 'legal', name: 'Legal Aid', icon: Shield },
    { id: 'financial', name: 'Financial Advisory', icon: Star },
    { id: 'tutoring', name: 'Weekend Tutoring', icon: Users }
  ];

  const professionals = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      category: 'mental-health',
      specialty: 'Clinical Psychologist',
      rating: 4.9,
      experience: '12 years',
      location: 'Mumbai, Maharashtra',
      price: '₹800/session',
      availability: 'Available today',
      verified: true,
      languages: ['Hindi', 'English', 'Marathi'],
      phone: '+91 98765 43210',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Adv. Rajesh Kumar',
      category: 'legal',
      specialty: 'Criminal & Civil Law',
      rating: 4.7,
      experience: '15 years',
      location: 'Delhi, India',
      price: '₹1200/consultation',
      availability: 'Available tomorrow',
      verified: true,
      languages: ['Hindi', 'English'],
      phone: '+91 98765 43211',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'CA Sneha Patel',
      category: 'financial',
      specialty: 'Tax & Investment Planning',
      rating: 4.8,
      experience: '10 years',
      location: 'Pune, Maharashtra',
      price: '₹1000/session',
      availability: 'Available today',
      verified: true,
      languages: ['Hindi', 'English', 'Gujarati'],
      phone: '+91 98765 43212',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Prof. Amit Singh',
      category: 'tutoring',
      specialty: 'Mathematics & Physics',
      rating: 4.9,
      experience: '8 years',
      location: 'Bangalore, Karnataka',
      price: '₹500/hour',
      availability: 'Weekends only',
      verified: true,
      languages: ['Hindi', 'English'],
      phone: '+91 98765 43213',
      image: '/placeholder.svg'
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesCategory = selectedCategory === 'all' || prof.category === selectedCategory;
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookConsultation = (professional: any) => {
    navigate(`/professional/${professional.id}/book`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Help Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified professionals for mental health, legal aid, financial advisory, and educational support at affordable rates.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search professionals by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CardTitle className="text-lg">{professional.name}</CardTitle>
                  {professional.verified && (
                    <Award className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm">{professional.specialty}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(professional.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({professional.rating})</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {professional.experience}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{professional.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{professional.availability}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {professional.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-semibold text-green-600">
                    {professional.price}
                  </div>
                  <Button
                    onClick={() => handleBookConsultation(professional)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Book Now
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`tel:${professional.phone}`, '_self')}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Quick Call
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No professionals found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Why Choose Professional Help */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl mx-4 shadow-lg mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose Our Professional Services?</h2>
          <p className="text-lg text-gray-600">Verified, affordable, and accessible professional help</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
            <p className="text-gray-600">All professionals are verified with proper certifications and credentials</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Affordable Rates</h3>
            <p className="text-gray-600">Quality professional services at affordable and transparent pricing</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">Book sessions at your convenience, including weekends and evenings</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalHelp;
