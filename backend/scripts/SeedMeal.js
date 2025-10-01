// scripts/SeedMeal.js
import mongoose from 'mongoose';
import Meal from '../models/Meal.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleMeals = [
  { 
    name: "Classic Chicken Biryani", 
    image: "https://images.unsplash.com/photo-1563379091339-03246963d9c6?w=500&h=300&fit=crop", 
    description: "Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and fresh herbs",
    nutrition: {
      calories: 450,
      protein: 25,
      carbs: 60,
      fat: 12
    },
    allergens: ["gluten"],
    price: 320,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 35
  },
  { 
    name: "Paneer Butter Masala", 
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop", 
    description: "Soft paneer cubes in a rich, creamy tomato-based gravy with butter and spices",
    nutrition: {
      calories: 380,
      protein: 18,
      carbs: 22,
      fat: 25
    },
    allergens: ["dairy", "nuts"],
    price: 280,
    isAvailable: true,
    category: "vegetarian",
    preparationTime: 25
  },
  { 
    name: "Vegan Buddha Bowl", 
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop", 
    description: "Nutritious bowl with quinoa, roasted vegetables, avocado, and tahini dressing",
    nutrition: {
      calories: 420,
      protein: 15,
      carbs: 55,
      fat: 18
    },
    allergens: [],
    price: 220,
    isAvailable: true,
    category: "vegan",
    preparationTime: 20
  },
  { 
    name: "Grilled Salmon with Asparagus", 
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=300&fit=crop", 
    description: "Fresh salmon fillet grilled to perfection with roasted asparagus and lemon butter sauce",
    nutrition: {
      calories: 350,
      protein: 30,
      carbs: 8,
      fat: 22
    },
    allergens: ["fish"],
    price: 450,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 30
  },
  { 
    name: "Keto Chicken Caesar Salad", 
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=300&fit=crop", 
    description: "Crisp romaine lettuce with grilled chicken, parmesan, and keto-friendly caesar dressing",
    nutrition: {
      calories: 320,
      protein: 28,
      carbs: 6,
      fat: 20
    },
    allergens: ["dairy", "eggs"],
    price: 260,
    isAvailable: true,
    category: "keto",
    preparationTime: 15
  },
  { 
    name: "Masala Dosa with Sambhar", 
    image: "https://images.unsplash.com/photo-1589301760014-d929f4e030ed?w=500&h=300&fit=crop", 
    description: "Crispy rice crepe filled with spiced potatoes, served with lentil soup and chutney",
    nutrition: {
      calories: 280,
      protein: 12,
      carbs: 45,
      fat: 8
    },
    allergens: [],
    price: 150,
    isAvailable: true,
    category: "vegetarian",
    preparationTime: 20
  },
  { 
    name: "Gluten-Free Margherita Pizza", 
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=300&fit=crop", 
    description: "Thin crust gluten-free pizza with fresh tomato sauce, mozzarella, and basil",
    nutrition: {
      calories: 320,
      protein: 15,
      carbs: 40,
      fat: 12
    },
    allergens: ["dairy"],
    price: 290,
    isAvailable: true,
    category: "gluten-free",
    preparationTime: 25
  },
  { 
    name: "Butter Chicken", 
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=300&fit=crop", 
    description: "Tender chicken in a smooth, creamy tomato and butter sauce with aromatic spices",
    nutrition: {
      calories: 420,
      protein: 28,
      carbs: 18,
      fat: 25
    },
    allergens: ["dairy", "nuts"],
    price: 340,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 30
  },
  { 
    name: "Vegan Thai Green Curry", 
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=300&fit=crop", 
    description: "Creamy coconut curry with tofu, bamboo shoots, and fresh Thai herbs",
    nutrition: {
      calories: 380,
      protein: 16,
      carbs: 28,
      fat: 22
    },
    allergens: ["soy"],
    price: 270,
    isAvailable: true,
    category: "vegan",
    preparationTime: 25
  },
  { 
    name: "Keto Beef Steak with Broccoli", 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=300&fit=crop", 
    description: "Juicy ribeye steak cooked medium-rare with steamed broccoli and herb butter",
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 8,
      fat: 35
    },
    allergens: [],
    price: 520,
    isAvailable: true,
    category: "keto",
    preparationTime: 20
  },
  { 
    name: "Chole Bhature", 
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=300&fit=crop", 
    description: "Spicy chickpea curry served with fluffy deep-fried bread",
    nutrition: {
      calories: 550,
      protein: 18,
      carbs: 75,
      fat: 20
    },
    allergens: ["gluten"],
    price: 180,
    isAvailable: true,
    category: "vegetarian",
    preparationTime: 30
  },
  { 
    name: "Gluten-Free Pasta Alfredo", 
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=300&fit=crop", 
    description: "Gluten-free pasta in a creamy parmesan sauce with grilled chicken and broccoli",
    nutrition: {
      calories: 380,
      protein: 22,
      carbs: 45,
      fat: 15
    },
    allergens: ["dairy"],
    price: 310,
    isAvailable: true,
    category: "gluten-free",
    preparationTime: 18
  },
  { 
    name: "Tandoori Chicken Platter", 
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&h=300&fit=crop", 
    description: "Marinated chicken cooked in clay oven with mint chutney and onion salad",
    nutrition: {
      calories: 320,
      protein: 35,
      carbs: 5,
      fat: 18
    },
    allergens: ["dairy"],
    price: 380,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 40
  },
  { 
    name: "Vegan Lentil Soup", 
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=300&fit=crop", 
    description: "Hearty lentil soup with vegetables and herbs, perfect for a healthy meal",
    nutrition: {
      calories: 280,
      protein: 16,
      carbs: 40,
      fat: 6
    },
    allergens: [],
    price: 160,
    isAvailable: true,
    category: "vegan",
    preparationTime: 15
  },
  { 
    name: "Keto Avocado Egg Bowl", 
    image: "https://images.unsplash.com/photo-1525353596659-27c0c4704c99?w=500&h=300&fit=crop", 
    description: "Baked avocado filled with eggs, cheese, and bacon - perfect keto breakfast",
    nutrition: {
      calories: 420,
      protein: 20,
      carbs: 8,
      fat: 35
    },
    allergens: ["eggs", "dairy"],
    price: 240,
    isAvailable: true,
    category: "keto",
    preparationTime: 12
  },
  { 
    name: "Vegetable Fried Rice", 
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=300&fit=crop", 
    description: "Stir-fried rice with fresh vegetables, soy sauce, and aromatic seasonings",
    nutrition: {
      calories: 350,
      protein: 12,
      carbs: 60,
      fat: 8
    },
    allergens: ["soy"],
    price: 190,
    isAvailable: true,
    category: "vegetarian",
    preparationTime: 15
  },
  { 
    name: "Fish Tacos", 
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=300&fit=crop", 
    description: "Crispy fish fillets in soft tortillas with cabbage slaw and chipotle mayo",
    nutrition: {
      calories: 380,
      protein: 22,
      carbs: 35,
      fat: 16
    },
    allergens: ["gluten", "fish"],
    price: 290,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 20
  },
  { 
    name: "Gluten-Free Banana Pancakes", 
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop", 
    description: "Fluffy gluten-free pancakes with fresh bananas and maple syrup",
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 45,
      fat: 12
    },
    allergens: ["eggs"],
    price: 210,
    isAvailable: true,
    category: "gluten-free",
    preparationTime: 15
  },
  { 
    name: "Vegan Buddha Roll", 
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop", 
    description: "Fresh spring rolls with tofu, vegetables, and peanut dipping sauce",
    nutrition: {
      calories: 280,
      protein: 14,
      carbs: 35,
      fat: 10
    },
    allergens: ["peanuts", "soy"],
    price: 230,
    isAvailable: true,
    category: "vegan",
    preparationTime: 18
  },
  { 
    name: "Keto Zucchini Noodles", 
    image: "https://images.unsplash.com/photo-1598866592122-6eeaba6c66d2?w=500&h=300&fit=crop", 
    description: "Zucchini noodles with pesto, cherry tomatoes, and parmesan cheese",
    nutrition: {
      calories: 290,
      protein: 12,
      carbs: 10,
      fat: 22
    },
    allergens: ["dairy", "nuts"],
    price: 270,
    isAvailable: true,
    category: "keto",
    preparationTime: 12
  },
  { 
    name: "Mutton Rogan Josh", 
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=300&fit=crop", 
    description: "Kashmiri style lamb curry with aromatic spices and rich gravy",
    nutrition: {
      calories: 480,
      protein: 32,
      carbs: 15,
      fat: 32
    },
    allergens: [],
    price: 420,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 45
  },
  { 
    name: "Palak Paneer", 
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=300&fit=crop", 
    description: "Soft paneer cubes in creamy spinach gravy with Indian spices",
    nutrition: {
      calories: 350,
      protein: 20,
      carbs: 18,
      fat: 22
    },
    allergens: ["dairy"],
    price: 260,
    isAvailable: true,
    category: "vegetarian",
    preparationTime: 25
  },
  { 
    name: "Gluten-Free Quinoa Salad", 
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop", 
    description: "Fresh quinoa salad with vegetables, feta cheese, and lemon vinaigrette",
    nutrition: {
      calories: 310,
      protein: 14,
      carbs: 35,
      fat: 14
    },
    allergens: ["dairy"],
    price: 220,
    isAvailable: true,
    category: "gluten-free",
    preparationTime: 10
  },
  { 
    name: "Vegan Black Bean Burger", 
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=300&fit=crop", 
    description: "Hearty black bean patty with lettuce, tomato, and vegan mayo on whole wheat bun",
    nutrition: {
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 15
    },
    allergens: ["gluten"],
    price: 250,
    isAvailable: true,
    category: "vegan",
    preparationTime: 20
  },
  { 
    name: "Keto Bacon Cheeseburger", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop", 
    description: "Juicy beef patty with bacon, cheese, and special sauce on lettuce wrap",
    nutrition: {
      calories: 520,
      protein: 35,
      carbs: 6,
      fat: 40
    },
    allergens: ["dairy"],
    price: 340,
    isAvailable: true,
    category: "keto",
    preparationTime: 15
  },
  { 
    name: "Vegetable Biryani", 
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=300&fit=crop", 
    description: "Fragrant rice cooked with mixed vegetables and aromatic spices",
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 55,
      fat: 8
    },
    allergens: [],
    price: 200,
    isAvailable: true,
    category: "vegetarian",
    preparationTime: 30
  },
  { 
    name: "Chicken Tikka Masala", 
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=300&fit=crop", 
    description: "Grilled chicken chunks in rich, creamy tomato and spice sauce",
    nutrition: {
      calories: 380,
      protein: 30,
      carbs: 20,
      fat: 22
    },
    allergens: ["dairy"],
    price: 320,
    isAvailable: true,
    category: "non-vegetarian",
    preparationTime: 28
  },
  { 
    name: "Gluten-Free Chocolate Cake", 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop", 
    description: "Rich, moist chocolate cake made with almond flour and dark chocolate",
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 25,
      fat: 18
    },
    allergens: ["eggs", "nuts"],
    price: 180,
    isAvailable: true,
    category: "gluten-free",
    preparationTime: 40
  },
  { 
    name: "Vegan Smoothie Bowl", 
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&h=300&fit=crop", 
    description: "Acai smoothie bowl topped with fresh fruits, granola, and coconut flakes",
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 45,
      fat: 12
    },
    allergens: [],
    price: 190,
    isAvailable: true,
    category: "vegan",
    preparationTime: 8
  },
  { 
    name: "Keto Cauliflower Pizza", 
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=300&fit=crop", 
    description: "Low-carb pizza with cauliflower crust, pepperoni, and mozzarella cheese",
    nutrition: {
      calories: 290,
      protein: 20,
      carbs: 8,
      fat: 20
    },
    allergens: ["dairy"],
    price: 310,
    isAvailable: true,
    category: "keto",
    preparationTime: 22
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Meal.deleteMany({});
    console.log('Cleared existing meals');
    
    // Insert new data
    await Meal.insertMany(sampleMeals);
    console.log(`Added ${sampleMeals.length} sample meals to database`);
    
    // Display some stats
    const totalMeals = await Meal.countDocuments();
    const mealsByCategory = await Meal.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const avgPrice = await Meal.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);
    
    console.log('\nDatabase Statistics:');
    console.log(`Total Meals: ${totalMeals}`);
    console.log(`Average Price: ₹${avgPrice[0]?.avgPrice?.toFixed(2) || 0}`);
    console.log('Meals by Category:');
    mealsByCategory.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();