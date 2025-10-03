import { rabbitMQ, EXCHANGES, QUEUES } from '../config.js';

class SchoolConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare school exchange and queue
      await channel.assertExchange(EXCHANGES.SCHOOL, 'fanout', { durable: true });
      await channel.assertQueue(QUEUES.SCHOOL_EVENTS, { durable: true });
      await channel.bindQueue(QUEUES.SCHOOL_EVENTS, EXCHANGES.SCHOOL, '');
      
      this.initialized = true;
      console.log('✅ SchoolConsumer initialized');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from school events queue
    channel.consume(QUEUES.SCHOOL_EVENTS, (msg) => {
      this.handleMessage(msg);
    }, { noAck: false });

    console.log('👂 SchoolConsumer started listening for school messages');
  }

  handleMessage(msg) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received SCHOOL event:`, content.event);

      // Process the school message
      this.processMessage(content);

      // Acknowledge the message
      const channel = rabbitMQ.channel;
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing SCHOOL message:', error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  processMessage(content) {
    const { event, data, socketId } = content;
    this.handleSchoolEvent(event, data, socketId);
  }

  handleSchoolEvent(event, data, socketId) {
    switch (event) {
      case 'school_created':
        // Notify all admins about new school
        this.io.to('admin-room').emit('school-created', data.school);
        break;
        
      case 'school_updated':
        // Notify admins and specific school room
        this.io.to('admin-room').emit('school-updated', data.school);
        this.io.to(`school-${data.school._id}`).emit('school-updated', data.school);
        break;
        
      case 'school_deleted':
        // Notify admins about school deletion
        this.io.to('admin-room').emit('school-deleted', data.schoolId);
        break;
        
      case 'meal_added_to_school':
        // Notify about meal addition
        this.io.to('admin-room').emit('school-meals-updated', data.school);
        if (socketId) {
            this.io.to(socketId).emit('meal-added-to-school', data.school);
        }
        break;
        
      case 'meal_removed_from_school':
        // Notify about meal removal
        this.io.to('admin-room').emit('school-meals-updated', data.school);
        if (socketId) {
            this.io.to(socketId).emit('meal-removed-from-school', data.school);
        }
        break;
    }
  }
}

export default SchoolConsumer;