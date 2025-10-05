// Rabbitmq/FooterConsumer.js
import { rabbitMQ, EXCHANGES, QUEUES } from '../../config.js';

class FooterConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare content exchange and queue for footer events
      await channel.assertExchange(EXCHANGES.CONTENT, 'fanout', { durable: true });
      await channel.assertQueue(QUEUES.CONTENT_EVENTS, { durable: true });
      await channel.bindQueue(QUEUES.CONTENT_EVENTS, EXCHANGES.CONTENT, '');
      
      this.initialized = true;
      console.log('✅ FooterConsumer initialized');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from content events queue
    channel.consume(QUEUES.CONTENT_EVENTS, (msg) => {
      this.handleMessage(msg);
    }, { noAck: false });

    console.log('👂 FooterConsumer started listening for footer messages');
  }

  handleMessage(msg) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received FOOTER event:`, content.event);

      // Process the footer message
      this.processMessage(content);

      // Acknowledge the message
      const channel = rabbitMQ.channel;
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing FOOTER message:', error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  processMessage(content) {
    const { event, data, socketId } = content;
    this.handleFooterEvent(event, data, socketId);
  }

  handleFooterEvent(event, data, socketId) {
    switch (event) {
      case 'footer_content_created':
        // Notify all connected clients in footer room
        this.io.to('footer-global').emit('footer-content-created', data.footer);
        break;
        
      case 'footer_content_updated':
        // Notify all clients about footer update
        this.io.to('footer-global').emit('footer-content-updated', data.footer);
        break;
        
      case 'footer_section_added':
        // Notify about new section addition
        this.io.to('footer-global').emit('footer-section-added', {
          footer: data.footer,
          section: data.section
        });
        break;
        
      case 'footer_section_updated':
        // Notify about section update
        this.io.to('footer-global').emit('footer-section-updated', {
          footer: data.footer,
          sectionId: data.sectionId
        });
        break;
        
      case 'footer_section_removed':
        // Notify about section removal
        this.io.to('footer-global').emit('footer-section-removed', {
          footer: data.footer,
          sectionId: data.sectionId
        });
        break;
        
      case 'footer_social_links_updated':
        // Notify about social links update
        this.io.to('footer-global').emit('footer-social-links-updated', data.footer);
        break;
        
      case 'footer_theme_settings_updated':
        // Notify about theme settings update
        this.io.to('footer-global').emit('footer-theme-settings-updated', data.footer);
        break;
        
      case 'footer_sections_reordered':
        // Notify about sections reordering
        this.io.to('footer-global').emit('footer-sections-reordered', data.footer);
        break;
        
      case 'footer_section_status_toggled':
        // Notify about section status toggle
        this.io.to('footer-global').emit('footer-section-status-toggled', {
          footer: data.footer,
          sectionId: data.sectionId
        });
        break;
        
      default:
        console.log(`⚠️ Unhandled footer event: ${event}`);
    }
  }
}

export default FooterConsumer;