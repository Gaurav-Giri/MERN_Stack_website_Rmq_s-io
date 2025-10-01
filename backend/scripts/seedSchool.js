// scripts/seedSchools.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// const School = require('../models/School');
import School from '../models/School.js';

import dotenv from 'dotenv';
dotenv.config();



const dummySchools = [
  { 
    name: "Green Valley International School", 
    location: "New Delhi", 
    type: "Public",
    mealOptions: 12,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Sunrise Academy", 
    location: "Mumbai", 
    type: "Private",
    mealOptions: 8,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Delhi Public School", 
    location: "New Delhi", 
    type: "Public",
    mealOptions: 15,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "St. Xavier's High School", 
    location: "Mumbai", 
    type: "Private",
    mealOptions: 10,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Kendriya Vidyalaya", 
    location: "Bangalore", 
    type: "Government",
    mealOptions: 6,
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Bangalore International School", 
    location: "Bangalore", 
    type: "International",
    mealOptions: 18,
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Chennai Public School", 
    location: "Chennai", 
    type: "Public",
    mealOptions: 9,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "St. Mary's Convent", 
    location: "Kolkata", 
    type: "Private",
    mealOptions: 7,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Hyderabad Central School", 
    location: "Hyderabad", 
    type: "Public",
    mealOptions: 11,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Pune International Academy", 
    location: "Pune", 
    type: "International",
    mealOptions: 14,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Jaipur Public School", 
    location: "Jaipur", 
    type: "Public",
    mealOptions: 8,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Ahmedabad Grammar School", 
    location: "Ahmedabad", 
    type: "Private",
    mealOptions: 13,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Lucknow Model School", 
    location: "Lucknow", 
    type: "Government",
    mealOptions: 5,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Chandigarh International", 
    location: "Chandigarh", 
    type: "International",
    mealOptions: 16,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Kochi Public School", 
    location: "Kochi", 
    type: "Public",
    mealOptions: 10,
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Bhopal Central Academy", 
    location: "Bhopal", 
    type: "Private",
    mealOptions: 9,
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Nagpur Public School", 
    location: "Nagpur", 
    type: "Public",
    mealOptions: 7,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Surat International School", 
    location: "Surat", 
    type: "International",
    mealOptions: 15,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Indore Model School", 
    location: "Indore", 
    type: "Government",
    mealOptions: 6,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Goa International Academy", 
    location: "Goa", 
    type: "International",
    mealOptions: 12,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Dehradun Public School", 
    location: "Dehradun", 
    type: "Public",
    mealOptions: 8,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Amritsar Central School", 
    location: "Amritsar", 
    type: "Private",
    mealOptions: 11,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Guwahati Model School", 
    location: "Guwahati", 
    type: "Government",
    mealOptions: 5,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Bhubaneswar International", 
    location: "Bhubaneswar", 
    type: "International",
    mealOptions: 14,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Patna Central School", 
    location: "Patna", 
    type: "Public",
    mealOptions: 9,
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Raipur Public School", 
    location: "Raipur", 
    type: "Public",
    mealOptions: 7,
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Ranchi Model School", 
    location: "Ranchi", 
    type: "Government",
    mealOptions: 6,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Varanasi International", 
    location: "Varanasi", 
    type: "International",
    mealOptions: 13,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Allahabad Public School", 
    location: "Allahabad", 
    type: "Public",
    mealOptions: 8,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  { 
    name: "Kanpur Central School", 
    location: "Kanpur", 
    type: "Private",
    mealOptions: 10,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await School.deleteMany({});
    console.log('Cleared existing schools');
    
    // Insert new data
    await School.insertMany(dummySchools);
    console.log(`Added ${dummySchools.length} dummy schools to database`);
    
    // Display some stats
    const totalSchools = await School.countDocuments();
    const schoolsByType = await School.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    console.log('\nDatabase Statistics:');
    console.log(`Total Schools: ${totalSchools}`);
    console.log('Schools by Type:');
    schoolsByType.forEach(type => {
      console.log(`  ${type._id}: ${type.count}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();