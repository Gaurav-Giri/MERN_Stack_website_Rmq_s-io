// import Meal from '../models/Meal.js';

// const MealHandler = (io, socket, connectedAdmins) => {
//   // Meal-related socket events
  
//   // Handle meal creation
//   socket.on('create-meal', async (mealData) => {
//     try {
//       const newMeal = new Meal(mealData);
//       await newMeal.save();
      
//       // Notify all admins about the new meal
//       socket.to('admin-room').emit('meal-created', newMeal);
      
//       // Send success response to the sender
//       socket.emit('meal-created-success', newMeal);
//     } catch (error) {
//       console.error('Error creating meal:', error);
//       socket.emit('meal-creation-error', { message: error.message });
//     }
//   });

//   // Handle meal updates
//   socket.on('update-meal', async (updateData) => {
//     try {
//       const updatedMeal = await Meal.findByIdAndUpdate(
//         updateData.id,
//         updateData.updates,
//         { new: true, runValidators: true }
//       );
      
//       if (!updatedMeal) {
//         return socket.emit('meal-update-error', { message: 'Meal not found' });
//       }
      
//       // Notify all admins about the meal update
//       socket.to('admin-room').emit('meal-updated', updatedMeal);
      
//       // Send success response to the sender
//       socket.emit('meal-updated-success', updatedMeal);
//     } catch (error) {
//       console.error('Error updating meal:', error);
//       socket.emit('meal-update-error', { message: error.message });
//     }
//   });

//   // Handle meal deletion (soft delete)
//   socket.on('delete-meal', async (mealId) => {
//     try {
//       const meal = await Meal.findById(mealId);
      
//       if (!meal) {
//         return socket.emit('meal-deletion-error', { message: 'Meal not found' });
//       }

//       // Soft delete by setting isAvailable to false
//       meal.isAvailable = false;
//       const updatedMeal = await meal.save();
      
//       // Notify all admins about the meal deletion
//       socket.to('admin-room').emit('meal-deleted', mealId);
//       socket.to('admin-room').emit('meal-updated', updatedMeal);
      
//       // Send success response to the sender
//       socket.emit('meal-deleted-success', { mealId, meal: updatedMeal });
//     } catch (error) {
//       console.error('Error deleting meal:', error);
//       socket.emit('meal-deletion-error', { message: error.message });
//     }
//   });

//   // Handle meal availability toggle
//   socket.on('toggle-meal-availability', async (mealId) => {
//     try {
//       const meal = await Meal.findById(mealId);
      
//       if (!meal) {
//         return socket.emit('meal-toggle-error', { message: 'Meal not found' });
//       }

//       meal.isAvailable = !meal.isAvailable;
//       const updatedMeal = await meal.save();
      
//       // Notify all admins about the availability change
//       socket.to('admin-room').emit('meal-availability-toggled', updatedMeal);
//       socket.to('admin-room').emit('meal-updated', updatedMeal);
      
//       // Send success response to the sender
//       socket.emit('meal-availability-toggled-success', updatedMeal);
//     } catch (error) {
//       console.error('Error toggling meal availability:', error);
//       socket.emit('meal-toggle-error', { message: error.message });
//     }
//   });

//   // Handle bulk meal operations
//   socket.on('bulk-update-meals', async (bulkData) => {
//     try {
//       const { mealIds, updates } = bulkData;
      
//       const result = await Meal.updateMany(
//         { _id: { $in: mealIds } },
//         updates,
//         { runValidators: true }
//       );
      
//       // Fetch updated meals to send back
//       const updatedMeals = await Meal.find({ _id: { $in: mealIds } });
      
//       // Notify all admins about the bulk update
//       socket.to('admin-room').emit('meals-bulk-updated', updatedMeals);
      
//       // Send success response to the sender
//       socket.emit('meals-bulk-updated-success', {
//         matchedCount: result.matchedCount,
//         modifiedCount: result.modifiedCount,
//         meals: updatedMeals
//       });
//     } catch (error) {
//       console.error('Error in bulk meal update:', error);
//       socket.emit('meals-bulk-update-error', { message: error.message });
//     }
//   });

//   // Handle real-time meal search for admins
//   socket.on('search-meals', async (searchTerm) => {
//     try {
//       let meals;
      
//       if (!searchTerm || searchTerm.trim() === '') {
//         meals = await Meal.find().sort({ name: 1 }).limit(50);
//       } else {
//         meals = await Meal.find({
//           $or: [
//             { name: { $regex: searchTerm, $options: 'i' } },
//             { description: { $regex: searchTerm, $options: 'i' } },
//             { category: { $regex: searchTerm, $options: 'i' } }
//           ]
//         }).sort({ name: 1 }).limit(50);
//       }
      
//       socket.emit('meals-search-results', meals);
//     } catch (error) {
//       console.error('Error searching meals:', error);
//       socket.emit('meals-search-error', { message: error.message });
//     }
//   });
// };

// export default MealHandler;













import Meal from '../models/Meal.js';

const MealHandler = (socket, messageProducer, connectedAdmins) => {
  // Meal-related socket events
  
  // Handle meal creation
  socket.on('create-meal', async (mealData) => {
    try {
      const newMeal = new Meal(mealData);
      await newMeal.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishMealEvent('meal_created', {
        meal: newMeal,
        createdBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meal-created-success', newMeal);
    } catch (error) {
      console.error('Error creating meal:', error);
      socket.emit('meal-creation-error', { message: error.message });
    }
  });

  // Handle meal updates
  socket.on('update-meal', async (updateData) => {
    try {
      const updatedMeal = await Meal.findByIdAndUpdate(
        updateData.id,
        updateData.updates,
        { new: true, runValidators: true }
      );
      
      if (!updatedMeal) {
        return socket.emit('meal-update-error', { message: 'Meal not found' });
      }
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishMealEvent('meal_updated', {
        meal: updatedMeal,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meal-updated-success', updatedMeal);
    } catch (error) {
      console.error('Error updating meal:', error);
      socket.emit('meal-update-error', { message: error.message });
    }
  });

  // Handle meal deletion (soft delete)
  socket.on('delete-meal', async (mealId) => {
    try {
      const meal = await Meal.findById(mealId);
      
      if (!meal) {
        return socket.emit('meal-deletion-error', { message: 'Meal not found' });
      }

      // Soft delete by setting isAvailable to false
      meal.isAvailable = false;
      const updatedMeal = await meal.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishMealEvent('meal_deleted', {
        mealId: mealId,
        meal: updatedMeal,
        deletedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meal-deleted-success', { mealId, meal: updatedMeal });
    } catch (error) {
      console.error('Error deleting meal:', error);
      socket.emit('meal-deletion-error', { message: error.message });
    }
  });

  // Handle meal availability toggle
  socket.on('toggle-meal-availability', async (mealId) => {
    try {
      const meal = await Meal.findById(mealId);
      
      if (!meal) {
        return socket.emit('meal-toggle-error', { message: 'Meal not found' });
      }

      meal.isAvailable = !meal.isAvailable;
      const updatedMeal = await meal.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishMealEvent('meal_availability_toggled', {
        meal: updatedMeal,
        toggledBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meal-availability-toggled-success', updatedMeal);
    } catch (error) {
      console.error('Error toggling meal availability:', error);
      socket.emit('meal-toggle-error', { message: error.message });
    }
  });

  // Handle bulk meal operations
  socket.on('bulk-update-meals', async (bulkData) => {
    try {
      const { mealIds, updates } = bulkData;
      
      const result = await Meal.updateMany(
        { _id: { $in: mealIds } },
        updates,
        { runValidators: true }
      );
      
      // Fetch updated meals to send back
      const updatedMeals = await Meal.find({ _id: { $in: mealIds } });
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishMealEvent('meals_bulk_updated', {
        meals: updatedMeals,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meals-bulk-updated-success', {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        meals: updatedMeals
      });
    } catch (error) {
      console.error('Error in bulk meal update:', error);
      socket.emit('meals-bulk-update-error', { message: error.message });
    }
  });

  // Handle real-time meal search for admins
  socket.on('search-meals', async (searchTerm) => {
    try {
      let meals;
      
      if (!searchTerm || searchTerm.trim() === '') {
        meals = await Meal.find().sort({ name: 1 }).limit(50);
      } else {
        meals = await Meal.find({
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } }
          ]
        }).sort({ name: 1 }).limit(50);
      }
      
      // Direct emit for search results (no need for RabbitMQ)
      socket.emit('meals-search-results', meals);
    } catch (error) {
      console.error('Error searching meals:', error);
      socket.emit('meals-search-error', { message: error.message });
    }
  });

  // Join meal room for real-time updates
  socket.on('join-meal-room', (mealId) => {
    socket.join(`meal-${mealId}`);
  });

  // Leave meal room
  socket.on('leave-meal-room', (mealId) => {
    socket.leave(`meal-${mealId}`);
  });
};

export default MealHandler;