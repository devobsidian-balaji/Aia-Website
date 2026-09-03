import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
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
  category: {
    type: String,
    default: 'Milestone', // Vision, Mission, Objectives, Milestone
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

export const Roadmap = mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);
