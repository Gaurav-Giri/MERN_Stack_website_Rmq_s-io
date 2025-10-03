// // const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// // const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     default: 'User'
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   phone: {
//    type: String,
//    default: ""
//   },
//   password: {
//     type: String,
//     default: null
//   },


//   role: {
//     type: String,
//     enum: ['user', 'admin', 'vendor'],
//     default: 'user'
//   },


//   otp: {
//     type: String,
//     default: null
//   },
//   otpExpiry: {
//     type: Date,
//     default: null
//   },
//   A: {
//     type: String,
//     default: ""
//   },
//   B: {
//     type: String,
//     default: ""
//   },
//   C: {
//     type: String,
//     default: ""
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Generate and hash OTP
// userSchema.methods.generateOTP = function() {
//   // Generate 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   this.otp = otp;
//   // Set expiry to 5 minutes from now
//   this.otpExpiry = Date.now() + 5 * 60 * 1000;
//   return otp;
// };

// // Clear OTP after verification
// userSchema.methods.clearOTP = function() {
//   this.otp = undefined;
//   this.otpExpiry = undefined;
// };


// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     { 
//       userId: this._id, 
//       email: this.email,
//       role: this.role 
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   );
//   return token;
// };

// const User = mongoose.model('User', userSchema);

// // module.exports = User;
// export default User;




