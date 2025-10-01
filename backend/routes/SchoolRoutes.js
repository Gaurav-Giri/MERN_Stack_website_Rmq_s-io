





// // const express = require('express');
// import express from 'express';

// const router = express.Router();
// // const School = require('../models/School');
// import School from '../models/School.js';

// // GET all schools (with optional pagination and filters)
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 0;
//     const skip = (page - 1) * limit;
    
//     // Build filter object
//     const filters = {};
//     if (req.query.type) filters.type = req.query.type;
//     if (req.query.location) {
//       filters.location = { $regex: req.query.location, $options: 'i' };
//     }
//     if (req.query.minMealOptions) {
//       filters.mealOptions = { $gte: parseInt(req.query.minMealOptions) };
//     }
//     if (req.query.maxMealOptions) {
//       filters.mealOptions = { 
//         ...filters.mealOptions, 
//         $lte: parseInt(req.query.maxMealOptions) 
//       };
//     }

//     let schools, total;
    
//     if (limit > 0) {
//       [schools, total] = await Promise.all([
//         School.find(filters).skip(skip).limit(limit).sort({ name: 1 }),
//         School.countDocuments(filters)
//       ]);
//     } else {
//       schools = await School.find(filters).sort({ name: 1 });
//       total = schools.length;
//     }
    
//     res.json({ 
//       success: true, 
//       data: schools,
//       pagination: limit > 0 ? {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       } : null
//     });
//   } catch (error) {
//     console.error('Error fetching schools:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET school by search query
// router.get('/search', async (req, res) => {
//   try {
//     const { q } = req.query;
    
//     if (!q || q.trim() === '') {
//       const schools = await School.find().sort({ name: 1 });
//       return res.json({ success: true, data: schools });
//     }
    
//     const schools = await School.find({
//       $or: [
//         { name: { $regex: q, $options: 'i' } },
//         { location: { $regex: q, $options: 'i' } },
//         { type: { $regex: q, $options: 'i' } }
//       ]
//     }).sort({ name: 1 });
    
//     res.json({ success: true, data: schools });
//   } catch (error) {
//     console.error('Error searching schools:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET schools by filter
// router.get('/filter', async (req, res) => {
//   try {
//     const filters = {};
    
//     if (req.query.type) filters.type = req.query.type;
//     if (req.query.location) {
//       filters.location = { $regex: req.query.location, $options: 'i' };
//     }
//     if (req.query.minMealOptions) {
//       filters.mealOptions = { $gte: parseInt(req.query.minMealOptions) };
//     }
//     if (req.query.maxMealOptions) {
//       filters.mealOptions = { 
//         ...filters.mealOptions, 
//         $lte: parseInt(req.query.maxMealOptions) 
//       };
//     }

//     const schools = await School.find(filters).sort({ name: 1 });
//     res.json({ success: true, data: schools });
//   } catch (error) {
//     console.error('Error filtering schools:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET school statistics
// router.get('/stats/overview', async (req, res) => {
//   try {
//     const totalSchools = await School.countDocuments();
//     const schoolsByType = await School.aggregate([
//       { $group: { _id: '$type', count: { $sum: 1 } } }
//     ]);
    
//     const mealStats = await School.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalMealOptions: { $sum: '$mealOptions' },
//           avgMealOptions: { $avg: '$mealOptions' },
//           maxMealOptions: { $max: '$mealOptions' },
//           minMealOptions: { $min: '$mealOptions' }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       data: {
//         totalSchools,
//         schoolsByType,
//         mealOptions: mealStats[0] || {
//           totalMealOptions: 0,
//           avgMealOptions: 0,
//           maxMealOptions: 0,
//           minMealOptions: 0
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching school statistics:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET single school by ID (now placed after all specific routes)
// router.get('/:id', async (req, res) => {
//   try {
//     // Validate if ID is a valid MongoDB ObjectId
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid school ID format' 
//       });
//     }

//     const school = await School.findById(req.params.id);
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }
//     res.json({ success: true, data: school });
//   } catch (error) {
//     console.error('Error fetching school:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // POST create new school
// router.post('/', async (req, res) => {
//   try {
//     // Validate required fields
//     const { name, location, type, mealOptions, image } = req.body;
    
//     if (!name || !location || !type || mealOptions === undefined || !image) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields: name, location, type, mealOptions, image' 
//       });
//     }

//     // Check if school already exists
//     const existingSchool = await School.findOne({ 
//       name: { $regex: new RegExp(`^${name}$`, 'i') },
//       location: { $regex: new RegExp(`^${location}$`, 'i') }
//     });

//     if (existingSchool) {
//       return res.status(409).json({ 
//         success: false, 
//         message: 'School with this name and location already exists' 
//       });
//     }

//     const school = new School({
//       name: name.trim(),
//       location: location.trim(),
//       type,
//       mealOptions: parseInt(mealOptions),
//       image
//     });

//     const newSchool = await school.save();
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-created', newSchool);
//     }
    
//     res.status(201).json({ success: true, data: newSchool });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error creating school:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // PUT update school
// router.put('/:id', async (req, res) => {
//   try {
//     // Validate if ID is a valid MongoDB ObjectId
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid school ID format' 
//       });
//     }

//     const { name, location, type, mealOptions, image } = req.body;
    
//     // Check if school exists
//     const school = await School.findById(req.params.id);
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }

//     // Check for duplicate school (excluding current school)
//     if (name && location) {
//       const duplicateSchool = await School.findOne({
//         _id: { $ne: req.params.id },
//         name: { $regex: new RegExp(`^${name}$`, 'i') },
//         location: { $regex: new RegExp(`^${location}$`, 'i') }
//       });

//       if (duplicateSchool) {
//         return res.status(409).json({ 
//           success: false, 
//           message: 'Another school with this name and location already exists' 
//         });
//       }
//     }

//     // Update fields
//     if (name) school.name = name.trim();
//     if (location) school.location = location.trim();
//     if (type) school.type = type;
//     if (mealOptions !== undefined) school.mealOptions = parseInt(mealOptions);
//     if (image) school.image = image;

//     const updatedSchool = await school.save();
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-updated', updatedSchool);
//     }
    
//     res.json({ success: true, data: updatedSchool });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error updating school:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // DELETE school
// router.delete('/:id', async (req, res) => {
//   try {
//     // Validate if ID is a valid MongoDB ObjectId
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid school ID format' 
//       });
//     }

//     const school = await School.findByIdAndDelete(req.params.id);
    
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-deleted', req.params.id);
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'School deleted successfully' 
//     });
//   } catch (error) {
//     console.error('Error deleting school:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // module.exports = router;
// export default router;



















// import express from 'express';
// import School from '../models/School.js';
// import Meal from '../models/Meal.js'; // Import Meal model for validation

// const router = express.Router();

// // GET all schools with populated meals
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 0;
//     const skip = (page - 1) * limit;
    
//     // Build filter object
//     const filters = {};
//     if (req.query.type) filters.type = req.query.type;
//     if (req.query.location) {
//       filters.location = { $regex: req.query.location, $options: 'i' };
//     }

//     let schools, total;
    
//     if (limit > 0) {
//       [schools, total] = await Promise.all([
//         School.find(filters)
//           .populate('mealOptions')
//           .skip(skip)
//           .limit(limit)
//           .sort({ name: 1 }),
//         School.countDocuments(filters)
//       ]);
//     } else {
//       schools = await School.find(filters)
//         .populate('mealOptions')
//         .sort({ name: 1 });
//       total = schools.length;
//     }
    
//     res.json({ 
//       success: true, 
//       data: schools,
//       pagination: limit > 0 ? {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       } : null
//     });
//   } catch (error) {
//     console.error('Error fetching schools:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET school by search query with populated meals
// router.get('/search', async (req, res) => {
//   try {
//     const { q } = req.query;
    
//     if (!q || q.trim() === '') {
//       const schools = await School.find().populate('mealOptions').sort({ name: 1 });
//       return res.json({ success: true, data: schools });
//     }
    
//     const schools = await School.find({
//       $or: [
//         { name: { $regex: q, $options: 'i' } },
//         { location: { $regex: q, $options: 'i' } },
//         { type: { $regex: q, $options: 'i' } }
//       ]
//     }).populate('mealOptions').sort({ name: 1 });
    
//     res.json({ success: true, data: schools });
//   } catch (error) {
//     console.error('Error searching schools:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET schools by filter with populated meals
// router.get('/filter', async (req, res) => {
//   try {
//     const filters = {};
    
//     if (req.query.type) filters.type = req.query.type;
//     if (req.query.location) {
//       filters.location = { $regex: req.query.location, $options: 'i' };
//     }

//     const schools = await School.find(filters)
//       .populate('mealOptions')
//       .sort({ name: 1 });
//     res.json({ success: true, data: schools });
//   } catch (error) {
//     console.error('Error filtering schools:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET school statistics (updated for array-based mealOptions)
// router.get('/stats/overview', async (req, res) => {
//   try {
//     const totalSchools = await School.countDocuments();
//     const schoolsByType = await School.aggregate([
//       { $group: { _id: '$type', count: { $sum: 1 } } }
//     ]);
    
//     const mealStats = await School.aggregate([
//       {
//         $project: {
//           mealOptionsCount: { $size: '$mealOptions' }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalMealOptions: { $sum: '$mealOptionsCount' },
//           avgMealOptions: { $avg: '$mealOptionsCount' },
//           maxMealOptions: { $max: '$mealOptionsCount' },
//           minMealOptions: { $min: '$mealOptionsCount' }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       data: {
//         totalSchools,
//         schoolsByType,
//         mealOptions: mealStats[0] || {
//           totalMealOptions: 0,
//           avgMealOptions: 0,
//           maxMealOptions: 0,
//           minMealOptions: 0
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching school statistics:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET single school by ID with populated meals
// router.get('/:id', async (req, res) => {
//   try {
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid school ID format' 
//       });
//     }

//     const school = await School.findById(req.params.id).populate('mealOptions');
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }
//     res.json({ success: true, data: school });
//   } catch (error) {
//     console.error('Error fetching school:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // POST create new school with meal references
// router.post('/', async (req, res) => {
//   try {
//     const { name, location, type, mealOptions, image } = req.body;
    
//     if (!name || !location || !type || !image) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields: name, location, type, image' 
//       });
//     }

//     // Validate meal IDs if provided
//     if (mealOptions && mealOptions.length > 0) {
//       const validMeals = await Meal.find({ _id: { $in: mealOptions } });
//       if (validMeals.length !== mealOptions.length) {
//         return res.status(400).json({ 
//           success: false, 
//           message: 'One or more meal IDs are invalid' 
//         });
//       }
//     }

//     // Check if school already exists
//     const existingSchool = await School.findOne({ 
//       name: { $regex: new RegExp(`^${name}$`, 'i') },
//       location: { $regex: new RegExp(`^${location}$`, 'i') }
//     });

//     if (existingSchool) {
//       return res.status(409).json({ 
//         success: false, 
//         message: 'School with this name and location already exists' 
//       });
//     }

//     const school = new School({
//       name: name.trim(),
//       location: location.trim(),
//       type,
//       mealOptions: mealOptions || [], // Array of meal IDs
//       image
//     });

//     const newSchool = await school.save();
//     const populatedSchool = await School.findById(newSchool._id).populate('mealOptions');
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-created', populatedSchool);
//     }
    
//     res.status(201).json({ success: true, data: populatedSchool });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error creating school:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // PUT update school with meal references
// router.put('/:id', async (req, res) => {
//   try {
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid school ID format' 
//       });
//     }

//     const { name, location, type, mealOptions, image } = req.body;
    
//     // Check if school exists
//     const school = await School.findById(req.params.id);
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }

//     // Validate meal IDs if provided
//     if (mealOptions && mealOptions.length > 0) {
//       const validMeals = await Meal.find({ _id: { $in: mealOptions } });
//       if (validMeals.length !== mealOptions.length) {
//         return res.status(400).json({ 
//           success: false, 
//           message: 'One or more meal IDs are invalid' 
//         });
//       }
//     }

//     // Check for duplicate school (excluding current school)
//     if (name && location) {
//       const duplicateSchool = await School.findOne({
//         _id: { $ne: req.params.id },
//         name: { $regex: new RegExp(`^${name}$`, 'i') },
//         location: { $regex: new RegExp(`^${location}$`, 'i') }
//       });

//       if (duplicateSchool) {
//         return res.status(409).json({ 
//           success: false, 
//           message: 'Another school with this name and location already exists' 
//         });
//       }
//     }

//     // Update fields
//     if (name) school.name = name.trim();
//     if (location) school.location = location.trim();
//     if (type) school.type = type;
//     if (mealOptions !== undefined) school.mealOptions = mealOptions;
//     if (image) school.image = image;

//     const updatedSchool = await school.save();
//     const populatedSchool = await School.findById(updatedSchool._id).populate('mealOptions');
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-updated', populatedSchool);
//     }
    
//     res.json({ success: true, data: populatedSchool });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error updating school:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // DELETE school
// router.delete('/:id', async (req, res) => {
//   try {
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid school ID format' 
//       });
//     }

//     const school = await School.findByIdAndDelete(req.params.id);
    
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-deleted', req.params.id);
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'School deleted successfully' 
//     });
//   } catch (error) {
//     console.error('Error deleting school:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // Add meal to school
// router.patch('/:id/meals', async (req, res) => {
//   try {
//     const { mealId } = req.body;
    
//     if (!mealId) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Meal ID is required' 
//       });
//     }

//     const school = await School.findById(req.params.id);
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }

//     // Validate meal exists
//     const meal = await Meal.findById(mealId);
//     if (!meal) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Meal not found' 
//       });
//     }

//     // Check if meal already exists to avoid duplicates
//     if (!school.mealOptions.includes(mealId)) {
//       school.mealOptions.push(mealId);
//       await school.save();
//     }

//     const populatedSchool = await School.findById(req.params.id).populate('mealOptions');
    
//     // Emit socket event
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-meals-updated', populatedSchool);
//     }
    
//     res.json({ success: true, data: populatedSchool });
//   } catch (error) {
//     console.error('Error adding meal to school:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Remove meal from school
// router.delete('/:id/meals/:mealId', async (req, res) => {
//   try {
//     const school = await School.findById(req.params.id);
//     if (!school) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'School not found' 
//       });
//     }

//     school.mealOptions = school.mealOptions.filter(
//       id => id.toString() !== req.params.mealId
//     );
    
//     await school.save();
//     const populatedSchool = await School.findById(req.params.id).populate('mealOptions');
    
//     // Emit socket event
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('school-meals-updated', populatedSchool);
//     }
    
//     res.json({ success: true, data: populatedSchool });
//   } catch (error) {
//     console.error('Error removing meal from school:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// export default router;










import express from 'express';
import School from '../models/School.js';
import Meal from '../models/Meal.js';
import MessageProducer from './../rabbitmq/messageProducer.js'; // Import the producer

const router = express.Router();

// GET all schools with populated meals
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.location) {
      filters.location = { $regex: req.query.location, $options: 'i' };
    }

    let schools, total;
    
    if (limit > 0) {
      [schools, total] = await Promise.all([
        School.find(filters)
          .populate('mealOptions')
          .skip(skip)
          .limit(limit)
          .sort({ name: 1 }),
        School.countDocuments(filters)
      ]);
    } else {
      schools = await School.find(filters)
        .populate('mealOptions')
        .sort({ name: 1 });
      total = schools.length;
    }
    
    res.json({ 
      success: true, 
      data: schools,
      pagination: limit > 0 ? {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      } : null
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET school by search query with populated meals
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      const schools = await School.find().populate('mealOptions').sort({ name: 1 });
      return res.json({ success: true, data: schools });
    }
    
    const schools = await School.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { type: { $regex: q, $options: 'i' } }
      ]
    }).populate('mealOptions').sort({ name: 1 });
    
    res.json({ success: true, data: schools });
  } catch (error) {
    console.error('Error searching schools:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET schools by filter with populated meals
router.get('/filter', async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.type) filters.type = req.query.type;
    if (req.query.location) {
      filters.location = { $regex: req.query.location, $options: 'i' };
    }

    const schools = await School.find(filters)
      .populate('mealOptions')
      .sort({ name: 1 });
    res.json({ success: true, data: schools });
  } catch (error) {
    console.error('Error filtering schools:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET school statistics (updated for array-based mealOptions)
router.get('/stats/overview', async (req, res) => {
  try {
    console.log('Fetching school statistics...');
    const totalSchools = await School.countDocuments();
    const schoolsByType = await School.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    const mealStats = await School.aggregate([
      {
        $project: {
          mealOptionsCount: { $size: '$mealOptions' }
        }
      },
      {
        $group: {
          _id: null,
          totalMealOptions: { $sum: '$mealOptionsCount' },
          avgMealOptions: { $avg: '$mealOptionsCount' },
          maxMealOptions: { $max: '$mealOptionsCount' },
          minMealOptions: { $min: '$mealOptionsCount' }
        }
      }
    ]);

    // res.json({
    //   success: true,
    //   data: {
    //     totalSchools,
    //     schoolsByType,
    //     mealOptions: mealStats[0] || {
    //       totalMealOptions: 0,
    //       avgMealOptions: 0,
    //       maxMealOptions: 0,
    //       minMealOptions: 0
    //     }
    //   }
    // });

    const result = {
      success: true,
      data: {
        totalSchools,
        schoolsByType,
        mealOptions: mealStats[0] || {
          totalMealOptions: 0,
          avgMealOptions: 0,
          maxMealOptions: 0,
          minMealOptions: 0
        }
      }
    };
  } catch (error) {
    console.error('Error fetching school statistics:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET single school by ID with populated meals
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid school ID format' 
      });
    }

    const school = await School.findById(req.params.id).populate('mealOptions');
    if (!school) {
      return res.status(404).json({ 
        success: false, 
        message: 'School not found' 
      });
    }
    res.json({ success: true, data: school });
  } catch (error) {
    console.error('Error fetching school:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// POST create new school with meal references
router.post('/', async (req, res) => {
  try {
    const { name, location, type, mealOptions, image } = req.body;
    
    if (!name || !location || !type || !image) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, location, type, image' 
      });
    }

    // Validate meal IDs if provided
    if (mealOptions && mealOptions.length > 0) {
      const validMeals = await Meal.find({ _id: { $in: mealOptions } });
      if (validMeals.length !== mealOptions.length) {
        return res.status(400).json({ 
          success: false, 
          message: 'One or more meal IDs are invalid' 
        });
      }
    }

    // Check if school already exists
    const existingSchool = await School.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      location: { $regex: new RegExp(`^${location}$`, 'i') }
    });

    if (existingSchool) {
      return res.status(409).json({ 
        success: false, 
        message: 'School with this name and location already exists' 
      });
    }

    const school = new School({
      name: name.trim(),
      location: location.trim(),
      type,
      mealOptions: mealOptions || [],
      image
    });

    const newSchool = await school.save();
    const populatedSchool = await School.findById(newSchool._id).populate('mealOptions');
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishSchoolEvent('school_created', {
      school: populatedSchool,
      createdVia: 'http'
    });
    
    res.status(201).json({ success: true, data: populatedSchool });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error creating school:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update school with meal references
router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid school ID format' 
      });
    }

    const { name, location, type, mealOptions, image } = req.body;
    
    // Check if school exists
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ 
        success: false, 
        message: 'School not found' 
      });
    }

    // Validate meal IDs if provided
    if (mealOptions && mealOptions.length > 0) {
      const validMeals = await Meal.find({ _id: { $in: mealOptions } });
      if (validMeals.length !== mealOptions.length) {
        return res.status(400).json({ 
          success: false, 
          message: 'One or more meal IDs are invalid' 
        });
      }
    }

    // Check for duplicate school (excluding current school)
    if (name && location) {
      const duplicateSchool = await School.findOne({
        _id: { $ne: req.params.id },
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        location: { $regex: new RegExp(`^${location}$`, 'i') }
      });

      if (duplicateSchool) {
        return res.status(409).json({ 
          success: false, 
          message: 'Another school with this name and location already exists' 
        });
      }
    }

    // Update fields
    if (name) school.name = name.trim();
    if (location) school.location = location.trim();
    if (type) school.type = type;
    if (mealOptions !== undefined) school.mealOptions = mealOptions;
    if (image) school.image = image;

    const updatedSchool = await school.save();
    const populatedSchool = await School.findById(updatedSchool._id).populate('mealOptions');
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishSchoolEvent('school_updated', {
      school: populatedSchool,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: populatedSchool });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating school:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// DELETE school
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid school ID format' 
      });
    }

    const school = await School.findByIdAndDelete(req.params.id);
    
    if (!school) {
      return res.status(404).json({ 
        success: false, 
        message: 'School not found' 
      });
    }
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishSchoolEvent('school_deleted', {
      schoolId: req.params.id,
      schoolName: school.name,
      deletedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'School deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Add meal to school
router.patch('/:id/meals', async (req, res) => {
  try {
    const { mealId } = req.body;
    
    if (!mealId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Meal ID is required' 
      });
    }

    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ 
        success: false, 
        message: 'School not found' 
      });
    }

    // Validate meal exists
    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }

    // Check if meal already exists to avoid duplicates
    if (!school.mealOptions.includes(mealId)) {
      school.mealOptions.push(mealId);
      await school.save();
    }

    const populatedSchool = await School.findById(req.params.id).populate('mealOptions');
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishSchoolEvent('meal_added_to_school', {
      school: populatedSchool,
      mealId: mealId,
      addedVia: 'http'
    });
    
    res.json({ success: true, data: populatedSchool });
  } catch (error) {
    console.error('Error adding meal to school:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Remove meal from school
router.delete('/:id/meals/:mealId', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ 
        success: false, 
        message: 'School not found' 
      });
    }

    school.mealOptions = school.mealOptions.filter(
      id => id.toString() !== req.params.mealId
    );
    
    await school.save();
    const populatedSchool = await School.findById(req.params.id).populate('mealOptions');
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishSchoolEvent('meal_removed_from_school', {
      school: populatedSchool,
      mealId: req.params.mealId,
      removedVia: 'http'
    });
    
    res.json({ success: true, data: populatedSchool });
  } catch (error) {
    console.error('Error removing meal from school:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;