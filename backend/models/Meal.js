import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  protein: {
    type: Number,
    required: true,
    min: 0
  },
  carbs: {
    type: Number,
    required: true,
    min: 0
  },
  fat: {
    type: Number,
    required: true,
    min: 0
  }
});

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    trim: true,
    maxLength: [100, 'Meal name cannot exceed 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Meal image is required'],
    validate: {
      validator: function(v) {
        // More flexible URL validation that accepts Unsplash URLs and others
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))|(https?:\/\/images\.unsplash\.com\/.*)|(https?:\/\/.*\.(?:svg|bmp|tiff))$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  description: {
    type: String,
    required: [true, 'Meal description is required'],
    trim: true,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  nutrition: {
    type: nutritionSchema,
    required: [true, 'Nutrition information is required']
  },
  allergens: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        // Optional: validate allergen values if you have a predefined list
        const validAllergens = [
          'gluten', 'dairy', 'nuts', 'peanuts', 'soy', 'eggs', 
          'fish', 'shellfish', 'sesame', 'mustard', 'celery', 
          'lupin', 'molluscs', 'sulphites'
        ];
        return v.every(allergen => validAllergens.includes(allergen.toLowerCase()));
      },
      message: 'Contains invalid allergen values'
    }
  },
  price: {
    type: Number,
    required: [true, 'Meal price is required'],
    min: [0, 'Price cannot be negative']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'gluten-free', 'keto'],
    default: 'non-vegetarian'
  },
  preparationTime: {
    type: Number, // in minutes
    required: true,
    min: [0, 'Preparation time cannot be negative']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for better query performance
MealSchema.index({ name: 'text', description: 'text' });
MealSchema.index({ category: 1 });
MealSchema.index({ price: 1 });
MealSchema.index({ 'nutrition.calories': 1 });

// Virtual for formatted price
MealSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}`;
});

// Instance method to check if meal contains specific allergen
MealSchema.methods.containsAllergen = function(allergen) {
  return this.allergens.map(a => a.toLowerCase()).includes(allergen.toLowerCase());
};

// Static method to find meals by calorie range
MealSchema.statics.findByCalorieRange = function(min, max) {
  return this.find({
    'nutrition.calories': { $gte: min, $lte: max }
  });
};

// Static method to find available meals
MealSchema.statics.findAvailable = function() {
  return this.find({ isAvailable: true });
};

const Meal = mongoose.model('Meal', MealSchema);

export default Meal;