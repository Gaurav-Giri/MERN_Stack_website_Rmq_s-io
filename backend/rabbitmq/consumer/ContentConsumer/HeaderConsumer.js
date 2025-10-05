// consumers/HeaderConsumer.js

import { rabbitMQ, EXCHANGES, QUEUES } from '../../config.js';

class HeaderConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare content exchange and queue for header
      await channel.assertExchange(EXCHANGES.CONTENT, 'fanout', { durable: true });
      await channel.assertQueue(QUEUES.CONTENT_EVENTS, { durable: true });
      await channel.bindQueue(QUEUES.CONTENT_EVENTS, EXCHANGES.CONTENT, '');
      
      this.initialized = true;
      console.log('✅ HeaderConsumer initialized');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from content events queue
    channel.consume(QUEUES.CONTENT_EVENTS, (msg) => {
      this.handleMessage(msg);
    }, { noAck: false });

    console.log('👂 HeaderConsumer started listening for header messages');
  }

  handleMessage(msg) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received HEADER event:`, content.event);

      // Check if this is a header-related event
      if (this.isHeaderEvent(content.event)) {
        // Process the header message
        this.processMessage(content);

        // Acknowledge the message
        const channel = rabbitMQ.channel;
        channel.ack(msg);
      } else {
        // Not a header event, reject but requeue for other consumers
        const channel = rabbitMQ.channel;
        channel.nack(msg, false, true);
      }
    } catch (error) {
      console.error('❌ Error processing HEADER message:', error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  isHeaderEvent(event) {
    const headerEvents = [
      'header_content_created',
      'header_content_updated',
      'header_link_added',
      'header_link_updated',
      'header_link_removed',
      'header_logo_updated',
      'header_auth_settings_updated',
      'header_theme_settings_updated',
      'header_notification_settings_updated',
      'header_mobile_settings_updated',
      'header_links_reordered',
      'header_link_status_toggled',
      'header_dashboard_settings_updated'
    ];
    return headerEvents.includes(event);
  }

  processMessage(content) {
    const { event, data, socketId } = content;
    this.handleHeaderEvent(event, data, socketId);
  }

  handleHeaderEvent(event, data, socketId) {
    switch (event) {
      case 'header_content_created':
        // Notify all connected clients about new header content
        this.io.to('header-global').emit('header-content-created', data.header);
        this.io.to('admin-room').emit('header-content-created', data.header);
        break;
        
      case 'header_content_updated':
        // Notify all clients about header update
        this.io.to('header-global').emit('header-content-updated', data.header);
        this.io.to('admin-room').emit('header-content-updated', data.header);
        break;
        
      case 'header_link_added':
        // Notify about new navigation link
        this.io.to('header-global').emit('header-link-added', {
          header: data.header,
          link: data.link
        });
        this.io.to('admin-room').emit('header-link-added', {
          header: data.header,
          link: data.link
        });
        break;
        
      case 'header_link_updated':
        // Notify about link update
        this.io.to('header-global').emit('header-link-updated', {
          header: data.header,
          linkId: data.linkId
        });
        this.io.to('admin-room').emit('header-link-updated', {
          header: data.header,
          linkId: data.linkId
        });
        break;
        
      case 'header_link_removed':
        // Notify about link removal
        this.io.to('header-global').emit('header-link-removed', {
          header: data.header,
          linkId: data.linkId
        });
        this.io.to('admin-room').emit('header-link-removed', {
          header: data.header,
          linkId: data.linkId
        });
        break;
        
      case 'header_logo_updated':
        // Notify about logo update
        this.io.to('header-global').emit('header-logo-updated', data.header);
        this.io.to('admin-room').emit('header-logo-updated', data.header);
        break;
        
      case 'header_auth_settings_updated':
        // Notify about auth settings update
        this.io.to('header-global').emit('header-auth-settings-updated', data.header);
        this.io.to('admin-room').emit('header-auth-settings-updated', data.header);
        break;
        
      case 'header_theme_settings_updated':
        // Notify about theme settings update
        this.io.to('header-global').emit('header-theme-settings-updated', data.header);
        this.io.to('admin-room').emit('header-theme-settings-updated', data.header);
        break;
        
      case 'header_notification_settings_updated':
        // Notify about notification settings update
        this.io.to('header-global').emit('header-notification-settings-updated', data.header);
        this.io.to('admin-room').emit('header-notification-settings-updated', data.header);
        break;
        
      case 'header_mobile_settings_updated':
        // Notify about mobile settings update
        this.io.to('header-global').emit('header-mobile-settings-updated', data.header);
        this.io.to('admin-room').emit('header-mobile-settings-updated', data.header);
        break;
        
      case 'header_links_reordered':
        // Notify about links reordering
        this.io.to('header-global').emit('header-links-reordered', data.header);
        this.io.to('admin-room').emit('header-links-reordered', data.header);
        break;
        
      case 'header_link_status_toggled':
        // Notify about link status toggle
        this.io.to('header-global').emit('header-link-status-toggled', {
          header: data.header,
          linkId: data.linkId
        });
        this.io.to('admin-room').emit('header-link-status-toggled', {
          header: data.header,
          linkId: data.linkId
        });
        break;
        
      case 'header_dashboard_settings_updated':
        // Notify about dashboard settings update
        this.io.to('header-global').emit('header-dashboard-settings-updated', {
          header: data.header,
          role: data.role
        });
        this.io.to('admin-room').emit('header-dashboard-settings-updated', {
          header: data.header,
          role: data.role
        });
        break;
        
      default:
        console.warn(`⚠️ Unknown header event: ${event}`);
    }
  }
}

export default HeaderConsumer;