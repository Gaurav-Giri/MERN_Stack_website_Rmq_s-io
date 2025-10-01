// const express = require('express');
import express from 'express';
const router = express.Router();

// const authController = require('../controllers/authController');
import authController from '../controllers/authController.js';
// Send OTP route
router.post('/send-otp', authController.sendOTP);

// Verify OTP route
router.post('/verify-otp', authController.verifyOTP);
router.post('/update-details', authController.updateUserDetails);
// User data (A, B, C)
router.get("/user-data", authController.getUserData);
router.post("/save-user-data", authController.saveUserData);

// module.exports = router;
export default router;
