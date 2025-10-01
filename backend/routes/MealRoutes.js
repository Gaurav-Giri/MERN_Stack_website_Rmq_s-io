// import express from 'express';
// import Meal from '../models/Meal.js';

// const router = express.Router();

// // GET all meals (with optional pagination and filters)
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 0;
//     const skip = (page - 1) * limit;
    
//     // Build filter object
//     const filters = { isAvailable: true };
    
//     // Category filter
//     if (req.query.category) {
//       filters.category = req.query.category;
//     }
    
//     // Price range filter
//     if (req.query.minPrice) {
//       filters.price = { $gte: parseFloat(req.query.minPrice) };
//     }
//     if (req.query.maxPrice) {
//       filters.price = { 
//         ...filters.price, 
//         $lte: parseFloat(req.query.maxPrice) 
//       };
//     }
    
//     // Calorie range filter
//     if (req.query.minCalories) {
//       filters['nutrition.calories'] = { $gte: parseInt(req.query.minCalories) };
//     }
//     if (req.query.maxCalories) {
//       filters['nutrition.calories'] = { 
//         ...filters['nutrition.calories'], 
//         $lte: parseInt(req.query.maxCalories) 
//       };
//     }
    
//     // Allergen filter (exclude meals containing these allergens)
//     if (req.query.excludeAllergens) {
//       const allergens = Array.isArray(req.query.excludeAllergens) 
//         ? req.query.excludeAllergens 
//         : [req.query.excludeAllergens];
//       filters.allergens = { $nin: allergens };
//     }

//     let meals, total;
    
//     if (limit > 0) {
//       [meals, total] = await Promise.all([
//         Meal.find(filters).skip(skip).limit(limit).sort({ name: 1 }),
//         Meal.countDocuments(filters)
//       ]);
//     } else {
//       meals = await Meal.find(filters).sort({ name: 1 });
//       total = meals.length;
//     }
    
//     res.json({ 
//       success: true, 
//       data: meals,
//       pagination: limit > 0 ? {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       } : null
//     });
//   } catch (error) {
//     console.error('Error fetching meals:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET meal by search query
// router.get('/search', async (req, res) => {
//   try {
//     const { q } = req.query;
    
//     if (!q || q.trim() === '') {
//       const meals = await Meal.find({ isAvailable: true }).sort({ name: 1 });
//       return res.json({ success: true, data: meals });
//     }
    
//     const meals = await Meal.find({
//       isAvailable: true,
//       $or: [
//         { name: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { category: { $regex: q, $options: 'i' } }
//       ]
//     }).sort({ name: 1 });
    
//     res.json({ success: true, data: meals });
//   } catch (error) {
//     console.error('Error searching meals:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET meals by filter
// router.get('/filter', async (req, res) => {
//   try {
//     const filters = { isAvailable: true };
    
//     if (req.query.category) filters.category = req.query.category;
//     if (req.query.minPrice) {
//       filters.price = { $gte: parseFloat(req.query.minPrice) };
//     }
//     if (req.query.maxPrice) {
//       filters.price = { 
//         ...filters.price, 
//         $lte: parseFloat(req.query.maxPrice) 
//       };
//     }
//     if (req.query.minCalories) {
//       filters['nutrition.calories'] = { $gte: parseInt(req.query.minCalories) };
//     }
//     if (req.query.maxCalories) {
//       filters['nutrition.calories'] = { 
//         ...filters['nutrition.calories'], 
//         $lte: parseInt(req.query.maxCalories) 
//       };
//     }
//     if (req.query.excludeAllergens) {
//       const allergens = Array.isArray(req.query.excludeAllergens) 
//         ? req.query.excludeAllergens 
//         : [req.query.excludeAllergens];
//       filters.allergens = { $nin: allergens };
//     }

//     const meals = await Meal.find(filters).sort({ name: 1 });
//     res.json({ success: true, data: meals });
//   } catch (error) {
//     console.error('Error filtering meals:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET meal statistics
// router.get('/stats/overview', async (req, res) => {
//   try {
//     const totalMeals = await Meal.countDocuments();
//     const availableMeals = await Meal.countDocuments({ isAvailable: true });
//     const mealsByCategory = await Meal.aggregate([
//       { $group: { _id: '$category', count: { $sum: 1 } } }
//     ]);
    
//     const priceStats = await Meal.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalPrice: { $sum: '$price' },
//           avgPrice: { $avg: '$price' },
//           maxPrice: { $max: '$price' },
//           minPrice: { $min: '$price' }
//         }
//       }
//     ]);

//     const nutritionStats = await Meal.aggregate([
//       {
//         $group: {
//           _id: null,
//           avgCalories: { $avg: '$nutrition.calories' },
//           avgProtein: { $avg: '$nutrition.protein' },
//           avgCarbs: { $avg: '$nutrition.carbs' },
//           avgFat: { $avg: '$nutrition.fat' }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       data: {
//         totalMeals,
//         availableMeals,
//         unavailableMeals: totalMeals - availableMeals,
//         mealsByCategory,
//         priceStats: priceStats[0] || {
//           totalPrice: 0,
//           avgPrice: 0,
//           maxPrice: 0,
//           minPrice: 0
//         },
//         nutritionStats: nutritionStats[0] || {
//           avgCalories: 0,
//           avgProtein: 0,
//           avgCarbs: 0,
//           avgFat: 0
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching meal statistics:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET single meal by ID
// router.get('/:id', async (req, res) => {
//   try {
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid meal ID format' 
//       });
//     }

//     const meal = await Meal.findById(req.params.id);
//     if (!meal) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Meal not found' 
//       });
//     }
//     res.json({ success: true, data: meal });
//   } catch (error) {
//     console.error('Error fetching meal:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // POST create new meal
// router.post('/', async (req, res) => {
//   try {
//     const { name, image, description, nutrition, allergens, price, category, preparationTime } = req.body;
    
//     if (!name || !image || !description || !nutrition || !price) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields: name, image, description, nutrition, price' 
//       });
//     }

//     // Check if meal already exists
//     const existingMeal = await Meal.findOne({ 
//       name: { $regex: new RegExp(`^${name}$`, 'i') }
//     });

//     if (existingMeal) {
//       return res.status(409).json({ 
//         success: false, 
//         message: 'Meal with this name already exists' 
//       });
//     }

//     const meal = new Meal({
//       name: name.trim(),
//       image,
//       description: description.trim(),
//       nutrition,
//       allergens: allergens || [],
//       price: parseFloat(price),
//       category: category || 'non-vegetarian',
//       preparationTime: preparationTime || 30
//     });

//     const newMeal = await meal.save();
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('meal-created', newMeal);
//     }
    
//     res.status(201).json({ success: true, data: newMeal });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error creating meal:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // PUT update meal
// router.put('/:id', async (req, res) => {
//   try {
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid meal ID format' 
//       });
//     }

//     const { name, image, description, nutrition, allergens, price, category, preparationTime, isAvailable } = req.body;
    
//     const meal = await Meal.findById(req.params.id);
//     if (!meal) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Meal not found' 
//       });
//     }

//     // Check for duplicate meal (excluding current meal)
//     if (name) {
//       const duplicateMeal = await Meal.findOne({
//         _id: { $ne: req.params.id },
//         name: { $regex: new RegExp(`^${name}$`, 'i') }
//       });

//       if (duplicateMeal) {
//         return res.status(409).json({ 
//           success: false, 
//           message: 'Another meal with this name already exists' 
//         });
//       }
//     }

//     // Update fields
//     if (name) meal.name = name.trim();
//     if (image) meal.image = image;
//     if (description) meal.description = description.trim();
//     if (nutrition) meal.nutrition = nutrition;
//     if (allergens !== undefined) meal.allergens = allergens;
//     if (price !== undefined) meal.price = parseFloat(price);
//     if (category) meal.category = category;
//     if (preparationTime !== undefined) meal.preparationTime = preparationTime;
//     if (isAvailable !== undefined) meal.isAvailable = isAvailable;

//     const updatedMeal = await meal.save();
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('meal-updated', updatedMeal);
//     }
    
//     res.json({ success: true, data: updatedMeal });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: errors.join(', ') });
//     }
//     console.error('Error updating meal:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // DELETE meal (soft delete by setting isAvailable to false)
// router.delete('/:id', async (req, res) => {
//   try {
//     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid meal ID format' 
//       });
//     }

//     const meal = await Meal.findById(req.params.id);
    
//     if (!meal) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Meal not found' 
//       });
//     }

//     // Soft delete by setting isAvailable to false
//     meal.isAvailable = false;
//     const updatedMeal = await meal.save();
    
//     // Emit socket event for real-time update
//     const io = req.app.get('io');
//     if (io) {
//       io.to('admin-room').emit('meal-deleted', req.params.id);
//       io.to('admin-room').emit('meal-updated', updatedMeal);
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'Meal deleted successfully',
//       data: updatedMeal
//     });
//   } catch (error) {
//     console.error('Error deleting meal:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// export default router;












import express from 'express';
import Meal from '../models/Meal.js';
import MessageProducer from './../rabbitmq/messageProducer.js'; // Import the producer

const router = express.Router();

// GET all meals (with optional pagination and filters)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filters = { isAvailable: true };
    
    // Category filter
    if (req.query.category) {
      filters.category = req.query.category;
    }
    
    // Price range filter
    if (req.query.minPrice) {
      filters.price = { $gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filters.price = { 
        ...filters.price, 
        $lte: parseFloat(req.query.maxPrice) 
      };
    }
    
    // Calorie range filter
    if (req.query.minCalories) {
      filters['nutrition.calories'] = { $gte: parseInt(req.query.minCalories) };
    }
    if (req.query.maxCalories) {
      filters['nutrition.calories'] = { 
        ...filters['nutrition.calories'], 
        $lte: parseInt(req.query.maxCalories) 
      };
    }
    
    // Allergen filter (exclude meals containing these allergens)
    if (req.query.excludeAllergens) {
      const allergens = Array.isArray(req.query.excludeAllergens) 
        ? req.query.excludeAllergens 
        : [req.query.excludeAllergens];
      filters.allergens = { $nin: allergens };
    }

    let meals, total;
    
    if (limit > 0) {
      [meals, total] = await Promise.all([
        Meal.find(filters).skip(skip).limit(limit).sort({ name: 1 }),
        Meal.countDocuments(filters)
      ]);
    } else {
      meals = await Meal.find(filters).sort({ name: 1 });
      total = meals.length;
    }
    
    res.json({ 
      success: true, 
      data: meals,
      pagination: limit > 0 ? {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      } : null
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET meal by search query
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      const meals = await Meal.find({ isAvailable: true }).sort({ name: 1 });
      return res.json({ success: true, data: meals });
    }
    
    const meals = await Meal.find({
      isAvailable: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    
    res.json({ success: true, data: meals });
  } catch (error) {
    console.error('Error searching meals:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET meals by filter
router.get('/filter', async (req, res) => {
  try {
    const filters = { isAvailable: true };
    
    if (req.query.category) filters.category = req.query.category;
    if (req.query.minPrice) {
      filters.price = { $gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filters.price = { 
        ...filters.price, 
        $lte: parseFloat(req.query.maxPrice) 
      };
    }
    if (req.query.minCalories) {
      filters['nutrition.calories'] = { $gte: parseInt(req.query.minCalories) };
    }
    if (req.query.maxCalories) {
      filters['nutrition.calories'] = { 
        ...filters['nutrition.calories'], 
        $lte: parseInt(req.query.maxCalories) 
      };
    }
    if (req.query.excludeAllergens) {
      const allergens = Array.isArray(req.query.excludeAllergens) 
        ? req.query.excludeAllergens 
        : [req.query.excludeAllergens];
      filters.allergens = { $nin: allergens };
    }

    const meals = await Meal.find(filters).sort({ name: 1 });
    res.json({ success: true, data: meals });
  } catch (error) {
    console.error('Error filtering meals:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET meal statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalMeals = await Meal.countDocuments();
    const availableMeals = await Meal.countDocuments({ isAvailable: true });
    const mealsByCategory = await Meal.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const priceStats = await Meal.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$price' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' }
        }
      }
    ]);

    const nutritionStats = await Meal.aggregate([
      {
        $group: {
          _id: null,
          avgCalories: { $avg: '$nutrition.calories' },
          avgProtein: { $avg: '$nutrition.protein' },
          avgCarbs: { $avg: '$nutrition.carbs' },
          avgFat: { $avg: '$nutrition.fat' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalMeals,
        availableMeals,
        unavailableMeals: totalMeals - availableMeals,
        mealsByCategory,
        priceStats: priceStats[0] || {
          totalPrice: 0,
          avgPrice: 0,
          maxPrice: 0,
          minPrice: 0
        },
        nutritionStats: nutritionStats[0] || {
          avgCalories: 0,
          avgProtein: 0,
          avgCarbs: 0,
          avgFat: 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching meal statistics:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET single meal by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid meal ID format' 
      });
    }

    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }
    res.json({ success: true, data: meal });
  } catch (error) {
    console.error('Error fetching meal:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// POST create new meal
router.post('/', async (req, res) => {
  try {
    const { name, image, description, nutrition, allergens, price, category, preparationTime } = req.body;
    
    if (!name || !image || !description || !nutrition || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, image, description, nutrition, price' 
      });
    }

    // Check if meal already exists
    const existingMeal = await Meal.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });

    if (existingMeal) {
      return res.status(409).json({ 
        success: false, 
        message: 'Meal with this name already exists' 
      });
    }

    const meal = new Meal({
      name: name.trim(),
      image,
      description: description.trim(),
      nutrition,
      allergens: allergens || [],
      price: parseFloat(price),
      category: category || 'non-vegetarian',
      preparationTime: preparationTime || 30
    });

    const newMeal = await meal.save();
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishMealEvent('meal_created', {
      meal: newMeal,
      createdVia: 'http'
    });
    
    res.status(201).json({ success: true, data: newMeal });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error creating meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update meal
router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid meal ID format' 
      });
    }

    const { name, image, description, nutrition, allergens, price, category, preparationTime, isAvailable } = req.body;
    
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }

    // Check for duplicate meal (excluding current meal)
    if (name) {
      const duplicateMeal = await Meal.findOne({
        _id: { $ne: req.params.id },
        name: { $regex: new RegExp(`^${name}$`, 'i') }
      });

      if (duplicateMeal) {
        return res.status(409).json({ 
          success: false, 
          message: 'Another meal with this name already exists' 
        });
      }
    }

    // Update fields
    if (name) meal.name = name.trim();
    if (image) meal.image = image;
    if (description) meal.description = description.trim();
    if (nutrition) meal.nutrition = nutrition;
    if (allergens !== undefined) meal.allergens = allergens;
    if (price !== undefined) meal.price = parseFloat(price);
    if (category) meal.category = category;
    if (preparationTime !== undefined) meal.preparationTime = preparationTime;
    if (isAvailable !== undefined) meal.isAvailable = isAvailable;

    const updatedMeal = await meal.save();
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishMealEvent('meal_updated', {
      meal: updatedMeal,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedMeal });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating meal:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// DELETE meal (soft delete by setting isAvailable to false)
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid meal ID format' 
      });
    }

    const meal = await Meal.findById(req.params.id);
    
    if (!meal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }

    // Soft delete by setting isAvailable to false
    meal.isAvailable = false;
    const updatedMeal = await meal.save();
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishMealEvent('meal_deleted', {
      mealId: req.params.id,
      meal: updatedMeal,
      deletedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Meal deleted successfully',
      data: updatedMeal
    });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// PATCH toggle meal availability
router.patch('/:id/availability', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid meal ID format' 
      });
    }

    const meal = await Meal.findById(req.params.id);
    
    if (!meal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }

    meal.isAvailable = !meal.isAvailable;
    const updatedMeal = await meal.save();
    
    // Publish to RabbitMQ instead of direct socket emit
    await MessageProducer.publishMealEvent('meal_availability_toggled', {
      meal: updatedMeal,
      toggledVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: `Meal ${updatedMeal.isAvailable ? 'enabled' : 'disabled'} successfully`,
      data: updatedMeal
    });
  } catch (error) {
    console.error('Error toggling meal availability:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;