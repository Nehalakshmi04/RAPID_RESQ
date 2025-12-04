const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    enum: ['legal', 'financial', 'mentalHealth', 'tutoring', 'petCare'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  mode: {
    type: String,
    enum: ['inPerson', 'online'],
    default: 'inPerson'
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  amount: Number,
  notes: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  review: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
