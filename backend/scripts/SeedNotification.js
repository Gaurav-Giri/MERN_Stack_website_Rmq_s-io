// scripts/SeedNotification.js
import mongoose from 'mongoose';
import Notification from '../models/Notification.js';
import User from '../models/user.js'; // Assuming you have a User model
import dotenv from 'dotenv';
dotenv.config();

// Sample notification data
const sampleNotifications = [
  // Order-related notifications
  {
    message: "Your order #ORD001 has been confirmed and is being prepared",
    type: "order",
    priority: "medium",
    read: false
  },
  {
    message: "Order #ORD002 is out for delivery. Expected delivery: 12:30 PM",
    type: "order",
    priority: "high",
    read: false
  },
  {
    message: "Order #ORD003 has been delivered successfully. Enjoy your meal!",
    type: "order",
    priority: "medium",
    read: true
  },
  {
    message: "Your scheduled order for tomorrow has been confirmed",
    type: "order",
    priority: "low",
    read: true
  },
  {
    message: "Order #ORD004 delivery is delayed by 15 minutes. We apologize for the inconvenience",
    type: "order",
    priority: "high",
    read: false
  },

  // Promotion-related notifications
  {
    message: "🎉 Special Offer! Get 20% off on all orders this weekend. Use code: WEEKEND20",
    type: "promotion",
    priority: "high",
    read: false
  },
  {
    message: "New menu items available! Try our delicious Paneer Butter Masala and Garlic Naan",
    type: "promotion",
    priority: "medium",
    read: false
  },
  {
    message: "Refer a friend and get ₹100 off on your next order",
    type: "promotion",
    priority: "medium",
    read: true
  },
  {
    message: "Weekend Special: Buy any 2 meals and get 1 dessert free!",
    type: "promotion",
    priority: "medium",
    read: false
  },

  // System notifications
  {
    message: "Welcome to School Lunch Box! We're excited to serve you nutritious meals",
    type: "system",
    priority: "low",
    read: true
  },
  {
    message: "System maintenance scheduled for Sunday 2:00 AM - 4:00 AM. Service may be temporarily unavailable",
    type: "system",
    priority: "medium",
    read: false
  },
  {
    message: "Your profile has been updated successfully",
    type: "system",
    priority: "low",
    read: true
  },
  {
    message: "New features available! Check out our improved meal tracking system",
    type: "system",
    priority: "medium",
    read: false
  },

  // Message notifications
  {
    message: "New message from support team: We've received your feedback, thank you!",
    type: "message",
    priority: "medium",
    read: false
  },
  {
    message: "Your query regarding meal customization has been addressed",
    type: "message",
    priority: "medium",
    read: true
  },

  // Admin notifications
  {
    message: "URGENT: High demand for Butter Chicken today. Please ensure sufficient stock",
    type: "admin",
    priority: "high",
    read: false
  },
  {
    message: "New school registration request pending approval",
    type: "admin",
    priority: "medium",
    read: false
  },
  {
    message: "Weekly sales report is ready for review",
    type: "admin",
    priority: "low",
    read: true
  },
  {
    message: "Inventory alert: Low stock for basmati rice. Please restock",
    type: "admin",
    priority: "high",
    read: false
  }
];
// Add this function to your SeedNotification.js
const sendWelcomeNotificationToAllUsers = async () => {
  try {
    const users = await User.find().select('_id name email');
    
    if (users.length === 0) {
      console.log('❌ No users found for welcome notification');
      return;
    }

    const welcomeNotifications = users.map(user => ({
      user: user._id,
      message: "🔔 Notification service is working! Welcome to School Lunch Box",
      type: "system",
      priority: "low",
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await Notification.insertMany(welcomeNotifications);
    console.log(`✅ Sent welcome notification to ${users.length} users`);
    
  } catch (error) {
    console.error('❌ Error sending welcome notifications:', error);
  }
};

// Call it in your seedDatabase function

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting notification database seeding...');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await sendWelcomeNotificationToAllUsers();
    // Get some sample users to assign notifications to
    const users = await User.find().limit(5).select('_id name email');
    
    if (users.length === 0) {
      console.log('❌ No users found in database. Please seed users first.');
      process.exit(1);
    }
    
    console.log(`👥 Found ${users.length} users for notification assignment`);
    
    // Clear existing notifications
    await Notification.deleteMany({});
    console.log('🗑️ Cleared existing notifications');
    
    // Create notifications for each user
    const notificationsToInsert = [];
    
    users.forEach((user, userIndex) => {
      // Assign different sets of notifications to each user
      const startIndex = userIndex * 4; // 4 notifications per user
      const userNotifications = sampleNotifications.slice(startIndex, startIndex + 4);
      
      userNotifications.forEach((notification, notifIndex) => {
        // Add some variation in read status and creation dates
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 7)); // Random date in last 7 days
        
        notificationsToInsert.push({
          user: user._id,
          message: notification.message,
          type: notification.type,
          priority: notification.priority,
          read: notification.read,
          createdAt: createdAt,
          updatedAt: createdAt
        });
      });
    });
    
    // Insert all notifications
    const result = await Notification.insertMany(notificationsToInsert);
    console.log(`✅ Added ${result.length} notifications to database`);
    
    // Display notification statistics
    const totalNotifications = await Notification.countDocuments();
    const unreadCount = await Notification.countDocuments({ read: false });
    const readCount = await Notification.countDocuments({ read: true });
    
    console.log('\n📊 Notification Database Statistics:');
    console.log(`Total Notifications: ${totalNotifications}`);
    console.log(`Unread Notifications: ${unreadCount}`);
    console.log(`Read Notifications: ${readCount}`);
    
    // Statistics by type
    const notificationsByType = await Notification.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📋 Notifications by Type:');
    notificationsByType.forEach(typeStat => {
      console.log(`   ${typeStat._id}: ${typeStat.count}`);
    });
    
    // Statistics by priority
    const notificationsByPriority = await Notification.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    console.log('\n🎯 Notifications by Priority:');
    notificationsByPriority.forEach(priorityStat => {
      console.log(`   ${priorityStat._id}: ${priorityStat.priority}`);
    });
    
    // User-wise notification count
    const userNotificationStats = await Notification.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' }
    ]);
    
    console.log('\n👤 Notifications per User:');
    userNotificationStats.forEach(userStat => {
      console.log(`   ${userStat.user.name}: ${userStat.count} notifications`);
    });
    
    // Recent notifications sample
    const recentNotifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');
    
    console.log('\n📨 Recent Notifications Sample:');
    recentNotifications.forEach((notification, index) => {
      console.log(`\n${index + 1}. ${notification.message}`);
      console.log(`   User: ${notification.user.name}`);
      console.log(`   Type: ${notification.type}`);
      console.log(`   Priority: ${notification.priority}`);
      console.log(`   Read: ${notification.read}`);
      console.log(`   Created: ${notification.createdAt.toLocaleDateString()}`);
    });
    
    // Priority distribution
    console.log('\n⚠️  Priority Distribution:');
    const highPriority = await Notification.countDocuments({ priority: 'high' });
    const mediumPriority = await Notification.countDocuments({ priority: 'medium' });
    const lowPriority = await Notification.countDocuments({ priority: 'low' });
    
    console.log(`   High Priority: ${highPriority}`);
    console.log(`   Medium Priority: ${mediumPriority}`);
    console.log(`   Low Priority: ${lowPriority}`);
    
    // Read status by type
    console.log('\n📈 Read Status by Type:');
    const typeReadStats = await Notification.aggregate([
      {
        $group: {
          _id: { type: '$type', read: '$read' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.type': 1, '_id.read': 1 } }
    ]);
    
    typeReadStats.forEach(stat => {
      const status = stat._id.read ? 'Read' : 'Unread';
      console.log(`   ${stat._id.type} - ${status}: ${stat.count}`);
    });
    
    console.log('\n✅ Notification seeding completed successfully!');
    
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding notification database:', error);
    process.exit(1);
  }
};

// Execute the seeding script
seedDatabase();