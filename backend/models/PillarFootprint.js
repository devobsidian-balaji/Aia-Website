import mongoose from 'mongoose';

const pillarFootprintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 220,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  brochureUrl: {
    type: String,
    default: '#',
    trim: true,
  },
  isHighlighted: {
    type: Boolean,
    default: false,
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

export const PillarFootprint = mongoose.models.PillarFootprint || mongoose.model('PillarFootprint', pillarFootprintSchema);
