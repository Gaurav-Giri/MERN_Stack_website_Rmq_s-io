// models/FooterContent.js
import mongoose from 'mongoose';

const footerSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  links: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true
    },
    external: {
      type: Boolean,
      default: false
    }
  }],
  contactInfo: {
    email: String,
    phone: String,
    address: String
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

const footerContentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'School Lunch Box'
  },
  tagline: {
    type: String,
    default: 'Fresh meals delivered to your child\'s school'
  },
  sections: [footerSectionSchema],
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  copyrightText: {
    type: String,
    default: '© 2025 School Lunch Box. All rights reserved.'
  },
  themeSettings: {
    allowThemeToggle: {
      type: Boolean,
      default: true
    },
    defaultTheme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  },
  version: {
    type: String,
    default: '1.0.0'
  }
}, {
  timestamps: true
});

// Static method to get active footer content
footerContentSchema.statics.getActiveFooter = function() {
  return this.findOne({})
    .select('-sections.links._id') // Exclude link IDs
    .lean();
};

const FooterContent = mongoose.model('FooterContent', footerContentSchema);

export default FooterContent;