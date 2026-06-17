import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in the .env file!');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('🍃 Connected seamlessly to MongoDB Atlas Cloud Database');
  })
  .catch((error) => {
    console.error('❌ MongoDB database connection error:', error);
  });

// Simple Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    message: 'Backend server is running perfectly!' 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is humming happily on http://localhost:${PORT}`);
});