// const User = require('../models/user');
import User from '../models/user.js';
// const { sendOTPEmail } = require('../utils/mailer');
import  sendOTPEmail  from '../utils/mailer.js';
// Send OTP to user's email
const sendOTP = async (req, res) => {
  try {
    const { email} = req.body;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    // Generate and save OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send OTP email' 
      });
    }

    res.json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Error in sendOTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};




// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if OTP exists and is not expired
    if (!user.otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP expired or invalid' 
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }

    // ✅ Clear OTP before sending response
    user.clearOTP();
    await user.save();

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send response once
    res.json({ 
      success: true, 
      message: 'OTP verified successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      },
      requiresDetails: !user.name || !user.phone
    });

  } catch (error) {
    console.error('Error in verifyOTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};



// =========================
// Update user profile details (name, phone)
// =========================
const updateUserDetails = async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { name: name || "User", phone: phone || "" },
      { new: true }
    ).select("email name phone");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User details updated", user });
  } catch (error) {
    console.error("Error in updateUserDetails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// =========================
// Get user data (A, B, C)
// =========================
const getUserData = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const user = await User.findOne({ email }).select("email name A B C");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in getUserData:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// =========================
// Save/update user data (A, B, C)
// =========================
const saveUserData = async (req, res) => {
  try {
    const { email, A, B, C } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { A: A || "", B: B || "", C: C || "" },
      { new: true }
    ).select("email name A B C");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User data updated", user });
  } catch (error) {
    console.error("Error in saveUserData:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export default {sendOTP, verifyOTP, updateUserDetails, getUserData, saveUserData};
