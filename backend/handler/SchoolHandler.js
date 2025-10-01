// // const School = require('../models/School'); // Adjust path as needed
// import School from '../models/School.js';


// const SchoolHandler = (io, socket, connectedAdmins) => {
//   // School-related socket events
  
//   // Example: Handle school creation
//   socket.on('create-school', async (schoolData) => {
//     try {
//       const newSchool = new School(schoolData);
//       await newSchool.save();
      
//       // Notify all admins about the new school
//       socket.to('admin-room').emit('school-created', newSchool);
      
//       // Send success response to the sender
//       socket.emit('school-created-success', newSchool);
//     } catch (error) {
//       console.error('Error creating school:', error);
//       socket.emit('school-creation-error', { message: error.message });
//     }
//   });

//   // Example: Handle school updates
//   socket.on('update-school', async (updateData) => {
//     try {
//       const updatedSchool = await School.findByIdAndUpdate(
//         updateData.id,
//         updateData.updates,
//         { new: true }
//       );
      
//       // Notify all admins about the school update
//       socket.to('admin-room').emit('school-updated', updatedSchool);
      
//       // Send success response to the sender
//       socket.emit('school-updated-success', updatedSchool);
//     } catch (error) {
//       console.error('Error updating school:', error);
//       socket.emit('school-update-error', { message: error.message });
//     }
//   });

//   // Add more school-related events as needed
// };

// // module.exports = SchoolHandler;
// export default SchoolHandler;















// import School from '../models/School.js';
// import Meal from '../models/Meal.js'; // Import Meal model for validation

// const SchoolHandler = (io, socket, connectedAdmins) => {
//   // Handle school creation with meal references
//   socket.on('create-school', async (schoolData) => {
//     try {
//       // Validate meal IDs if provided
//       if (schoolData.mealOptions && schoolData.mealOptions.length > 0) {
//         const validMeals = await Meal.find({ _id: { $in: schoolData.mealOptions } });
//         if (validMeals.length !== schoolData.mealOptions.length) {
//           throw new Error('One or more meal IDs are invalid');
//         }
//       }

//       const newSchool = new School(schoolData);
//       await newSchool.save();
      
//       // Populate meal data before emitting
//       const populatedSchool = await School.findById(newSchool._id).populate('mealOptions');
      
//       // Notify all admins about the new school
//       socket.to('admin-room').emit('school-created', populatedSchool);
      
//       // Send success response to the sender
//       socket.emit('school-created-success', populatedSchool);
//     } catch (error) {
//       console.error('Error creating school:', error);
//       socket.emit('school-creation-error', { message: error.message });
//     }
//   });

//   // Handle school updates with meal references
//   socket.on('update-school', async (updateData) => {
//     try {
//       const { id, updates } = updateData;
      
//       // Validate meal IDs if provided
//       if (updates.mealOptions && updates.mealOptions.length > 0) {
//         const validMeals = await Meal.find({ _id: { $in: updates.mealOptions } });
//         if (validMeals.length !== updates.mealOptions.length) {
//           throw new Error('One or more meal IDs are invalid');
//         }
//       }

//       const updatedSchool = await School.findByIdAndUpdate(
//         id,
//         updates,
//         { new: true }
//       ).populate('mealOptions');
      
//       if (!updatedSchool) {
//         throw new Error('School not found');
//       }
      
//       // Notify all admins about the school update
//       socket.to('admin-room').emit('school-updated', updatedSchool);
      
//       // Send success response to the sender
//       socket.emit('school-updated-success', updatedSchool);
//     } catch (error) {
//       console.error('Error updating school:', error);
//       socket.emit('school-update-error', { message: error.message });
//     }
//   });

//   // Add meal to school
//   socket.on('add-meal-to-school', async (data) => {
//     try {
//       const { schoolId, mealId } = data;
      
//       // Validate meal exists
//       const meal = await Meal.findById(mealId);
//       if (!meal) {
//         throw new Error('Meal not found');
//       }
      
//       const school = await School.findById(schoolId);
//       if (!school) {
//         throw new Error('School not found');
//       }
      
//       // Check if meal already exists to avoid duplicates
//       if (!school.mealOptions.includes(mealId)) {
//         school.mealOptions.push(mealId);
//         await school.save();
//       }
      
//       const populatedSchool = await School.findById(schoolId).populate('mealOptions');
      
//       socket.emit('meal-added-to-school', populatedSchool);
//       socket.to('admin-room').emit('school-meals-updated', populatedSchool);
//     } catch (error) {
//       console.error('Error adding meal to school:', error);
//       socket.emit('add-meal-error', { message: error.message });
//     }
//   });

//   // Remove meal from school
//   socket.on('remove-meal-from-school', async (data) => {
//     try {
//       const { schoolId, mealId } = data;
      
//       const school = await School.findById(schoolId);
//       if (!school) {
//         throw new Error('School not found');
//       }
      
//       school.mealOptions = school.mealOptions.filter(
//         id => id.toString() !== mealId
//       );
      
//       await school.save();
//       const populatedSchool = await School.findById(schoolId).populate('mealOptions');
      
//       socket.emit('meal-removed-from-school', populatedSchool);
//       socket.to('admin-room').emit('school-meals-updated', populatedSchool);
//     } catch (error) {
//       console.error('Error removing meal from school:', error);
//       socket.emit('remove-meal-error', { message: error.message });
//     }
//   });
// };

// export default SchoolHandler;













import School from '../models/School.js';
import Meal from '../models/Meal.js';

const SchoolHandler = (socket, messageProducer, connectedAdmins) => {
  // Handle school creation with meal references
  socket.on('create-school', async (schoolData) => {
    try {
      // Validate meal IDs if provided
      if (schoolData.mealOptions && schoolData.mealOptions.length > 0) {
        const validMeals = await Meal.find({ _id: { $in: schoolData.mealOptions } });
        if (validMeals.length !== schoolData.mealOptions.length) {
          throw new Error('One or more meal IDs are invalid');
        }
      }

      const newSchool = new School(schoolData);
      await newSchool.save();
      
      // Populate meal data before emitting
      const populatedSchool = await School.findById(newSchool._id).populate('mealOptions');
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishSchoolEvent('school_created', {
        school: populatedSchool,
        createdBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('school-created-success', populatedSchool);
    } catch (error) {
      console.error('Error creating school:', error);
      socket.emit('school-creation-error', { message: error.message });
    }
  });

  // Handle school updates with meal references
  socket.on('update-school', async (updateData) => {
    try {
      const { id, updates } = updateData;
      
      // Validate meal IDs if provided
      if (updates.mealOptions && updates.mealOptions.length > 0) {
        const validMeals = await Meal.find({ _id: { $in: updates.mealOptions } });
        if (validMeals.length !== updates.mealOptions.length) {
          throw new Error('One or more meal IDs are invalid');
        }
      }

      const updatedSchool = await School.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      ).populate('mealOptions');
      
      if (!updatedSchool) {
        throw new Error('School not found');
      }
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishSchoolEvent('school_updated', {
        school: updatedSchool,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('school-updated-success', updatedSchool);
    } catch (error) {
      console.error('Error updating school:', error);
      socket.emit('school-update-error', { message: error.message });
    }
  });

  // Add meal to school
  socket.on('add-meal-to-school', async (data) => {
    try {
      const { schoolId, mealId } = data;
      
      // Validate meal exists
      const meal = await Meal.findById(mealId);
      if (!meal) {
        throw new Error('Meal not found');
      }
      
      const school = await School.findById(schoolId);
      if (!school) {
        throw new Error('School not found');
      }
      
      // Check if meal already exists to avoid duplicates
      if (!school.mealOptions.includes(mealId)) {
        school.mealOptions.push(mealId);
        await school.save();
      }
      
      const populatedSchool = await School.findById(schoolId).populate('mealOptions');
      
      // Publish to RabbitMQ
      await messageProducer.publishSchoolEvent('meal_added_to_school', {
        school: populatedSchool,
        mealId: mealId,
        addedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meal-added-to-school', populatedSchool);
    } catch (error) {
      console.error('Error adding meal to school:', error);
      socket.emit('add-meal-error', { message: error.message });
    }
  });

  // Remove meal from school
  socket.on('remove-meal-from-school', async (data) => {
    try {
      const { schoolId, mealId } = data;
      
      const school = await School.findById(schoolId);
      if (!school) {
        throw new Error('School not found');
      }
      
      school.mealOptions = school.mealOptions.filter(
        id => id.toString() !== mealId
      );
      
      await school.save();
      const populatedSchool = await School.findById(schoolId).populate('mealOptions');
      
      // Publish to RabbitMQ
      await messageProducer.publishSchoolEvent('meal_removed_from_school', {
        school: populatedSchool,
        mealId: mealId,
        removedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('meal-removed-from-school', populatedSchool);
    } catch (error) {
      console.error('Error removing meal from school:', error);
      socket.emit('remove-meal-error', { message: error.message });
    }
  });

  // Join school room for real-time updates
  socket.on('join-school-room', (schoolId) => {
    socket.join(`school-${schoolId}`);
  });

  // Leave school room
  socket.on('leave-school-room', (schoolId) => {
    socket.leave(`school-${schoolId}`);
  });
};

export default SchoolHandler;