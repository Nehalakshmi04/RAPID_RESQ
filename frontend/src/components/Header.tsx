
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, User, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState<'volunteer' | 'helpseeker' | null>(null);

  const handleEmergencyCall = () => {
    window.open('tel:112', '_self');
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-red-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Rapid Rescue
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Services
            </Link>
            <Link to="/professional-help" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Professional Help
            </Link>
            <Link to="/petcare" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Pet Care
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleEmergencyCall}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full animate-pulse"
            >
              Emergency 112
            </Button>
            
            {!isLoggedIn ? (
              <div className="hidden md:flex space-x-2">
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border shadow-lg w-48">
                <DropdownMenuItem onClick={() => navigate('/services')}>
                  Services
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/professional-help')}>
                  Professional Help
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/petcare')}>
                  Pet Care
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/about')}>
                  About
                </DropdownMenuItem>
                {!isLoggedIn && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/signup')}>
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
