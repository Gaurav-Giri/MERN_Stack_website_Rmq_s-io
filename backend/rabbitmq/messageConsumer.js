// import { rabbitMQ, EXCHANGES, QUEUES } from './config.js';

// class MessageConsumer {
//   constructor(io) {
//     this.io = io;
//     this.initialized = false;
//   }

//   async initialize() {
//     if (!this.initialized) {
//       const channel = await rabbitMQ.getChannel();
      
//       // Declare exchanges
//       await channel.assertExchange(EXCHANGES.SCHOOL, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.USER, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.MEAL, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.NOTIFICATION, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.ADMIN, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.vENDOR, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.ORDER, 'fanout', { durable: true });
//       await channel.assertExchange(EXCHANGES.CONTENT, 'fanout', { durable: true });
      
      
//       // Declare queues
//       await channel.assertQueue(QUEUES.SCHOOL_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.USER_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.MEAL_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.NOTIFICATION_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.ADMIN_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.VENDOR_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.ORDER_EVENTS, { durable: true });
//       await channel.assertQueue(QUEUES.CONTENT_EVENTS, { durable: true });
      
//       // Bind queues to exchanges
//       await channel.bindQueue(QUEUES.SCHOOL_EVENTS, EXCHANGES.SCHOOL, '');
//       await channel.bindQueue(QUEUES.USER_EVENTS, EXCHANGES.USER, '');
//       await channel.bindQueue(QUEUES.MEAL_EVENTS, EXCHANGES.MEAL, '');
//       await channel.bindQueue(QUEUES.NOTIFICATION_EVENTS, EXCHANGES.NOTIFICATION, '');
//       await channel.bindQueue(QUEUES.ADMIN_EVENTS, EXCHANGES.NOTIFICATION, '');
//       await channel.bindQueue(QUEUES.VENDOR_EVENTS, EXCHANGES.NOTIFICATION, '');
//       await channel.bindQueue(QUEUES.ORDER_EVENTS, EXCHANGES.NOTIFICATION, '');
//       await channel.bindQueue(QUEUES.CONTENT_EVENTS, EXCHANGES.NOTIFICATION, '');
      
//       this.initialized = true;
//       console.log('✅ MessageConsumer initialized');
//     }
//   }

//   async startConsuming() {
//     const channel = await rabbitMQ.getChannel();
    
//     // Consume from user events queue  
//     channel.consume(QUEUES.USER_EVENTS, (msg) => {
//       this.handleMessage(msg, 'USER');
//     }, { noAck: false });

//     // Consume from school events queue
//     channel.consume(QUEUES.SCHOOL_EVENTS, (msg) => {
//       this.handleMessage(msg, 'SCHOOL');
//     }, { noAck: false });

//     // Consume from meal events queue
//     channel.consume(QUEUES.MEAL_EVENTS, (msg) => {
//       this.handleMessage(msg, 'MEAL');
//     }, { noAck: false });

//     console.log('👂 MessageConsumer started listening for messages');
//   }

//   handleMessage(msg, domain) {
//     try {
//       const content = JSON.parse(msg.content.toString());
//       console.log(`📨 Received ${domain} event:`, content.event);

//       // Process the message based on domain and event type
//       this.processMessage(content, domain);

//       // Acknowledge the message
//       const channel = rabbitMQ.channel;
//       channel.ack(msg);
//     } catch (error) {
//       console.error(`❌ Error processing ${domain} message:`, error);
//       const channel = rabbitMQ.channel;
//       channel.nack(msg, false, false); // Don't requeue
//     }
//   }

//   processMessage(content, domain) {
//     const { event, data, socketId } = content;

//     switch (domain) {
//       case 'USER':
//         this.handleUserEvent(event, data, socketId);
//         break;
//       case 'SCHOOL':
//         this.handleSchoolEvent(event, data, socketId);
//         break;
//       case 'MEAL':
//         this.handleMealEvent(event, data, socketId);
//         break;
//     }
//   }

//   handleUserEvent(event, data, socketId) {
//     switch (event) {
//       case 'admin_online':
//         // Notify all admins that a new admin came online
//         this.io.to('admin-room').emit('admin-online', data.admin);
//         // Send updated online admins list to all admins
//         this.io.to('admin-room').emit('online-admins', data.onlineAdmins);
//         break;
        
//       case 'admin_message':
//         // Broadcast admin message to all admins except sender
//         if (socketId) {
//           this.io.to('admin-room').except(socketId).emit('admin-message', data);
//         } else {
//           this.io.to('admin-room').emit('admin-message', data);
//         }
//         break;
        
//       case 'user_registered':
//         // Notify all admins about new user registration
//         this.io.to('admin-room').emit('user-registered', data.user);
//         break;
        
//       case 'user_status_updated':
//         // Notify admins about user status change
//         this.io.to('admin-room').emit('user-status-updated', data.user);
//         break;
        
//       case 'user_updated':
//         // Notify admins about user update (from HTTP or Socket)
//         this.io.to('admin-room').emit('user-updated', data.user);
//         break;
        
//       case 'user_deleted':
//         // Notify admins about user deletion (from HTTP or Socket)
//         this.io.to('admin-room').emit('user-deleted', data.userId);
//         break;
//     }
//   }

//   handleSchoolEvent(event, data, socketId) {
//     switch (event) {
//         case 'school_created':
//         // Notify all admins about new school
//         this.io.to('admin-room').emit('school-created', data.school);
//         break;
        
//         case 'school_updated':
//         // Notify admins and specific school room
//         this.io.to('admin-room').emit('school-updated', data.school);
//         this.io.to(`school-${data.school._id}`).emit('school-updated', data.school);
//         break;
        
//         case 'school_deleted':
//         // Notify admins about school deletion
//         this.io.to('admin-room').emit('school-deleted', data.schoolId);
//         break;
        
//         case 'meal_added_to_school':
//         // Notify about meal addition
//         this.io.to('admin-room').emit('school-meals-updated', data.school);
//         if (socketId) {
//             this.io.to(socketId).emit('meal-added-to-school', data.school);
//         }
//         break;
        
//         case 'meal_removed_from_school':
//         // Notify about meal removal
//         this.io.to('admin-room').emit('school-meals-updated', data.school);
//         if (socketId) {
//             this.io.to(socketId).emit('meal-removed-from-school', data.school);
//         }
//         break;
//     }
//   }

//   handleMealEvent(event, data, socketId) {
//     switch (event) {
//         case 'meal_created':
//         // Notify all admins about new meal
//         this.io.to('admin-room').emit('meal-created', data.meal);
//         break;
        
//         case 'meal_updated':
//         // Notify admins and specific meal room
//         this.io.to('admin-room').emit('meal-updated', data.meal);
//         this.io.to(`meal-${data.meal._id}`).emit('meal-updated', data.meal);
//         break;
        
//         case 'meal_deleted':
//         // Notify admins about meal deletion
//         this.io.to('admin-room').emit('meal-deleted', data.mealId);
//         this.io.to('admin-room').emit('meal-updated', data.meal);
//         break;
        
//         case 'meal_availability_toggled':
//         // Notify about availability change
//         this.io.to('admin-room').emit('meal-availability-toggled', data.meal);
//         this.io.to('admin-room').emit('meal-updated', data.meal);
//         break;
        
//         case 'meals_bulk_updated':
//         // Notify about bulk update
//         this.io.to('admin-room').emit('meals-bulk-updated', data.meals);
//         break;
//     }
//   }
// }

// export default MessageConsumer;











// --------------------After code splitting----------------------------------




import { rabbitMQ, EXCHANGES, QUEUES } from './config.js';

class MessageConsumer {
  constructor(io) {
    this.io = io;
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      const channel = await rabbitMQ.getChannel();
      
      // Declare remaining exchanges (excluding USER, SCHOOL, MEAL)

      await channel.assertExchange(EXCHANGES.ADMIN, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.VENDOR, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.ORDER, 'fanout', { durable: true });
      await channel.assertExchange(EXCHANGES.CONTENT, 'fanout', { durable: true });
      
      // Declare remaining queues (excluding USER_EVENTS, SCHOOL_EVENTS, MEAL_EVENTS)

      await channel.assertQueue(QUEUES.ADMIN_EVENTS, { durable: true });
      await channel.assertQueue(QUEUES.VENDOR_EVENTS, { durable: true });
      await channel.assertQueue(QUEUES.ORDER_EVENTS, { durable: true });
      await channel.assertQueue(QUEUES.CONTENT_EVENTS, { durable: true });
      
      // Bind queues to exchanges

      await channel.bindQueue(QUEUES.ADMIN_EVENTS, EXCHANGES.NOTIFICATION, '');
      await channel.bindQueue(QUEUES.VENDOR_EVENTS, EXCHANGES.NOTIFICATION, '');
      await channel.bindQueue(QUEUES.ORDER_EVENTS, EXCHANGES.NOTIFICATION, '');
      await channel.bindQueue(QUEUES.CONTENT_EVENTS, EXCHANGES.NOTIFICATION, '');
      
      this.initialized = true;
      console.log('✅ MessageConsumer initialized for remaining domains');
    }
  }

  async startConsuming() {
    const channel = await rabbitMQ.getChannel();
    
    // Consume from remaining queues
    // channel.consume(QUEUES.NOTIFICATION_EVENTS, (msg) => {
    //   this.handleMessage(msg, 'NOTIFICATION');
    // }, { noAck: false });

    channel.consume(QUEUES.ADMIN_EVENTS, (msg) => {
      this.handleMessage(msg, 'ADMIN');
    }, { noAck: false });

    channel.consume(QUEUES.VENDOR_EVENTS, (msg) => {
      this.handleMessage(msg, 'VENDOR');
    }, { noAck: false });

    channel.consume(QUEUES.ORDER_EVENTS, (msg) => {
      this.handleMessage(msg, 'ORDER');
    }, { noAck: false });

    channel.consume(QUEUES.CONTENT_EVENTS, (msg) => {
      this.handleMessage(msg, 'CONTENT');
    }, { noAck: false });

    console.log('👂 MessageConsumer started listening for remaining domain messages');
  }

  handleMessage(msg, domain) {
    try {
      const content = JSON.parse(msg.content.toString());
      console.log(`📨 Received ${domain} event:`, content.event);

      // Process the message based on domain
      this.processMessage(content, domain);

      // Acknowledge the message
      const channel = rabbitMQ.channel;
      channel.ack(msg);
    } catch (error) {
      console.error(`❌ Error processing ${domain} message:`, error);
      const channel = rabbitMQ.channel;
      channel.nack(msg, false, false); // Don't requeue
    }
  }

  processMessage(content, domain) {
    const { event, data, socketId } = content;

    // Handle remaining domains here
    switch (domain) {
      // case 'NOTIFICATION':
      //   this.handleNotificationEvent(event, data, socketId);
      //   break;
      case 'ADMIN':
        this.handleAdminEvent(event, data, socketId);
        break;
      case 'VENDOR':
        this.handleVendorEvent(event, data, socketId);
        break;
      case 'ORDER':
        this.handleOrderEvent(event, data, socketId);
        break;
      case 'CONTENT':
        this.handleContentEvent(event, data, socketId);
        break;
      default:
        console.warn(`⚠️ Unhandled domain: ${domain}`);
    }
  }

  // handleNotificationEvent(event, data, socketId) {
  //   // TODO: Implement notification event handling
  //   console.log('Notification event:', event, data);
  // }

  handleAdminEvent(event, data, socketId) {
    // TODO: Implement admin event handling
    console.log('Admin event:', event, data);
  }

  handleVendorEvent(event, data, socketId) {
    // TODO: Implement vendor event handling
    console.log('Vendor event:', event, data);
  }

  handleOrderEvent(event, data, socketId) {
    // TODO: Implement order event handling
    console.log('Order event:', event, data);
  }

  handleContentEvent(event, data, socketId) {
    // TODO: Implement content event handling
    console.log('Content event:', event, data);
  }
}

export default MessageConsumer;