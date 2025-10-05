// models/Header.js
import mongoose from 'mongoose';

const headerLinkSchema = new mongoose.Schema({
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

const headerContentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'School Lunch Box'
  },
  logo: {
    url: {
      type: String,
      default: ''
    },
    altText: {
      type: String,
      default: 'School Lunch Box Logo'
    }
  },
  navigationLinks: [headerLinkSchema],
  authSettings: {
    showAuthButtons: {
      type: Boolean,
      default: true
    },
    dashboardRoles: {
      admin: {
        label: {
          type: String,
          default: 'Admin Dashboard'
        },
        path: {
          type: String,
          default: '/AdminDashboard'
        }
      },
      vendor: {
        label: {
          type: String,
          default: 'Vendor Dashboard'
        },
        path: {
          type: String,
          default: '/VendorDashboard'
        }
      },
      user: {
        label: {
          type: String,
          default: 'My Dashboard'
        },
        path: {
          type: String,
          default: '/UserDashboard'
        }
      }
    }
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
  notificationSettings: {
    showNotifications: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      enum: ['left', 'right'],
      default: 'right'
    }
  },
  mobileSettings: {
    breakpoint: {
      type: Number,
      default: 768
    },
    showMobileMenu: {
      type: Boolean,
      default: true
    }
  },
  version: {
    type: String,
    default: '1.0.0'
  }
}, {
  timestamps: true
});

// Static method to get active header content
headerContentSchema.statics.getActiveHeader = function() {
  return this.findOne({})
    .select('-navigationLinks._id') // Exclude link IDs
    .lean();
};

// Method to get navigation links in order
headerContentSchema.methods.getOrderedLinks = function() {
  return this.navigationLinks
    .filter(link => link.isActive)
    .sort((a, b) => a.order - b.order);
};

// Method to get dashboard settings for a specific role
headerContentSchema.methods.getDashboardSettings = function(role) {
  const roleSettings = this.authSettings.dashboardRoles[role];
  return roleSettings || this.authSettings.dashboardRoles.user;
};

const HeaderContent = mongoose.model('HeaderContent', headerContentSchema);

export default HeaderContent;