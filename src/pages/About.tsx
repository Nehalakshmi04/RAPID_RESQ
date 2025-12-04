
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Heart, 
  Shield, 
  Users, 
  MapPin, 
  Clock,
  Star,
  Target,
  Eye,
  Award,
  Globe,
  Zap
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Get help within 5 minutes through our network of verified volunteers'
    },
    {
      icon: MapPin,
      title: 'Location-Based Matching',
      description: 'Automatically connects you with the nearest available helpers'
    },
    {
      icon: Shield,
      title: 'Verified Volunteers',
      description: 'All volunteers go through background checks and verification process'
    },
    {
      icon: Globe,
      title: '24/7 Availability',
      description: 'Round-the-clock emergency assistance across 500+ cities'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Lives Helped' },
    { number: '5,000+', label: 'Active Volunteers' },
    { number: '500+', label: 'Cities Covered' },
    { number: '98%', label: 'Success Rate' }
  ];

  const team = [
    {
      name: 'Emergency Response Team',
      description: 'Trained professionals coordinating emergency services',
      icon: Phone
    },
    {
      name: 'Community Volunteers',
      description: 'Local heroes ready to help in times of need',
      icon: Users
    },
    {
      name: 'Professional Network',
      description: 'Certified experts providing quality services',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Rapid Rescue
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Connecting communities through technology to provide instant help when it matters most.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-r from-red-100 to-red-50 border-red-200">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">Our Mission</h2>
              <p className="text-red-700 leading-relaxed">
                To create a world where help is always within reach. We leverage technology and community spirit 
                to ensure that no one faces emergencies alone, providing instant access to volunteers and professional services.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-100 to-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h2>
              <p className="text-blue-700 leading-relaxed">
                To build the world's largest network of verified volunteers and professionals, creating safer, 
                more connected communities where help is available 24/7, anywhere, anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Choose Rapid Rescue?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with human compassion to deliver unmatched emergency response services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg opacity-90">Making a difference, one rescue at a time</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Started */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">How It All Started</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rapid Rescue was born from a simple yet powerful idea: what if help was always just a tap away? 
              Founded by a team of technology enthusiasts and social workers, we witnessed firsthand how precious 
              minutes can mean the difference between life and death during emergencies.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Starting with just 10 volunteers in one city, we've grown into a nationwide network that has 
              transformed how communities respond to emergencies. Our platform has facilitated over 50,000 
              successful rescues and continues to save lives every day.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Network</h2>
          <p className="text-lg text-gray-600">Meet the heroes who make Rapid Rescue possible</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <member.icon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{member.name}</h3>
                <p className="text-gray-600">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Join Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a community that's making the world safer, one rescue at a time. Whether you need help or want to help others, we're here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/signup?type=volunteer')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full"
            >
              Become a Volunteer
            </Button>
            <Button
              onClick={() => navigate('/signup?type=helpseeker')}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full"
            >
              Get Help When Needed
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions? We're here to help 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('mailto:support@rapidrescue.com')}
              variant="outline"
              className="border-gray-600 text-gray-600"
            >
              Email Support
            </Button>
            <Button 
              onClick={() => window.open('tel:+911800123456')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
