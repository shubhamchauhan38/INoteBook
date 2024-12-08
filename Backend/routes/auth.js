import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';  // Importing body for validation
import User from '../models/User.js';  // Ensure this is the correct path for your User model
import jst from 'jsonwebtoken';

const router = express.Router();

const JST_SECRET = 'Shubhamisagood$oy';

// Route 1 : /api/auth/create create the user 
router.post(
  '/create',
  // Validate request body
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Send error response with validation messages
    }

    try {
      // If validation passes, create and save user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass, // In a real-world scenario, hash the password before saving
      });
      const data = {
        user : {
          id:
          user.id
        }
      }
      // Save the user
      const authToken = jst.sign(data,JST_SECRET);

      await user.save();
      res.status(201).json({authToken});
    } catch (err) {
      // Handle duplicate email error  or other issues
      if (err.code === 11000) { // MongoDB duplicate key error
        return res.status(400).json({ error: 'Email must be unique' });
      }
      // Other errors
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
