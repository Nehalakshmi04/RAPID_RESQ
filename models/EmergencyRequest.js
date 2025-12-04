const mongoose = require('mongoose');
const geolib = require('geolib');

const emergencyRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domain: {
    type: String,
    enum: ['accident', 'elderly', 'womenSafety', 'fire', 'medical'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  description: String,
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'inProgress', 'completed', 'cancelled', 'escalated'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  escalationInfo: {
    type: {
      type: String,
      enum: ['hospital', 'police', 'fire', 'ambulance']
    },
    contact: String,
    reason: String
  },
  priority: {
    type: Number,
    default: 0
  },
  responseTime: {
    type: Date
  },
  completionTime: {
    type: Date
  },
  feedback: {
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    comment: String
  },
  emergencyContacts: [{
    name: String,
    relationship: String,
    phone: String
  }]
}, { timestamps: true });

// Calculate priority based on severity and domain
emergencyRequestSchema.pre('save', function(next) {
  const priorities = {
    high: 3,
    medium: 2,
    low: 1
  };
  
  this.priority = priorities[this.severity];
  
  if (this.domain === 'medical' || this.domain === 'fire') {
    this.priority += 2;
  }
  
  next();
});

// Method to find nearby volunteers
emergencyRequestSchema.methods.findNearbyVolunteers = async function(radius = 10000) {
  const volunteers = await this.model('User').find({
    userType: 'volunteer',
    isVerified: true,
    domains: this.domain
  });

  return volunteers.filter(volunteer => {
    const distance = geolib.getDistance(
      { latitude: volunteer.location.latitude, longitude: volunteer.location.longitude },
      { latitude: this.location.latitude, longitude: this.location.longitude }
    );
    return distance <= radius;
  });
};

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);
