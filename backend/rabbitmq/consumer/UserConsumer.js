import { rabbitMQ, EXCHANGES, QUEUES } from '../config.js';

class UserConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare user exchange and queue
      await channel.assertExchange(EXCHANGES.USER, 'fanout', { durable: true });
      await channel.assertQueue(QUEUES.USER_EVENTS, { durable: true });
      await channel.bindQueue(QUEUES.USER_EVENTS, EXCHANGES.USER, '');
      
      this.initialized = true;
      console.log('✅ UserConsumer initialized');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from user events queue
    channel.consume(QUEUES.USER_EVENTS, (msg) => {
      this.handleMessage(msg);
    }, { noAck: false });

    console.log('👂 UserConsumer started listening for user messages');
  }

  handleMessage(msg) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received USER event:`, content.event);

      // Process the user message
      this.processMessage(content);

      // Acknowledge the message
      const channel = rabbitMQ.channel;
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing USER message:', error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  processMessage(content) {
    const { event, data, socketId } = content;
    this.handleUserEvent(event, data, socketId);
  }

  handleUserEvent(event, data, socketId) {
    switch (event) {
      case 'admin_online':
        // Notify all admins that a new admin came online
        this.io.to('admin-room').emit('admin-online', data.admin);
        // Send updated online admins list to all admins
        this.io.to('admin-room').emit('online-admins', data.onlineAdmins);
        break;
        
      case 'admin_message':
        // Broadcast admin message to all admins except sender
        if (socketId) {
          this.io.to('admin-room').except(socketId).emit('admin-message', data);
        } else {
          this.io.to('admin-room').emit('admin-message', data);
        }
        break;
        
      case 'user_registered':
        // Notify all admins about new user registration
        this.io.to('admin-room').emit('user-registered', data.user);
        break;
        
      case 'user_status_updated':
        // Notify admins about user status change
        this.io.to('admin-room').emit('user-status-updated', data.user);
        break;
        
      case 'user_updated':
        // Notify admins about user update (from HTTP or Socket)
        this.io.to('admin-room').emit('user-updated', data.user);
        break;
        
      case 'user_deleted':
        // Notify admins about user deletion (from HTTP or Socket)
        this.io.to('admin-room').emit('user-deleted', data.userId);
        break;
    }
  }
}

export default UserConsumer;