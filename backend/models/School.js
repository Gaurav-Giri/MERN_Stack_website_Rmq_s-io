// // const mongoose = require('mongoose');
// import mongoose, { SchemaTypeOptions } from 'mongoose';
// const schoolSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['Public', 'Private', 'International','Government'],
//     required: true
//   },
//   mealOptions: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   image: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const School = mongoose.model('School', schoolSchema);

// export default School;





import mongoose from 'mongoose';
// import Meal from './Meal.js'
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Public', 'Private', 'International', 'Government'],
    required: true
  },
  mealOptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal', // Reference to the Meal model
  }],
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Virtual to get the count of meal options (replaces the old number functionality)
schoolSchema.virtual('mealOptionsCount').get(function() {
  return this.mealOptions.length;
});

// Index for better query performance when populating meals
schoolSchema.index({ mealOptions: 1 });

const School = mongoose.model('School', schoolSchema);

export default School;