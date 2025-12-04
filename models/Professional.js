const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  certifications: [{
    name: String,
    issuingBody: String,
    year: Number,
    certificateUrl: String
  }],
  experience: [{
    position: String,
    organization: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  specialties: [String],
  availability: {
    weekdays: [String],
    startTime: String,
    endTime: String
  },
  hourlyRate: Number,
  consultationFee: Number,
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Professional', professionalSchema);
