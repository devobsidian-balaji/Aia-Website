import mongoose from 'mongoose';

const initiativeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  information: {
    type: String,
    required: true,
    trim: true,
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

export const Initiative = mongoose.models.Initiative || mongoose.model('Initiative', initiativeSchema);
