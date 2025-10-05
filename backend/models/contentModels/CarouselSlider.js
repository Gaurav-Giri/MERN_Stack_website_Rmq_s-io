// models/CarouselBanner.js
import mongoose from 'mongoose';

const carouselBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // URL or file path
    required: true
  },
  text: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String, // Optional link when banner is clicked
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  targetAudience: {
    type: [String],
    enum: ['all', 'students', 'parents', 'teachers', 'vendors'],
    default: ['all']
  }
}, {
  timestamps: true
});

// Index for active banners and ordering
carouselBannerSchema.index({ isActive: 1, order: 1, startDate: 1, endDate: 1 });

const CarouselBanner = mongoose.model('CarouselBanner', carouselBannerSchema);

export default CarouselBanner;
