import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';  // Importing body for validation
import User from '../models/User.js';  // Ensure this is the correct path for your User model
import jst from 'jsonwebtoken';
import fetchUser from '../middleware/fetchuser.js';

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


// Route 2 : Authenticate a user  /api/auth/login create the user 
router.post(
  '/login',
  // Validate request body
  body('email' ,'Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Send error response with validation messages
    }

    const {email,password} = req.body;
    try {
      const user = await User.findOne({email});
      if(!user)
      {
        return res.status(400).json({error:"Please try to login with valid credentials"});
      }
      const ispassword = await bcrypt.compare(password,user.password);
      if(!ispassword)
      {
        return res.status(400).json({error:"Please try to login with valid credentials"});
      }
      const data = {
        user : {
          id:
          user.id
        }
      }
      // Save the user
      const authToken = jst.sign(data,JST_SECRET);

      res.status(201).json({authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
    
  });

  // Route 3 : Get user details /api/auth/getuser The user 
  router.post('/getuser', fetchUser, async (req, res) => {
    try {
      // Fetch userId from the middleware
      const userId = req.user.id;
  
      // Find the user by ID and exclude the password field
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
export default router;
