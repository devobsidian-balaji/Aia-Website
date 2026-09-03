import mongoose from 'mongoose';

const aboutContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    default: '',
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
  stats: {
    number1: { type: String, default: '250+' },
    label1: { type: String, default: 'Members' },
    number2: { type: String, default: '90%' },
    label2: { type: String, default: 'Industry Adoption' },
    number3: { type: String, default: '17+' },
    label3: { type: String, default: 'Years of Excellence' },
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export const AboutContent = mongoose.models.AboutContent || mongoose.model('AboutContent', aboutContentSchema);
