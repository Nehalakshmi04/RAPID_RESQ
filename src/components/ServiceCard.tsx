
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isEmergency?: boolean;
  isProfessional?: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  isEmergency = false,
  isProfessional = false,
  onClick
}) => {
  const getCardStyles = () => {
    if (isEmergency) {
      return "border-red-200 hover:border-red-400 hover:shadow-red-100";
    }
    if (isProfessional) {
      return "border-blue-200 hover:border-blue-400 hover:shadow-blue-100";
    }
    return "border-green-200 hover:border-green-400 hover:shadow-green-100";
  };

  const getIconStyles = () => {
    if (isEmergency) {
      return "bg-red-100 text-red-600";
    }
    if (isProfessional) {
      return "bg-blue-100 text-blue-600";
    }
    return "bg-green-100 text-green-600";
  };

  const getButtonStyles = () => {
    if (isEmergency) {
      return "bg-red-600 hover:bg-red-700";
    }
    if (isProfessional) {
      return "bg-blue-600 hover:bg-blue-700";
    }
    return "bg-green-600 hover:bg-green-700";
  };

  return (
    <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${getCardStyles()}`}>
      <CardHeader className="text-center pb-3">
        <div className={`w-16 h-16 rounded-full ${getIconStyles()} flex items-center justify-center mx-auto mb-3`}>
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        <Button
          onClick={onClick}
          className={`w-full ${getButtonStyles()} text-white font-medium py-2 rounded-lg transition-colors`}
        >
          {isEmergency ? 'Get Help Now' : isProfessional ? 'Book Service' : 'Request Help'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
