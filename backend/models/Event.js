import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 70,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: 220,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  eventLink: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    default: '22 Aug',
    trim: true,
    maxlength: 20,
  },
  category: {
    type: String,
    default: 'Conferences',
    trim: true,
    enum: ['Conferences', 'Workshops', 'Webinars', 'Training Programs', 'Exhibitions'],
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

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
