// models/HomePageContent.js
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String, // Emoji or icon class name
    default: '⭐'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Fresh Meals Delivered to Your Child's School"
  },
  subtitle: {
    type: String,
    required: true,
    default: "Order nutritious lunch for your child with easy delivery to school"
  },
  authenticatedMessage: {
    type: String,
    default: "Welcome back! Ready to order?"
  },
  unauthenticatedMessage: {
    type: String,
    default: "Login to start ordering healthy meals for your child"
  },
  ctaButtonText: {
    type: String,
    default: "Browse Schools"
  },
  loginButtonText: {
    type: String,
    default: "Login to Order"
  },
  backgroundImage: {
    type: String // URL for hero background
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const homePageContentSchema = new mongoose.Schema({
  // Hero Section
  hero: heroSectionSchema,
  
  // Features Section
  featuresSection: {
    title: {
      type: String,
      default: "Why Choose Our Service?"
    },
    features: [featureSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  
  // SEO and Meta
  metaTitle: {
    type: String,
    default: "School Lunch Box - Fresh Meals Delivered to School"
  },
  metaDescription: {
    type: String,
    default: "Order nutritious lunch for your child with easy delivery to school"
  },
  
  // Settings
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: String,
    default: '1.0.0'
  }
}, {
  timestamps: true
});

// Static method to get active homepage content
homePageContentSchema.statics.getActiveContent = function() {
  return this.findOne({ isActive: true })
    .select('-featuresSection.features._id')
    .lean();
};

const HomePageContent = mongoose.model('HomePageContent', homePageContentSchema);

export default HomePageContent;