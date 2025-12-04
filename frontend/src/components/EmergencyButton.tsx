
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface EmergencyButtonProps {
  onClick: () => void;
  className?: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick, className = "" }) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse ${className}`}
    >
      <Phone className="mr-2 h-6 w-6" />
      EMERGENCY HELP
    </Button>
  );
};

export default EmergencyButton;
