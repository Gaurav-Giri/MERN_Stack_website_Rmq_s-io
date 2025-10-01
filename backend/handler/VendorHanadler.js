// const User = require('../models/user'); // Adjust path as needed
import User from '../models/user.js';
const UserHandler = (io, socket, connectedAdmins) => {
  // Admin dashboard real-time updates
  socket.on('join-admin-room', (adminData) => {
    socket.join('admin-room');
    
    // Store admin info
    connectedAdmins.set(socket.id, {
      id: socket.id,
      name: adminData?.name || 'Admin',
      email: adminData?.email || '',
      joinedAt: new Date()
    });
    
    // Notify others that an admin is online
    socket.to('admin-room').emit('admin-online', connectedAdmins.get(socket.id));
    
    // Send list of online admins to the new admin
    const onlineAdmins = Array.from(connectedAdmins.values());
    socket.emit('online-admins', onlineAdmins);
    
    console.log(`Admin joined room: ${socket.id}, Total admins: ${connectedAdmins.size}`);
  });

  // Handle custom events if needed
  socket.on('admin-message', (data) => {
    // Broadcast admin messages to all admins
    socket.to('admin-room').emit('admin-message', {
      from: connectedAdmins.get(socket.id)?.name || 'Admin',
      message: data.message,
      timestamp: new Date()
    });
  });

  // User-related socket events
  
  // Example: Handle user registration
  socket.on('register-user', async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      
      // Notify all admins about the new user
      socket.to('admin-room').emit('user-registered', newUser);
      
      // Send success response to the sender
      socket.emit('user-registration-success', newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      socket.emit('user-registration-error', { message: error.message });
    }
  });

  // Example: Handle user status updates
  socket.on('update-user-status', async (statusData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        statusData.userId,
        { status: statusData.status },
        { new: true }
      );
      
      // Notify all admins about the user status change
      socket.to('admin-room').emit('user-status-updated', updatedUser);
      
      // Send success response to the sender
      socket.emit('user-status-update-success', updatedUser);
    } catch (error) {
      console.error('Error updating user status:', error);
      socket.emit('user-status-update-error', { message: error.message });
    }
  });

  // Add more user-related events as needed
};

// module.exports = UserHandler;
export default UserHandler;
