// routes/NotificationRoutes.js
import express from 'express';
import Notification from '../models/Notification.js';
import MessageProducer from '../rabbitmq/messageProducer.js';

const router = express.Router();

// GET all notifications for a user (with pagination and filters)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filters = { user: userId };
    
    // Type filter
    if (req.query.type) {
      filters.type = req.query.type;
    }
    
    // Read status filter
    if (req.query.read !== undefined) {
      filters.read = req.query.read === 'true';
    }
    
    // Priority filter
    if (req.query.priority) {
      filters.priority = req.query.priority;
    }
    
    // Date range filter
    if (req.query.startDate) {
      filters.createdAt = { $gte: new Date(req.query.startDate) };
    }
    if (req.query.endDate) {
      filters.createdAt = { 
        ...filters.createdAt, 
        $lte: new Date(req.query.endDate) 
      };
    }

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email'),
      Notification.countDocuments(filters),
      Notification.countDocuments({ ...filters, read: false })
    ]);
    
    res.json({ 
      success: true, 
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        unreadCount,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET notification statistics for admin
router.get('/admin/stats/overview', async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments();
    const unreadCount = await Notification.countDocuments({ read: false });
    
    const notificationsByType = await Notification.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    const notificationsByPriority = await Notification.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    const notificationsByDay = await Notification.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 }
    ]);

    const recentNotifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    res.json({
      success: true,
      data: {
        totalNotifications,
        unreadCount,
        readCount: totalNotifications - unreadCount,
        notificationsByType,
        notificationsByPriority,
        notificationsByDay,
        recentNotifications
      }
    });
  } catch (error) {
    console.error('Error fetching notification statistics:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET notifications by search query (admin)
router.get('/admin/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      const notifications = await Notification.find()
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('user', 'name email');
      return res.json({ success: true, data: notifications });
    }
    
    const notifications = await Notification.find({
      $or: [
        { message: { $regex: q, $options: 'i' } },
        { type: { $regex: q, $options: 'i' } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('user', 'name email');
    
    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error searching notifications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET notifications by filter (admin)
router.get('/admin/filter', async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.type) filters.type = req.query.type;
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.read !== undefined) filters.read = req.query.read === 'true';
    
    if (req.query.startDate) {
      filters.createdAt = { $gte: new Date(req.query.startDate) };
    }
    if (req.query.endDate) {
      filters.createdAt = { 
        ...filters.createdAt, 
        $lte: new Date(req.query.endDate) 
      };
    }

    const notifications = await Notification.find(filters)
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error filtering notifications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET single notification by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const notification = await Notification.findById(req.params.id)
      .populate('user', 'name email');
      
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }
    res.json({ success: true, data: notification });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// POST create new notification
router.post('/', async (req, res) => {
  try {
    const { user, message, type, relatedId, priority } = req.body;
    
    if (!user || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: user, message' 
      });
    }

    const notification = new Notification({
      user,
      message: message.trim(),
      type: type || 'system',
      relatedId: relatedId || null,
      priority: priority || 'medium',
      read: false
    });

    const newNotification = await notification.save();
    await newNotification.populate('user', 'name email');
    
    // Publish to RabbitMQ for real-time delivery
    await MessageProducer.publishNotificationEvent('notification_created', {
      notification: newNotification,
      createdVia: 'http'
    });
    
    res.status(201).json({ success: true, data: newNotification });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error creating notification:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST send notification to multiple users (bulk)
router.post('/bulk', async (req, res) => {
  try {
    const { userIds, message, type, relatedId, priority } = req.body;
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: userIds (array), message' 
      });
    }

    const notifications = await Promise.all(
      userIds.map(userId => 
        new Notification({
          user: userId,
          message: message.trim(),
          type: type || 'system',
          relatedId: relatedId || null,
          priority: priority || 'medium',
          read: false
        }).save()
      )
    );

    // Publish to RabbitMQ for real-time delivery to all users
    await MessageProducer.publishNotificationEvent('bulk_notifications_sent', {
      userIds,
      notification: {
        message: message.trim(),
        type: type || 'system',
        priority: priority || 'medium',
        relatedId: relatedId || null
      },
      sentVia: 'http'
    });
    
    res.status(201).json({ 
      success: true, 
      message: `Notifications sent to ${userIds.length} users`,
      data: notifications 
    });
  } catch (error) {
    console.error('Error sending bulk notifications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update notification
router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const { message, type, priority, read } = req.body;
    
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    // Update fields
    if (message) notification.message = message.trim();
    if (type) notification.type = type;
    if (priority) notification.priority = priority;
    if (read !== undefined) notification.read = read;

    const updatedNotification = await notification.save();
    await updatedNotification.populate('user', 'name email');
    
    // Publish to RabbitMQ for real-time updates
    await MessageProducer.publishNotificationEvent('notification_updated', {
      notification: updatedNotification,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedNotification });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// PATCH mark notification as read
router.patch('/:id/read', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    notification.read = true;
    const updatedNotification = await notification.save();
    await updatedNotification.populate('user', 'name email');
    
    // Publish to RabbitMQ for real-time updates
    await MessageProducer.publishNotificationEvent('notification_marked_read', {
      notification: updatedNotification,
      userId: updatedNotification.user._id,
      markedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Notification marked as read',
      data: updatedNotification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// PATCH mark all user notifications as read
router.patch('/user/:userId/read-all', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );

    // Publish to RabbitMQ for real-time updates
    await MessageProducer.publishNotificationEvent('all_notifications_marked_read', {
      userId,
      count: result.modifiedCount,
      markedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: `${result.modifiedCount} notifications marked as read`
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
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid notification ID format' 
      });
    }

    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    await Notification.findByIdAndDelete(req.params.id);
    
    // Publish to RabbitMQ for real-time updates
    await MessageProducer.publishNotificationEvent('notification_deleted', {
      notificationId: req.params.id,
      userId: notification.user,
      deletedVia: 'http'
    });
    
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

// DELETE all read notifications for a user
router.delete('/user/:userId/read', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Notification.deleteMany({
      user: userId,
      read: true
    });

    // Publish to RabbitMQ for real-time updates
    await MessageProducer.publishNotificationEvent('read_notifications_cleared', {
      userId,
      count: result.deletedCount,
      clearedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: `${result.deletedCount} read notifications deleted`
    });
  } catch (error) {
    console.error('Error deleting read notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;