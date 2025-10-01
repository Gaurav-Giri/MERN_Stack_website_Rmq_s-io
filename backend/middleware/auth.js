import  jwt  from 'jsonwebtoken';
import User from '../models/user.js';
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password -otp -otpExpiry');
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Token is not valid.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      // Check if user has admin role (you'll need to add role field to User model)
      if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Admin required.' });
      }
      next();
    });
  } catch (error) {
    res.status(403).json({ success: false, message: 'Access denied.' });
  }
};

export default { auth, adminAuth };