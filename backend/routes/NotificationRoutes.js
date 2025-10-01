// import express from 'express';

// import auth from '../middleware/auth.js';
// import NotificationHandler from '../handler/NotificationHandler.js';
// const router = express.Router();
// // Get all notifications for authenticated user
// router.get('/', auth, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
    
//     const result = await NotificationHandler.getUserNotifications(req.user.id, page, limit);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get unread count
// router.get('/unread-count', auth, async (req, res) => {
//   try {
//     const result = await NotificationHandler.getUnreadCount(req.user.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Mark notification as read
// router.put('/:id/read', auth, async (req, res) => {
//   try {
//     const result = await NotificationHandler.markAsRead(req.params.id, req.user.id);
//     res.json(result);
//   } catch (error) {
//     if (error.message === 'Notification not found') {
//       return res.status(404).json({ error: error.message });
//     }
//     res.status(500).json({ error: error.message });
//   }
// });

// // Mark all as read
// router.put('/mark-all-read', auth, async (req, res) => {
//   try {
//     const result = await NotificationHandler.markAllAsRead(req.user.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete notification
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const result = await NotificationHandler.deleteNotification(req.params.id, req.user.id);
//     res.json(result);
//   } catch (error) {
//     if (error.message === 'Notification not found') {
//       return res.status(404).json({ error: error.message });
//     }
//     res.status(500).json({ error: error.message });
//   }
// });

// // module.exports = router;

// export default router;






import express from 'express';
import Notification from '../models/Notification.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all notifications for authenticated user (with pagination)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const total = await Notification.countDocuments({ user: req.user.id });
    const unreadCount = await Notification.countDocuments({ 
      user: req.user.id, 
      read: false 
    });

    res.json({ 
      success: true, 
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        unreadCount
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET unread notifications count
router.get('/stats/unread-count', auth, async (req, res) => {
  try {
    const count = await Notification.countDocuments({ 
      user: req.user.id, 
      read: false 
    });

    res.json({ 
      success: true, 
      data: { unreadCount: count }
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET notifications by filter (read/unread)
router.get('/filter', auth, async (req, res) => {
  try {
    const filters = { user: req.user.id };
    
    if (req.query.read !== undefined) {
      filters.read = req.query.read === 'true';
    }
    if (req.query.type) {
      filters.type = req.query.type;
    }
    if (req.query.priority) {
      filters.priority = req.query.priority;
    }

    const notifications = await Notification.find(filters)
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.json({ 
      success: true, 
      data: notifications 
    });
  } catch (error) {
    console.error('Error filtering notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET notification statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments({ 
      user: req.user.id 
    });
    
    const unreadCount = await Notification.countDocuments({ 
      user: req.user.id, 
      read: false 
    });

    const notificationsByType = await Notification.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    const notificationsByPriority = await Notification.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    const recentActivity = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    res.json({
      success: true,
      data: {
        totalNotifications,
        unreadCount,
        readCount: totalNotifications - unreadCount,
        notificationsByType,
        notificationsByPriority,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching notification statistics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET single notification by ID
router.get('/:id', auth, async (req, res) => {
  try {
    // Validate if ID is a valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const notification = await Notification.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('user', 'name email');

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.json({ 
      success: true, 
      data: notification 
    });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// PUT mark notification as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    // Validate if ID is a valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    ).populate('user', 'name email');

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${req.user.id}`).emit('notification-marked-read', { 
        notification 
      });
    }

    res.json({ 
      success: true, 
      data: { notification },
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// PUT mark all notifications as read
router.put('/actions/mark-all-read', auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { read: true }
    );

    const unreadCount = await Notification.countDocuments({ 
      user: req.user.id, 
      read: false 
    });

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${req.user.id}`).emit('all-notifications-marked-read', { 
        unreadCount 
      });
    }

    res.json({ 
      success: true, 
      data: { unreadCount },
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// DELETE notification 
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate if ID is a valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const notification = await Notification.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${req.user.id}`).emit('notification-deleted', { 
        notificationId: req.params.id 
      });
    }

    res.json({ 
      success: true, 
      message: 'Notification deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// POST create new notification (admin functionality)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user has admin privileges
    if (!req.user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    const { userId, message, type = 'system', relatedId = null, priority = 'medium' } = req.body;
    
    // Validate required fields
    if (!userId || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: userId, message' 
      });
    }

    const notification = new Notification({
      user: userId,
      message: message.trim(),
      type,
      relatedId,
      priority,
      read: false
    });

    const newNotification = await notification.save();
    await newNotification.populate('user', 'name email');

    const notificationData = {
      _id: newNotification._id,
      message: newNotification.message,
      type: newNotification.type,
      read: newNotification.read,
      priority: newNotification.priority,
      createdAt: newNotification.createdAt,
      relatedId: newNotification.relatedId,
      user: newNotification.user
    };

    // Emit socket event for real-time notification
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${userId}`).emit('new-notification', notificationData);
    }

    res.status(201).json({ 
      success: true, 
      data: newNotification,
      message: 'Notification sent successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: errors.join(', ') 
      });
    }
    console.error('Error creating notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;