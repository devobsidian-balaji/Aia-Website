import mongoose from 'mongoose';

const councilMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  fullRole: {
    type: String,
    default: '',
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
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

export const CouncilMember = mongoose.models.CouncilMember || mongoose.model('CouncilMember', councilMemberSchema);
