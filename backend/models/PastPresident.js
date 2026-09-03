import mongoose from 'mongoose';

const pastPresidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  term: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'Past President',
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

export const PastPresident = mongoose.models.PastPresident || mongoose.model('PastPresident', pastPresidentSchema);
