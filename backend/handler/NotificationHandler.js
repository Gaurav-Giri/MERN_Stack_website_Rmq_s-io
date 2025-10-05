
// import Notification from '../models/Notification.js';

// class NotificationHandler {
//   // Send notification to user
//   static async sendNotification(io, { userId, message, type = 'system', relatedId = null, priority = 'medium' }) {
//     try {
//       const notification = new Notification({
//         user: userId,
//         message,
//         type,
//         relatedId,
//         priority,
//         read: false
//       });

//       await notification.save();
      
//       // Populate user data for notification
//       await notification.populate('user', 'name email');
      
//       const notificationData = {
//         _id: notification._id,
//         message: notification.message,
//         type: notification.type,
//         read: notification.read,
//         priority: notification.priority,
//         createdAt: notification.createdAt,
//         relatedId: notification.relatedId
//       };

//       // Emit to user's room
//       io.to(`user_${userId}`).emit('new-notification', notificationData);
      
//       console.log(`📢 Notification sent to user ${userId}: ${message}`);
      
//       return notification;
//     } catch (error) {
//       console.error('❌ Notification error:', error);
//       throw error;
//     }
//   }

//   // Send notifications to multiple users
//   static async sendBulkNotifications(io, { userIds, message, type, relatedId }) {
//     try {
//       const promises = userIds.map(userId => 
//         this.sendNotification(io, { userId, message, type, relatedId })
//       );
      
//       return await Promise.all(promises);
//     } catch (error) {
//       console.error('❌ Bulk notification error:', error);
//       throw error;
//     }
//   }

//   // Get user notifications
//   static async getUserNotifications(userId, page = 1, limit = 20) {
//     try {
//       const skip = (page - 1) * limit;

//       const notifications = await Notification.find({ user: userId })
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit);

//       const total = await Notification.countDocuments({ user: userId });
//       const unreadCount = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       return {
//         notifications,
//         pagination: {
//           current: page,
//           pages: Math.ceil(total / limit),
//           total,
//           unreadCount
//         }
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Mark notification as read
//   static async markAsRead(notificationId, userId) {
//     try {
//       const notification = await Notification.findOneAndUpdate(
//         { _id: notificationId, user: userId },
//         { read: true },
//         { new: true }
//       );

//       if (!notification) {
//         throw new Error('Notification not found');
//       }

//       return { notification };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Mark all notifications as read
//   static async markAllAsRead(userId) {
//     try {
//       await Notification.updateMany(
//         { user: userId, read: false },
//         { read: true }
//       );

//       const unreadCount = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       return { 
//         message: 'All notifications marked as read',
//         unreadCount 
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Delete notification
//   static async deleteNotification(notificationId, userId) {
//     try {
//       const result = await Notification.findOneAndDelete({ 
//         _id: notificationId, 
//         user: userId 
//       });

//       if (!result) {
//         throw new Error('Notification not found');
//       }

//       return { message: 'Notification deleted successfully' };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Get unread count
//   static async getUnreadCount(userId) {
//     try {
//       const count = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       return { unreadCount: count };
//     } catch (error) {
//       throw error;
//     }
//   }
// }



// export default NotificationHandler;





// ---------------------------------------------------------------




// import Notification from '../models/Notification.js';

// const NotificationHandler = (io, socket, connectedAdmins) => {
//   // Notification-related socket events

//   // Send notification to user
//   socket.on('send-notification', async (notificationData) => {
//     try {
//       const { userId, message, type = 'system', relatedId = null, priority = 'medium' } = notificationData;
      
//       const notification = new Notification({
//         user: userId,
//         message,
//         type,
//         relatedId,
//         priority,
//         read: false
//       });

//       await notification.save();
      
//       // Populate user data for notification
//       await notification.populate('user', 'name email');
      
//       const notificationPayload = {
//         _id: notification._id,
//         message: notification.message,
//         type: notification.type,
//         read: notification.read,
//         priority: notification.priority,
//         createdAt: notification.createdAt,
//         relatedId: notification.relatedId
//       };

//       // Emit to user's room
//       io.to(`user_${userId}`).emit('new-notification', notificationPayload);
      
//       console.log(`📢 Notification sent to user ${userId}: ${message}`);
      
//       // Send success response to the sender
//       socket.emit('notification-sent-success', notificationPayload);
//     } catch (error) {
//       console.error('❌ Notification error:', error);
//       socket.emit('notification-send-error', { message: error.message });
//     }
//   });

//   // Send notifications to multiple users
//   socket.on('send-bulk-notifications', async (bulkData) => {
//     try {
//       const { userIds, message, type, relatedId } = bulkData;
      
//       const promises = userIds.map(userId => {
//         const notification = new Notification({
//           user: userId,
//           message,
//           type,
//           relatedId,
//           priority: 'medium',
//           read: false
//         });
//         return notification.save();
//       });
      
//       const notifications = await Promise.all(promises);
      
//       // Emit to each user's room
//       notifications.forEach((notification, index) => {
//         const notificationPayload = {
//           _id: notification._id,
//           message: notification.message,
//           type: notification.type,
//           read: notification.read,
//           priority: notification.priority,
//           createdAt: notification.createdAt,
//           relatedId: notification.relatedId
//         };
        
//         io.to(`user_${userIds[index]}`).emit('new-notification', notificationPayload);
//       });
      
//       console.log(`📢 Bulk notifications sent to ${userIds.length} users: ${message}`);
      
//       // Send success response to the sender
//       socket.emit('bulk-notifications-sent-success', { count: notifications.length });
//     } catch (error) {
//       console.error('❌ Bulk notification error:', error);
//       socket.emit('bulk-notifications-error', { message: error.message });
//     }
//   });

//   // Get user notifications
//   socket.on('get-user-notifications', async ({ userId, page = 1, limit = 20 }) => {
//     try {
//       const skip = (page - 1) * limit;

//       const notifications = await Notification.find({ user: userId })
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit);

//       const total = await Notification.countDocuments({ user: userId });
//       const unreadCount = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       const response = {
//         notifications,
//         pagination: {
//           current: page,
//           pages: Math.ceil(total / limit),
//           total,
//           unreadCount
//         }
//       };

//       socket.emit('user-notifications-retrieved', response);
//     } catch (error) {
//       console.error('❌ Get notifications error:', error);
//       socket.emit('get-notifications-error', { message: error.message });
//     }
//   });

//   // Mark notification as read
//   socket.on('mark-notification-read', async ({ notificationId, userId }) => {
//     try {
//       const notification = await Notification.findOneAndUpdate(
//         { _id: notificationId, user: userId },
//         { read: true },
//         { new: true }
//       );

//       if (!notification) {
//         throw new Error('Notification not found');
//       }

//       socket.emit('notification-marked-read', { notification });
//     } catch (error) {
//       console.error('❌ Mark as read error:', error);
//       socket.emit('mark-read-error', { message: error.message });
//     }
//   });

//   // Mark all notifications as read
//   socket.on('mark-all-notifications-read', async (userId) => {
//     try {
//       await Notification.updateMany(
//         { user: userId, read: false },
//         { read: true }
//       );

//       const unreadCount = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       socket.emit('all-notifications-marked-read', { 
//         message: 'All notifications marked as read',
//         unreadCount 
//       });
//     } catch (error) {
//       console.error('❌ Mark all as read error:', error);
//       socket.emit('mark-all-read-error', { message: error.message });
//     }
//   });

//   // Delete notification
//   socket.on('delete-notification', async ({ notificationId, userId }) => {
//     try {
//       const result = await Notification.findOneAndDelete({ 
//         _id: notificationId, 
//         user: userId 
//       });

//       if (!result) {
//         throw new Error('Notification not found');
//       }

//       socket.emit('notification-deleted', { message: 'Notification deleted successfully' });
//     } catch (error) {
//       console.error('❌ Delete notification error:', error);
//       socket.emit('delete-notification-error', { message: error.message });
//     }
//   });

//   // Get unread count
//   socket.on('get-unread-count', async (userId) => {
//     try {
//       const count = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       socket.emit('unread-count-retrieved', { unreadCount: count });
//     } catch (error) {
//       console.error('❌ Get unread count error:', error);
//       socket.emit('get-unread-count-error', { message: error.message });
//     }
//   });

//   // Add more notification-related events as needed
// };

// export default NotificationHandler;




// import Notification from '../models/Notification.js';

// const NotificationHandler = (io, socket, connectedAdmins) => {
//   // Notification-related socket events

//   // Join admin room when admin connects
//   socket.on('join-admin-room', (adminData) => {
//     try {
//       if (adminData.isAdmin) {
//         socket.join('admin-room');
//         connectedAdmins.set(socket.id, {
//           id: socket.id,
//           userId: adminData.userId,
//           name: adminData.name,
//           email: adminData.email,
//           joinedAt: new Date()
//         });
        
//         console.log(`👨‍💼 Admin ${adminData.name} joined admin room`);
//         socket.to('admin-room').emit('admin-joined', {
//           id: socket.id,
//           name: adminData.name,
//           onlineAdmins: Array.from(connectedAdmins.values())
//         });
//       }
//     } catch (error) {
//       console.error('❌ Join admin room error:', error);
//     }
//   });

//   // Send notification to user (admin functionality)
//   socket.on('send-notification', async (notificationData) => {
//     try {
//       // Verify sender is admin
//       const admin = connectedAdmins.get(socket.id);
//       if (!admin) {
//         return socket.emit('notification-send-error', { 
//           message: 'Access denied. Admin privileges required.' 
//         });
//       }

//       const { userId, message, type = 'system', relatedId = null, priority = 'medium' } = notificationData;
      
//       const notification = new Notification({
//         user: userId,
//         message,
//         type,
//         relatedId,
//         priority,
//         read: false
//       });

//       await notification.save();
      
//       // Populate user data for notification
//       await notification.populate('user', 'name email');
      
//       const notificationPayload = {
//         _id: notification._id,
//         message: notification.message,
//         type: notification.type,
//         read: notification.read,
//         priority: notification.priority,
//         createdAt: notification.createdAt,
//         relatedId: notification.relatedId,
//         sentBy: {
//           adminId: admin.userId,
//           adminName: admin.name
//         }
//       };

//       // Emit to user's room
//       io.to(`user_${userId}`).emit('new-notification', notificationPayload);
      
//       // Also notify admins in admin room
//       socket.to('admin-room').emit('notification-sent', {
//         notification: notificationPayload,
//         sentBy: admin.name,
//         timestamp: new Date()
//       });
      
//       console.log(`📢 Admin ${admin.name} sent notification to user ${userId}: ${message}`);
      
//       // Send success response to the admin sender
//       socket.emit('notification-sent-success', notificationPayload);
//     } catch (error) {
//       console.error('❌ Notification error:', error);
//       socket.emit('notification-send-error', { message: error.message });
//     }
//   });

//   // Send notifications to multiple users (admin bulk send)
//   socket.on('send-bulk-notifications', async (bulkData) => {
//     try {
//       // Verify sender is admin
//       const admin = connectedAdmins.get(socket.id);
//       if (!admin) {
//         return socket.emit('bulk-notifications-error', { 
//           message: 'Access denied. Admin privileges required.' 
//         });
//       }

//       const { userIds, message, type, relatedId } = bulkData;
      
//       const promises = userIds.map(userId => {
//         const notification = new Notification({
//           user: userId,
//           message,
//           type,
//           relatedId,
//           priority: 'medium',
//           read: false
//         });
//         return notification.save();
//       });
      
//       const notifications = await Promise.all(promises);
      
//       // Emit to each user's room and track results
//       const results = [];
//       notifications.forEach((notification, index) => {
//         const notificationPayload = {
//           _id: notification._id,
//           message: notification.message,
//           type: notification.type,
//           read: notification.read,
//           priority: notification.priority,
//           createdAt: notification.createdAt,
//           relatedId: notification.relatedId,
//           sentBy: {
//             adminId: admin.userId,
//             adminName: admin.name
//           }
//         };
        
//         io.to(`user_${userIds[index]}`).emit('new-notification', notificationPayload);
//         results.push({
//           userId: userIds[index],
//           success: true,
//           notificationId: notification._id
//         });
//       });
      
//       // Notify admins about bulk send
//       socket.to('admin-room').emit('bulk-notifications-sent', {
//         count: notifications.length,
//         sentBy: admin.name,
//         message: message.substring(0, 50) + '...', // Truncate long messages
//         timestamp: new Date()
//       });
      
//       console.log(`📢 Admin ${admin.name} sent bulk notifications to ${userIds.length} users`);
      
//       // Send detailed results to the admin sender
//       socket.emit('bulk-notifications-sent-success', { 
//         count: notifications.length,
//         results 
//       });
//     } catch (error) {
//       console.error('❌ Bulk notification error:', error);
//       socket.emit('bulk-notifications-error', { message: error.message });
//     }
//   });

//   // Admin: Get notifications for a specific user
//   socket.on('admin-get-user-notifications', async ({ userId, page = 1, limit = 20 }) => {
//     try {
//       // Verify requester is admin
//       const admin = connectedAdmins.get(socket.id);
//       if (!admin) {
//         return socket.emit('get-notifications-error', { 
//           message: 'Access denied. Admin privileges required.' 
//         });
//       }

//       const skip = (page - 1) * limit;

//       const notifications = await Notification.find({ user: userId })
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .populate('user', 'name email');

//       const total = await Notification.countDocuments({ user: userId });
//       const unreadCount = await Notification.countDocuments({ 
//         user: userId, 
//         read: false 
//       });

//       const response = {
//         notifications,
//         pagination: {
//           current: page,
//           pages: Math.ceil(total / limit),
//           total,
//           unreadCount
//         },
//         requestedBy: admin.name
//       };

//       socket.emit('admin-user-notifications-retrieved', response);
//     } catch (error) {
//       console.error('❌ Admin get notifications error:', error);
//       socket.emit('get-notifications-error', { message: error.message });
//     }
//   });

//   // Admin: Mark notification as read for a user
//   socket.on('admin-mark-notification-read', async ({ notificationId, userId }) => {
//     try {
//       // Verify requester is admin
//       const admin = connectedAdmins.get(socket.id);
//       if (!admin) {
//         return socket.emit('mark-read-error', { 
//           message: 'Access denied. Admin privileges required.' 
//         });
//       }

//       const notification = await Notification.findOneAndUpdate(
//         { _id: notificationId, user: userId },
//         { read: true },
//         { new: true }
//       );

//       if (!notification) {
//         throw new Error('Notification not found');
//       }

//       // Notify the user
//       io.to(`user_${userId}`).emit('notification-marked-read', { notification });

//       socket.emit('admin-notification-marked-read', { 
//         notification,
//         markedBy: admin.name 
//       });
//     } catch (error) {
//       console.error('❌ Admin mark as read error:', error);
//       socket.emit('mark-read-error', { message: error.message });
//     }
//   });

//   // Admin: Delete notification for a user
//   socket.on('admin-delete-notification', async ({ notificationId, userId }) => {
//     try {
//       // Verify requester is admin
//       const admin = connectedAdmins.get(socket.id);
//       if (!admin) {
//         return socket.emit('delete-notification-error', { 
//           message: 'Access denied. Admin privileges required.' 
//         });
//       }

//       const result = await Notification.findOneAndDelete({ 
//         _id: notificationId, 
//         user: userId 
//       });

//       if (!result) {
//         throw new Error('Notification not found');
//       }

//       // Notify the user
//       io.to(`user_${userId}`).emit('notification-deleted', { 
//         notificationId,
//         message: 'Notification deleted by admin' 
//       });

//       socket.emit('admin-notification-deleted', { 
//         message: 'Notification deleted successfully',
//         deletedBy: admin.name 
//       });
//     } catch (error) {
//       console.error('❌ Admin delete notification error:', error);
//       socket.emit('delete-notification-error', { message: error.message });
//     }
//   });

//   // Admin: Get notification statistics
//   socket.on('admin-get-notification-stats', async () => {
//     try {
//       // Verify requester is admin
//       const admin = connectedAdmins.get(socket.id);
//       if (!admin) {
//         return socket.emit('notification-stats-error', { 
//           message: 'Access denied. Admin privileges required.' 
//         });
//       }

//       const totalNotifications = await Notification.countDocuments();
//       const unreadCount = await Notification.countDocuments({ read: false });
      
//       const notificationsByType = await Notification.aggregate([
//         { $group: { _id: '$type', count: { $sum: 1 } } }
//       ]);
      
//       const notificationsByPriority = await Notification.aggregate([
//         { $group: { _id: '$priority', count: { $sum: 1 } } }
//       ]);

//       const recentNotifications = await Notification.find()
//         .sort({ createdAt: -1 })
//         .limit(10)
//         .populate('user', 'name email');

//       const stats = {
//         totalNotifications,
//         unreadCount,
//         readCount: totalNotifications - unreadCount,
//         notificationsByType,
//         notificationsByPriority,
//         recentNotifications,
//         generatedBy: admin.name,
//         generatedAt: new Date()
//       };

//       socket.emit('admin-notification-stats-retrieved', stats);
//     } catch (error) {
//       console.error('❌ Admin notification stats error:', error);
//       socket.emit('notification-stats-error', { message: error.message });
//     }
//   });

//   // Admin: Get online admins
//   socket.on('get-online-admins', () => {
//     try {
//       const onlineAdmins = Array.from(connectedAdmins.values());
//       socket.emit('online-admins-list', {
//         onlineAdmins,
//         total: onlineAdmins.length,
//         timestamp: new Date()
//       });
//     } catch (error) {
//       console.error('❌ Get online admins error:', error);
//       socket.emit('online-admins-error', { message: error.message });
//     }
//   });

//   // Handle admin disconnection
//   socket.on('disconnect', () => {
//     if (connectedAdmins.has(socket.id)) {
//       const admin = connectedAdmins.get(socket.id);
//       connectedAdmins.delete(socket.id);
      
//       socket.to('admin-room').emit('admin-left', {
//         id: socket.id,
//         name: admin.name,
//         onlineAdmins: Array.from(connectedAdmins.values())
//       });
      
//       console.log(`👨‍💼 Admin ${admin.name} left admin room`);
//     }
//   });

//   // Error handling
//   socket.on('error', (error) => {
//     console.error('Notification handler socket error:', error);
//   });
// };

// export default NotificationHandler;









// Handler/NotificationHandler.js
import Notification from '../models/Notification.js';

const NotificationHandler = (socket, messageProducer, connectedAdmins) => {
  // Notification-related socket events
  
  // Handle joining admin room
  socket.on('join-admin-room', async (adminData) => {
    try {
      if (adminData.isAdmin) {
        socket.join('admin-room');
        connectedAdmins.set(socket.id, {
          id: socket.id,
          userId: adminData.userId,
          name: adminData.name,
          email: adminData.email,
          joinedAt: new Date()
        });
        
        // Publish to RabbitMQ
        await messageProducer.publishNotificationEvent('admin_joined_room', {
          id: socket.id,
          name: adminData.name,
          onlineAdmins: Array.from(connectedAdmins.values())
        }, socket.id);
        
        // Send success response directly to sender
        socket.emit('admin-room-joined-success', {
          message: 'Successfully joined admin room',
          onlineAdmins: Array.from(connectedAdmins.values())
        });
      }
    } catch (error) {
      console.error('Error joining admin room:', error);
      socket.emit('admin-room-join-error', { message: error.message });
    }
  });

  // Handle sending notification to user
  socket.on('send-notification', async (notificationData) => {
    try {
      // Verify sender is admin
      const admin = connectedAdmins.get(socket.id);
      if (!admin) {
        return socket.emit('notification-send-error', { 
          message: 'Access denied. Admin privileges required.' 
        });
      }

      const { userId, message, type = 'system', relatedId = null, priority = 'medium' } = notificationData;
      
      const notification = new Notification({
        user: userId,
        message,
        type,
        relatedId,
        priority,
        read: false
      });

      await notification.save();
      await notification.populate('user', 'name email');
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishNotificationEvent('notification_sent_to_user', {
        notification: notification,
        userId: userId,
        sentBy: admin.name
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('notification-sent-success', notification);
    } catch (error) {
      console.error('Error sending notification:', error);
      socket.emit('notification-send-error', { message: error.message });
    }
  });

  // Handle sending bulk notifications
  socket.on('send-bulk-notifications', async (bulkData) => {
    try {
      // Verify sender is admin
      const admin = connectedAdmins.get(socket.id);
      if (!admin) {
        return socket.emit('bulk-notifications-error', { 
          message: 'Access denied. Admin privileges required.' 
        });
      }

      const { userIds, message, type, relatedId } = bulkData;
      
      const notifications = await Promise.all(
        userIds.map(userId => 
          new Notification({
            user: userId,
            message,
            type: type || 'system',
            relatedId: relatedId || null,
            priority: 'medium',
            read: false
          }).save()
        )
      );
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishNotificationEvent('bulk_notifications_sent', {
        userIds,
        notification: {
          message,
          type: type || 'system',
          relatedId: relatedId || null
        },
        sentBy: admin.name,
        count: notifications.length
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('bulk-notifications-sent-success', { 
        count: notifications.length,
        notifications 
      });
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      socket.emit('bulk-notifications-error', { message: error.message });
    }
  });

  // Handle marking notification as read
  socket.on('mark-notification-read', async (notificationId) => {
    try {
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
      ).populate('user', 'name email');

      if (!notification) {
        return socket.emit('mark-read-error', { message: 'Notification not found' });
      }
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishNotificationEvent('notification_marked_read', {
        notification: notification,
        userId: notification.user._id,
        markedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('notification-marked-read-success', notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      socket.emit('mark-read-error', { message: error.message });
    }
  });

  // Handle marking all notifications as read for user
  socket.on('mark-all-notifications-read', async (userId) => {
    try {
      const result = await Notification.updateMany(
        { user: userId, read: false },
        { read: true }
      );
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishNotificationEvent('all_notifications_marked_read', {
        userId,
        count: result.modifiedCount,
        markedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('all-notifications-marked-read-success', {
        userId,
        count: result.modifiedCount
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      socket.emit('mark-all-read-error', { message: error.message });
    }
  });

  // Handle deleting notification
  socket.on('delete-notification', async (notificationId) => {
    try {
      const notification = await Notification.findById(notificationId);
      
      if (!notification) {
        return socket.emit('delete-notification-error', { message: 'Notification not found' });
      }

      await Notification.findByIdAndDelete(notificationId);
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishNotificationEvent('notification_deleted', {
        notificationId: notificationId,
        userId: notification.user,
        deletedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('notification-deleted-success', { notificationId });
    } catch (error) {
      console.error('Error deleting notification:', error);
      socket.emit('delete-notification-error', { message: error.message });
    }
  });

  // Handle getting user notifications
  socket.on('get-user-notifications', async (userData) => {
    try {
      const { userId, page = 1, limit = 20 } = userData;
      
      const skip = (page - 1) * limit;

      const [notifications, total, unreadCount] = await Promise.all([
        Notification.find({ user: userId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('user', 'name email'),
        Notification.countDocuments({ user: userId }),
        Notification.countDocuments({ user: userId, read: false })
      ]);

      // Direct emit for user notifications (no need for RabbitMQ)
      socket.emit('user-notifications-retrieved', {
        notifications,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          unreadCount
        }
      });
    } catch (error) {
      console.error('Error getting user notifications:', error);
      socket.emit('get-notifications-error', { message: error.message });
    }
  });

  // Handle getting notification statistics (admin only)
  socket.on('get-notification-stats', async () => {
    try {
      // Verify requester is admin
      const admin = connectedAdmins.get(socket.id);
      if (!admin) {
        return socket.emit('notification-stats-error', { 
          message: 'Access denied. Admin privileges required.' 
        });
      }

      const totalNotifications = await Notification.countDocuments();
      const unreadCount = await Notification.countDocuments({ read: false });
      
      const notificationsByType = await Notification.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]);
      
      const notificationsByPriority = await Notification.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ]);

      const recentNotifications = await Notification.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('user', 'name email');

      // Direct emit for stats (no need for RabbitMQ)
      socket.emit('notification-stats-retrieved', {
        totalNotifications,
        unreadCount,
        readCount: totalNotifications - unreadCount,
        notificationsByType,
        notificationsByPriority,
        recentNotifications
      });
    } catch (error) {
      console.error('Error getting notification stats:', error);
      socket.emit('notification-stats-error', { message: error.message });
    }
  });

  // Handle real-time notification search for admins
  socket.on('search-notifications', async (searchTerm) => {
    try {
      // Verify requester is admin
      const admin = connectedAdmins.get(socket.id);
      if (!admin) {
        return socket.emit('notifications-search-error', { 
          message: 'Access denied. Admin privileges required.' 
        });
      }

      let notifications;
      
      if (!searchTerm || searchTerm.trim() === '') {
        notifications = await Notification.find()
          .sort({ createdAt: -1 })
          .limit(50)
          .populate('user', 'name email');
      } else {
        notifications = await Notification.find({
          $or: [
            { message: { $regex: searchTerm, $options: 'i' } },
            { type: { $regex: searchTerm, $options: 'i' } }
          ]
        })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('user', 'name email');
      }
      
      // Direct emit for search results (no need for RabbitMQ)
      socket.emit('notifications-search-results', notifications);
    } catch (error) {
      console.error('Error searching notifications:', error);
      socket.emit('notifications-search-error', { message: error.message });
    }
  });

  // Handle getting online admins
  socket.on('get-online-admins', () => {
    try {
      const onlineAdmins = Array.from(connectedAdmins.values());
      
      // Direct emit for online admins (no need for RabbitMQ)
      socket.emit('online-admins-list', {
        onlineAdmins,
        total: onlineAdmins.length,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error getting online admins:', error);
      socket.emit('online-admins-error', { message: error.message });
    }
  });

  // Join user room for real-time notifications
  socket.on('join-user-room', (userId) => {
    socket.join(`user_${userId}`);
  });

  // Leave user room
  socket.on('leave-user-room', (userId) => {
    socket.leave(`user_${userId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (connectedAdmins.has(socket.id)) {
      const admin = connectedAdmins.get(socket.id);
      connectedAdmins.delete(socket.id);
      
      // Publish to RabbitMQ for admin leaving
      messageProducer.publishNotificationEvent('admin_left_room', {
        id: socket.id,
        name: admin.name,
        onlineAdmins: Array.from(connectedAdmins.values())
      }, socket.id).catch(console.error);
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Notification handler socket error:', error);
  });
};

export default NotificationHandler;