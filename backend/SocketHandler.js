
// // const SchoolHandler = require('./handler/SchoolHandler');
// import SchoolHandler from './handler/SchoolHandler.js';

// // const UserHandler = require('./handler/UserHandler');
// import UserHandler from './handler/UserHandler.js';
// import MealHandler from './handler/MealHandler.js';
// // import NotificationHandler from './handler/NotificationHandler.js';

// const connectedAdmins = new Map();

// const setupSocketHandlers = (io) => {
//   io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // Authentication middleware for socket
//     socket.use((packet, next) => {
//       const token = socket.handshake.auth.token;
//       if (!token) {
//         return next(new Error('Authentication error'));
//       }
//       try {
//         // const decoded = verifyToken(token); // Implement your token verification
//         // socket.userId = decoded.userId;
//         // socket.userRole = decoded.role;
//         next();
//       } catch (error) {
//         next(new Error('Authentication error'));
//       }
//     });

//     // Initialize handlers
//     SchoolHandler(io, socket, connectedAdmins);
//     UserHandler(io, socket, connectedAdmins);
//     MealHandler(io, socket, connectedAdmins);
//     // NotificationHandler(io, socket, connectedAdmins);

//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
      
//       // Remove from connected admins
//       if (connectedAdmins.has(socket.id)) {
//         connectedAdmins.delete(socket.id);
//         socket.to('admin-room').emit('admin-offline', socket.id);
//       }
      
//       console.log(`Admin disconnected: ${socket.id}, Remaining admins: ${connectedAdmins.size}`);
//     });

//     // Error handling
//     socket.on('error', (error) => {
//       console.error('Socket error:', error);
//     });
//   });

//   return io;
// };

// // Helper function to broadcast to all admins
// const broadcastToAdmins = (io, event, data) => {
//   if (io && io.sockets) {
//     const adminRoom = io.sockets.adapter.rooms.get('admin-room');
//     if (adminRoom) {
//       io.to('admin-room').emit(event, data);
//     }
//   }
// };

// // Helper function to get connected admins count
// const getConnectedAdminsCount = () => {
//   return connectedAdmins.size;
// };

// // Helper to get online admins
// const getOnlineAdmins = () => {
//   return Array.from(connectedAdmins.values());
// };

// export default  {
//   setupSocketHandlers,
//   broadcastToAdmins,
//   getConnectedAdminsCount,
//   getOnlineAdmins
// };











//importing handlers
import SchoolHandler from './handler/SchoolHandler.js';
import UserHandler from './handler/UserHandler.js';
import MealHandler from './handler/MealHandler.js';
// import VendorHandler from './handler/VendorHanadler.js';
// import AdminHandler from './handler/AdminHandler.js';
import NotificationHandler from './handler/NotificationHandler.js';
// import OrderHandler from './handler/OrderHandler.js';
// import ContentHandler from './handler/ContentHandler/ContentHandler.js';
import HeaderHandler from './handler/ContentHandler/HeaderHandler.js';
import FooterHandler from './handler/ContentHandler/FooterHandler.js';


//rabbitmq Producer 
import MessageProducer from '././rabbitmq/messageProducer.js';

const connectedAdmins = new Map();

const setupSocketHandlers = async (io) => {
  // Initialize RabbitMQ connection and message producer
  try {
    await MessageProducer.initialize();
    console.log('✅ RabbitMQ ready for Socket.IO events');
  } catch (error) {
    console.error('❌ Failed to initialize RabbitMQ:', error);
    // You might want to decide if you want to crash the app or continue without RabbitMQ
  }

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Authentication middleware for socket
    socket.use((packet, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      try {
        // const decoded = verifyToken(token); // Implement your token verification
        // socket.userId = decoded.userId;
        // socket.userRole = decoded.role;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    // Initialize handlers - pass the MessageProducer instead of io/socket
    SchoolHandler(socket, MessageProducer, connectedAdmins);
    UserHandler(socket, MessageProducer, connectedAdmins);
    MealHandler(socket, MessageProducer, connectedAdmins);
    // AdminHandler(socket, MessageProducer, connectedAdmins);
    // VendorHandler(socket, MessageProducer, connectedAdmins);
    NotificationHandler(socket, MessageProducer, connectedAdmins);
    // OrderHandler(socket, MessageProducer, connectedAdmins);
    // ContentHandler(socket, MessageProducer, connectedAdmins);
    HeaderHandler(socket, MessageProducer, connectedAdmins);
    FooterHandler(socket, MessageProducer, connectedAdmins);
    

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      // Remove from connected admins
      if (connectedAdmins.has(socket.id)) {
        connectedAdmins.delete(socket.id);
        // Notify about admin going offline via RabbitMQ
        MessageProducer.publishUserEvent('admin_offline', { socketId: socket.id }, socket.id);
      }
      
      console.log(`Admin disconnected: ${socket.id}, Remaining admins: ${connectedAdmins.size}`);
    });

    // Error handling
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  return io;
};

// These helper functions will now be used by the Consumer, not directly by handlers
const broadcastToAdmins = (io, event, data) => {
  if (io && io.sockets) {
    const adminRoom = io.sockets.adapter.rooms.get('admin-room');
    if (adminRoom) {
      io.to('admin-room').emit(event, data);
    }
  }
};

const getConnectedAdminsCount = () => {
  return connectedAdmins.size;
};

const getOnlineAdmins = () => {
  return Array.from(connectedAdmins.values());
};

export default {
  setupSocketHandlers,
  broadcastToAdmins,
  getConnectedAdminsCount,
  getOnlineAdmins
};