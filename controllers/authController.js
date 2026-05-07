import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param {Object} req - Express request object containing firstName, lastName, email, password, profileImage
 * @param {Object} res - Express response object
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profileImage } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password securely with a salt round of 12
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create the new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token valid for 7 days
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Respond with user data (excluding password) and the token
    res.status(201).json({ 
      user: { firstName, lastName, email, profileImage, id: newUser._id }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
};

/**
 * Login an existing user
 * @route POST /api/auth/login
 * @param {Object} req - Express request object containing email and password
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token valid for 7 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Respond with user data and the token
    res.status(200).json({ 
      user: { 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        profileImage: user.profileImage, 
        id: user._id 
      }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};
