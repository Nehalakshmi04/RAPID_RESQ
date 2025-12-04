
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Star,
  MessageCircle,
  Timer,
  User
} from 'lucide-react';

interface EmergencyRequest {
  id: number;
  type: string;
  title: string;
  location: string;
  requester: string;
  phone: string;
  coordinates?: { lat: number; lng: number };
  time: string;
  priority: string;
}

interface EmergencyAssistanceProps {
  request: EmergencyRequest;
  onComplete: (requestId: number) => void;
  onCancel: (requestId: number) => void;
}

const EmergencyAssistance: React.FC<EmergencyAssistanceProps> = ({
  request,
  onComplete,
  onCancel
}) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<'responding' | 'arrived' | 'helping' | 'completed'>('responding');
  const [timer, setTimer] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showLocationAfterAccept, setShowLocationAfterAccept] = useState(false);

  useEffect(() => {
    // Only show location after volunteer accepts the request
    setShowLocationAfterAccept(true);
    
    // Start timer
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusUpdate = (newStatus: typeof status) => {
    setStatus(newStatus);
    
    const statusMessages = {
      responding: "Status updated: Responding to emergency",
      arrived: "Status updated: Arrived at location",
      helping: "Status updated: Providing assistance",
      completed: "Status updated: Emergency assistance completed"
    };
    
    toast({
      title: statusMessages[newStatus],
      description: newStatus === 'completed' ? "Please provide feedback for the help seeker." : undefined,
    });
  };

  const handleComplete = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please rate the help seeker before completing.",
      });
      return;
    }
    
    onComplete(request.id);
  };

  const handleNavigate = () => {
    if (request.coordinates && showLocationAfterAccept) {
      window.open(`https://maps.google.com/?q=${request.coordinates.lat},${request.coordinates.lng}`, '_blank');
    } else {
      toast({
        title: "Location Access",
        description: "Location is only accessible after accepting the emergency request.",
      });
    }
  };

  const handleCall = () => {
    window.open(`tel:${request.phone}`, '_self');
  };

  const getStatusColor = () => {
    switch (status) {
      case 'responding': return 'bg-blue-100 text-blue-800';
      case 'arrived': return 'bg-yellow-100 text-yellow-800';
      case 'helping': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-2 border-red-200 bg-red-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="mr-2 h-5 w-5" />
            Active Emergency Response
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor()}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <Badge variant="outline" className="font-mono">
              <Timer className="mr-1 h-3 w-3" />
              {formatTime(timer)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Emergency Details */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-3">{request.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                <span>{request.location}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-400" />
                <span>{request.requester}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                <span>Reported: {request.time}</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-gray-400" />
                <span className="capitalize">Priority: {request.priority}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={handleCall}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Help Seeker
          </Button>
          
          <Button
            onClick={handleNavigate}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            disabled={!showLocationAfterAccept}
          >
            <Navigation className="mr-2 h-4 w-4" />
            Navigate
          </Button>
          
          <Button
            onClick={() => window.open(`sms:${request.phone}`, '_self')}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Send SMS
          </Button>
        </div>

        {/* Status Updates */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3">Update Status</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['responding', 'arrived', 'helping', 'completed'] as const).map((statusOption) => (
              <Button
                key={statusOption}
                onClick={() => handleStatusUpdate(statusOption)}
                variant={status === statusOption ? 'default' : 'outline'}
                size="sm"
                className="capitalize"
              >
                {statusOption}
              </Button>
            ))}
          </div>
        </div>

        {/* Completion Section */}
        {status === 'completed' && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-3 text-green-800">Complete Emergency Response</h4>
            
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rate the Help Seeker</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Feedback (Optional)</label>
              <Textarea
                placeholder="Share your experience or any additional notes..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Response
              </Button>
              <Button
                onClick={() => onCancel(request.id)}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions for other statuses */}
        {status !== 'completed' && (
          <div className="flex space-x-3">
            <Button
              onClick={() => handleStatusUpdate('completed')}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
            <Button
              onClick={() => onCancel(request.id)}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              Cancel Response
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyAssistance;
