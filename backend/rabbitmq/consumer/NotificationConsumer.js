// Rabbitmq/notificationConsumer.js
import { rabbitMQ, EXCHANGES, QUEUES } from '../config.js';

class NotificationConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare notification exchange and queue
      await channel.assertExchange(EXCHANGES.NOTIFICATION, 'fanout', { durable: true });
      await channel.assertQueue(QUEUES.NOTIFICATION_EVENTS, { durable: true });
      await channel.bindQueue(QUEUES.NOTIFICATION_EVENTS, EXCHANGES.NOTIFICATION, '');
      
      this.initialized = true;
      console.log('✅ NotificationConsumer initialized');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from notification events queue
    channel.consume(QUEUES.NOTIFICATION_EVENTS, (msg) => {
      this.handleMessage(msg);
    }, { noAck: false });

    console.log('👂 NotificationConsumer started listening for notification messages');
  }

  handleMessage(msg) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received NOTIFICATION event:`, content.event);

      // Process the notification message
      this.processMessage(content);

      // Acknowledge the message
      const channel = rabbitMQ.channel;
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing NOTIFICATION message:', error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  processMessage(content) {
    const { event, data, socketId } = content;
    this.handleNotificationEvent(event, data, socketId);
  }

  handleNotificationEvent(event, data, socketId) {
    switch (event) {
      case 'notification_created':
        // Notify specific user about new notification
        this.io.to(`user_${data.notification.user}`).emit('new-notification', data.notification);
        break;
        
      case 'notification_sent_to_user':
        // Notify user and admins about sent notification
        this.io.to(`user_${data.userId}`).emit('new-notification', data.notification);
        this.io.to('admin-room').emit('notification-sent', {
          notification: data.notification,
          sentBy: data.sentBy,
          timestamp: new Date()
        });
        break;
        
      case 'bulk_notifications_sent':
        // Notify multiple users and admins about bulk send
        data.userIds.forEach(userId => {
          this.io.to(`user_${userId}`).emit('new-notification', {
            ...data.notification,
            userId: userId
          });
        });
        this.io.to('admin-room').emit('bulk-notifications-sent', {
          count: data.userIds.length,
          sentBy: data.sentBy,
          message: data.message,
          timestamp: new Date()
        });
        break;
        
      case 'notification_marked_read':
        // Notify about read status change
        this.io.to(`user_${data.userId}`).emit('notification-marked-read', { 
          notification: data.notification 
        });
        this.io.to('admin-room').emit('notification-read-status-changed', {
          notificationId: data.notification._id,
          userId: data.userId,
          markedBy: data.markedBy,
          timestamp: new Date()
        });
        break;
        
      case 'notification_deleted':
        // Notify about deletion
        this.io.to(`user_${data.userId}`).emit('notification-deleted', { 
          notificationId: data.notificationId,
          message: data.message 
        });
        this.io.to('admin-room').emit('notification-deleted', {
          notificationId: data.notificationId,
          userId: data.userId,
          deletedBy: data.deletedBy,
          timestamp: new Date()
        });
        break;
        
      case 'admin_joined_room':
        // Notify other admins when admin joins
        this.io.to('admin-room').emit('admin-joined', {
          id: data.id,
          name: data.name,
          onlineAdmins: data.onlineAdmins
        });
        break;
        
      case 'admin_left_room':
        // Notify other admins when admin leaves
        this.io.to('admin-room').emit('admin-left', {
          id: data.id,
          name: data.name,
          onlineAdmins: data.onlineAdmins
        });
        break;
        
      case 'notification_stats_requested':
        // Handle notification statistics request
        this.io.to('admin-room').emit('notification-stats-requested', {
          requestedBy: data.requestedBy,
          timestamp: new Date()
        });
        break;

      case 'user_notifications_requested':
        // Handle user notifications request (admin)
        this.io.to(`user_${data.userId}`).emit('notifications-requested-by-admin', {
          requestedBy: data.adminName,
          timestamp: new Date()
        });
        break;

      case 'real_time_notification_broadcast':
        // Handle real-time broadcast to multiple users
        data.targetUsers.forEach(userId => {
          this.io.to(`user_${userId}`).emit('broadcast-notification', data.notification);
        });
        break;

      case 'notification_priority_updated':
        // Handle priority updates
        this.io.to(`user_${data.userId}`).emit('notification-priority-updated', {
          notificationId: data.notificationId,
          newPriority: data.newPriority
        });
        this.io.to('admin-room').emit('notification-priority-changed', {
          notificationId: data.notificationId,
          userId: data.userId,
          oldPriority: data.oldPriority,
          newPriority: data.newPriority,
          changedBy: data.changedBy
        });
        break;
    }
  }
}

export default NotificationConsumer;