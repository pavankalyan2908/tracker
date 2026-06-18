import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';

const router = Router();

// 1. POST Endpoint: Create a brand new Task/Bug
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, component, assignee, estimatedHours } = req.body;

    // Create a new instance of our Task model with incoming data
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      component,
      assignee,
      estimatedHours
    });

    // Save it directly to MongoDB Atlas
    const savedTask = await newTask.save();
    
    // Respond back with the saved data and a 211 Created status code
    res.status(201).json(savedTask);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Failed to create task', 
      error: error.message 
    });
  }
});

// 2. GET Endpoint: Fetch all Tasks/Bugs from the database
router.get('/', async (req: Request, res: Response) => {
  try {
    // Look up all documents inside the 'tasks' collection, sorting by latest first
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Failed to fetch tasks', 
      error: error.message 
    });
  }
});

export default router;