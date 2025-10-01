



// // const express = require('express');
// import express from 'express';

// const router = express.Router();
// // const User = require('../models/user');
// import User from '../models/user.js';

// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 0;
//     const skip = (page - 1) * limit;
    
//     // Build filter object
//     const filters = {};
//     if (req.query.email) {
//       filters.email = { $regex: req.query.email, $options: 'i' };
//     }

//     let users, total;
    
//     if (limit > 0) {
//       [users, total] = await Promise.all([
//         User.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }),
//         User.countDocuments(filters)
//       ]);
//     } else {
//       users = await User.find(filters).sort({ createdAt: -1 });
//       total = users.length;
//     }
    
//     res.json({ 
//       success: true, 
//       data: users,
//       pagination: limit > 0 ? {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       } : null
//     });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET user by email
// router.get('/:email', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }
//     res.json({ success: true, data: user });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // PUT update user
// router.put('/:email', async (req, res) => {
//   try {
//     const { name, phone, A, B, C, role } = req.body;
    
//     const user = await User.findOneAndUpdate(
//       { email: req.params.email },
//       { name, phone, A, B, C, role },
//       { new: true, runValidators: true }
//     );
    
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('user-updated', user);
//     }

//     res.json({ success: true, data: user });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error updating user:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // DELETE user
// router.delete('/:email', async (req, res) => {
//   try {
//     const user = await User.findOneAndDelete({ email: req.params.email });
    
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('user-deleted', user._id);
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'User deleted successfully' 
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // GET user statistics
// router.get('/stats/overview', async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const usersByCreation = await User.aggregate([
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } },
//       { $limit: 7 }
//     ]);
    
//     const usersWithDetails = await User.countDocuments({
//       $and: [
//         { name: { $ne: "User" } },
//         { phone: { $ne: "" } }
//       ]
//     });

//     res.json({
//       success: true,
//       data: {
//         totalUsers,
//         usersByCreation,
//         usersWithDetails,
//         usersWithoutDetails: totalUsers - usersWithDetails
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching user statistics:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // module.exports = router;


// export default router;












import express from 'express';
import User from '../models/user.js';
import MessageProducer from './../rabbitmq/messageProducer.js'; // Import the producer

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filters = {};
    if (req.query.email) {
      filters.email = { $regex: req.query.email, $options: 'i' };
    }

    let users, total;
    
    if (limit > 0) {
      [users, total] = await Promise.all([
        User.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }),
        User.countDocuments(filters)
      ]);
    } else {
      users = await User.find(filters).sort({ createdAt: -1 });
      total = users.length;
    }
    
    res.json({ 
      success: true, 
      data: users,
      pagination: limit > 0 ? {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      } : null
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET user by email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// PUT update user
router.put('/:email', async (req, res) => {
  try {
    const { name, phone, A, B, C, role } = req.body;
    
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { name, phone, A, B, C, role },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // INSTEAD OF direct socket emit, publish to RabbitMQ
    await MessageProducer.publishUserEvent('user_updated', {
      user: user,
      updatedVia: 'http'
    });

    res.json({ success: true, data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// DELETE user
router.delete('/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // INSTEAD OF direct socket emit, publish to RabbitMQ
    await MessageProducer.publishUserEvent('user_deleted', {
      userId: user._id,
      userEmail: user.email,
      deletedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET user statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const usersByCreation = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);
    
    const usersWithDetails = await User.countDocuments({
      $and: [
        { name: { $ne: "User" } },
        { phone: { $ne: "" } }
      ]
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        usersByCreation,
        usersWithDetails,
        usersWithoutDetails: totalUsers - usersWithDetails
      }
    });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;