import { rabbitMQ, EXCHANGES, QUEUES } from '../config.js';

class MealConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare meal exchange and queue
      await channel.assertExchange(EXCHANGES.MEAL, 'fanout', { durable: true });
      await channel.assertQueue(QUEUES.MEAL_EVENTS, { durable: true });
      await channel.bindQueue(QUEUES.MEAL_EVENTS, EXCHANGES.MEAL, '');
      
      this.initialized = true;
      console.log('✅ MealConsumer initialized');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from meal events queue
    channel.consume(QUEUES.MEAL_EVENTS, (msg) => {
      this.handleMessage(msg);
    }, { noAck: false });

    console.log('👂 MealConsumer started listening for meal messages');
  }

  handleMessage(msg) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received MEAL event:`, content.event);

      // Process the meal message
      this.processMessage(content);

      // Acknowledge the message
      const channel = rabbitMQ.channel;
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing MEAL message:', error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  processMessage(content) {
    const { event, data, socketId } = content;
    this.handleMealEvent(event, data, socketId);
  }

  handleMealEvent(event, data, socketId) {
    switch (event) {
      case 'meal_created':
        // Notify all admins about new meal
        this.io.to('admin-room').emit('meal-created', data.meal);
        break;
        
      case 'meal_updated':
        // Notify admins and specific meal room
        this.io.to('admin-room').emit('meal-updated', data.meal);
        this.io.to(`meal-${data.meal._id}`).emit('meal-updated', data.meal);
        break;
        
      case 'meal_deleted':
        // Notify admins about meal deletion
        this.io.to('admin-room').emit('meal-deleted', data.mealId);
        this.io.to('admin-room').emit('meal-updated', data.meal);
        break;
        
      case 'meal_availability_toggled':
        // Notify about availability change
        this.io.to('admin-room').emit('meal-availability-toggled', data.meal);
        this.io.to('admin-room').emit('meal-updated', data.meal);
        break;
        
      case 'meals_bulk_updated':
        // Notify about bulk update
        this.io.to('admin-room').emit('meals-bulk-updated', data.meals);
        break;
    }
  }
}

export default MealConsumer;