// // const User = require('../models/user'); // Adjust path as needed
// import User from '../models/user.js';
// const UserHandler = (io, socket, connectedAdmins) => {
//   // Admin dashboard real-time updates
//   socket.on('join-admin-room', (adminData) => {
//     socket.join('admin-room');
    
//     // Store admin info
//     connectedAdmins.set(socket.id, {
//       id: socket.id,
//       name: adminData?.name || 'Admin',
//       email: adminData?.email || '',
//       joinedAt: new Date()
//     });
    
//     // Notify others that an admin is online
//     socket.to('admin-room').emit('admin-online', connectedAdmins.get(socket.id));
    
//     // Send list of online admins to the new admin
//     const onlineAdmins = Array.from(connectedAdmins.values());
//     socket.emit('online-admins', onlineAdmins);
    
//     console.log(`Admin joined room: ${socket.id}, Total admins: ${connectedAdmins.size}`);
//   });

//   // Handle custom events if needed
//   socket.on('admin-message', (data) => {
//     // Broadcast admin messages to all admins
//     socket.to('admin-room').emit('admin-message', {
//       from: connectedAdmins.get(socket.id)?.name || 'Admin',
//       message: data.message,
//       timestamp: new Date()
//     });
//   });

//   // User-related socket events
  
//   // Example: Handle user registration
//   socket.on('register-user', async (userData) => {
//     try {
//       const newUser = new User(userData);
//       await newUser.save();
      
//       // Notify all admins about the new user
//       socket.to('admin-room').emit('user-registered', newUser);
      
//       // Send success response to the sender
//       socket.emit('user-registration-success', newUser);
//     } catch (error) {
//       console.error('Error registering user:', error);
//       socket.emit('user-registration-error', { message: error.message });
//     }
//   });

//   // Example: Handle user status updates
//   socket.on('update-user-status', async (statusData) => {
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         statusData.userId,
//         { status: statusData.status },
//         { new: true }
//       );
      
//       // Notify all admins about the user status change
//       socket.to('admin-room').emit('user-status-updated', updatedUser);
      
//       // Send success response to the sender
//       socket.emit('user-status-update-success', updatedUser);
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       socket.emit('user-status-update-error', { message: error.message });
//     }
//   });

//   // Add more user-related events as needed
// };

// // module.exports = UserHandler;
// export default UserHandler;











import User from '../models/user.js';

const UserHandler = (socket, messageProducer, connectedAdmins) => {
  
  // Admin dashboard real-time updates
  socket.on('join-admin-room', async (adminData) => {
    socket.join('admin-room');
    
    // Store admin info
    connectedAdmins.set(socket.id, {
      id: socket.id,
      name: adminData?.name || 'Admin',
      email: adminData?.email || '',
      joinedAt: new Date()
    });
    
    // Instead of direct emit, publish to RabbitMQ
    await messageProducer.publishUserEvent('admin_online', {
      admin: connectedAdmins.get(socket.id),
      onlineAdmins: Array.from(connectedAdmins.values())
    }, socket.id);
    
    console.log(`Admin joined room: ${socket.id}, Total admins: ${connectedAdmins.size}`);
  });

  // Handle custom events if needed
  socket.on('admin-message', async (data) => {
    // Publish admin message to RabbitMQ
    await messageProducer.publishUserEvent('admin_message', {
      from: connectedAdmins.get(socket.id)?.name || 'Admin',
      message: data.message,
      timestamp: new Date()
    }, socket.id);
  });

  // User-related socket events
  
  // Example: Handle user registration via socket
  socket.on('register-user', async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishUserEvent('user_registered', {
        user: newUser,
        registeredVia: 'socket'
      }, socket.id);
      
      // Send success response directly to sender (no need for RabbitMQ)
      socket.emit('user-registration-success', newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      socket.emit('user-registration-error', { message: error.message });
    }
  });

  // Example: Handle user status updates via socket
  socket.on('update-user-status', async (statusData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        statusData.userId,
        { status: statusData.status },
        { new: true }
      );
      
      // Publish to RabbitMQ
      await messageProducer.publishUserEvent('user_status_updated', {
        user: updatedUser,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('user-status-update-success', updatedUser);
    } catch (error) {
      console.error('Error updating user status:', error);
      socket.emit('user-status-update-error', { message: error.message });
    }
  });

  // Add more user-related events as needed
};

export default UserHandler;