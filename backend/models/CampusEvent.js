import mongoose from 'mongoose';

const campusEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',
    trim: true,
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

export const CampusEvent = mongoose.models.CampusEvent || mongoose.model('CampusEvent', campusEventSchema);
