import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  link: {
    type: String,
    default: '',
    trim: true,
  },
  category: {
    type: String,
    default: 'Articles',
    trim: true,
  },
  date: {
    type: String,
    default: 'Aug 2026',
    trim: true,
    maxlength: 50,
  },
  author: {
    type: String,
    default: 'Automation Industry Association',
    trim: true,
    maxlength: 100,
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

export const Publication = mongoose.models.Publication || mongoose.model('Publication', publicationSchema);
