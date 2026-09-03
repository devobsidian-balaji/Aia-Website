import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
  icon: {
    type: String,
    default: 'cpu',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
