
import React from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Scissors, 
  GraduationCap, 
  Home,
  Stethoscope,
  Car,
  Camera,
  Star,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

const PetCareServices = () => {
  const navigate = useNavigate();

  const petServices = [
    {
      title: 'Veterinary Care',
      description: 'Professional medical care for your pets',
      icon: Stethoscope,
      price: '₹500 - ₹2000',
      path: '/veterinary-services'
    },
    {
      title: 'Pet Grooming',
      description: 'Complete grooming and hygiene services',
      icon: Scissors,
      price: '₹300 - ₹800',
      path: '/pet-grooming'
    },
    {
      title: 'Pet Training',
      description: 'Behavior training and obedience classes',
      icon: GraduationCap,
      price: '₹200 - ₹500',
      path: '/pet-training'
    },
    {
      title: 'Pet Boarding',
      description: 'Safe and comfortable boarding services',
      icon: Home,
      price: '₹400 - ₹1000/day',
      path: '/pet-boarding'
    },
    {
      title: 'Pet Transportation',
      description: 'Safe transport for vet visits and relocations',
      icon: Car,
      price: '₹200 - ₹500',
      path: '/pet-transport'
    },
    {
      title: 'Pet Photography',
      description: 'Professional pet photo sessions',
      icon: Camera,
      price: '₹800 - ₹2000',
      path: '/pet-photography'
    }
  ];

  const featuredProviders = [
    {
      name: 'Happy Paws Clinic',
      service: 'Veterinary Care',
      rating: 4.9,
      reviews: 245,
      distance: '1.2 km',
      price: '₹500 onwards',
      availability: 'Open now',
      phone: '+91 9876543210'
    },
    {
      name: 'Furry Friends Grooming',
      service: 'Pet Grooming',
      rating: 4.8,
      reviews: 189,
      distance: '0.8 km',
      price: '₹300 onwards',
      availability: 'Open now',
      phone: '+91 9876543211'
    },
    {
      name: 'Pawsome Training Academy',
      service: 'Pet Training',
      rating: 4.7,
      reviews: 156,
      distance: '2.1 km',
      price: '₹200 onwards',
      availability: 'Appointment only',
      phone: '+91 9876543212'
    }
  ];

  const petCarePackages = [
    {
      name: 'Basic Care Package',
      price: '₹999/month',
      services: ['Monthly vet checkup', 'Basic grooming', 'Vaccination reminders'],
      popular: false
    },
    {
      name: 'Premium Care Package',
      price: '₹1999/month',
      services: ['Bi-weekly vet visits', 'Professional grooming', 'Training sessions', 'Emergency support'],
      popular: true
    },
    {
      name: 'Luxury Care Package',
      price: '₹3499/month',
      services: ['Weekly vet visits', 'Spa grooming', 'Personal trainer', '24/7 emergency', 'Pet photography'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
            Professional Pet Care Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Comprehensive care for your beloved pets with verified professionals and convenient booking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => navigate('/book-pet-service')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="mr-2 h-6 w-6" />
              Book Pet Service
            </Button>
            <Button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-8 rounded-full text-lg"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Pet Care Services */}
      <section id="services" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Pet Care Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From routine care to specialized services, we have everything your pet needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {petServices.map((service, index) => (
            <Card key={index} className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-200 hover:border-blue-400">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                <p className="text-blue-600 font-semibold mb-4">{service.price}</p>
                <Button
                  onClick={() => navigate(service.path)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Book Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Service Providers */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Featured Service Providers</h2>
          <p className="text-lg text-gray-600">Top-rated professionals near you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {featuredProviders.map((provider, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <p className="text-gray-600 text-sm">{provider.service}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(provider.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({provider.reviews})</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{provider.distance}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-green-600">{provider.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{provider.availability}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    Book Now
                  </Button>
                  <Button 
                    onClick={() => window.open(`tel:${provider.phone}`, '_self')}
                    variant="outline" 
                    size="sm"
                    className="border-green-600 text-green-600"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Care Packages */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Pet Care Packages</h2>
          <p className="text-lg text-gray-600">Comprehensive care plans for your furry friends</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {petCarePackages.map((pkg, index) => (
            <Card key={index} className={`relative ${pkg.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                <p className="text-3xl font-bold text-blue-600">{pkg.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.services.map((service, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {service}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}>
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600">Simple steps to get the best care for your pet</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Service</h3>
            <p className="text-gray-600">Select the pet care service that best fits your needs.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
            <p className="text-gray-600">Schedule with verified professionals at your convenience.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Quality Care</h3>
            <p className="text-gray-600">Enjoy professional care for your pet with peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Give Your Pet the Best Care?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of pet parents who trust us with their furry family members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full">
              Book Service Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-full"
            >
              Become a Pet Care Provider
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetCareServices;
