import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware Configuration
// ==========================================
// Enable Cross-Origin Resource Sharing (CORS) for frontend requests
app.use(cors());
// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json());

// ==========================================
// API Routes
// ==========================================
// Mount authentication-related routes
app.use('/api/auth', authRoutes);
// Mount bookmark-related routes (protected by authMiddleware)
app.use('/api/bookmarks', bookmarkRoutes);

// ==========================================
// Database Connection & Server Initialization
// ==========================================
// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start the server only after a successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
