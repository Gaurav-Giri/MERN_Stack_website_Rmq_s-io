import { rabbitMQ, EXCHANGES } from './config.js';

class MessageProducer {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare all exchanges
      await channel.assertExchange(EXCHANGES.SCHOOL, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.USER, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.MEAL, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.NOTIFICATION, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.HEADER, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.FOOTER, 'fanout', {durable: true});

      
      this.initialized = true;
      console.log('✅ MessageProducer initialized');
    }
  }

  async publishToExchange(exchange, message) {
    try {
      const channel = await rabbitMQ.getChannel();
      const messageBuffer = Buffer.from(JSON.stringify({
        ...message,
        timestamp: new Date().toISOString(),
        socketId: message.socketId || null
      }));

      const published = channel.publish(exchange, '', messageBuffer, { persistent: true });
      
      if (published) {
        console.log(`📤 Message published to ${exchange}:`, message.event);
      } else {
        console.error(`❌ Failed to publish message to ${exchange}`);
      }
      
      return published;
    } catch (error) {
      console.error(`❌ Error publishing to ${exchange}:`, error);
      throw error;
    }
  }

  // Convenience methods for different domains
  async publishSchoolEvent(event, data, socketId = null) {
    return this.publishToExchange(EXCHANGES.SCHOOL, { event, data, socketId });
  }

  async publishUserEvent(event, data, socketId = null) {
    return this.publishToExchange(EXCHANGES.USER, { event, data, socketId });
  }

  async publishMealEvent(event, data, socketId = null) {
    return this.publishToExchange(EXCHANGES.MEAL, { event, data, socketId });
  }

  async publishNotificationEvent(event, data, socketId = null) {
    return this.publishToExchange(EXCHANGES.NOTIFICATION, { event, data, socketId });
  }

  async publishHeaderEvent(event, data, socketId = null){
    return this.publishToExchange(EXCHANGES.HEADER, { event, data, socketId});
  }

  async publishHeaderEvent(event, data, socketId = null){
    return this.publishToExchange(EXCHANGES.FOOTER, { event, data, socketId});
  }
}

export default new MessageProducer();