import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';

const router = Router();

// 1. POST Endpoint: Create a brand new Task/Bug
router.post('/', async (req: Request, res: Response) => {
    try {
      // CHANGE: Replace estimatedHours with dueDate in your destructuring map
      const { title, description, status, priority, component, assignee, dueDate } = req.body;
  
      const newTask = new Task({
        title,
        description,
        status,
        priority,
        component,
        assignee,
        dueDate: new Date(dueDate) // FORCE conversion to a strict BSON Date object for MongoDB
      });
  
      const savedTask = await newTask.save();
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
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Failed to fetch tasks', 
      error: error.message 
    });
  }
});

// NEW 3. PATCH Endpoint: Update a task's status during drag-and-drop
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the task by id and update its status field, returning the updated document
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // new: true returns the modified object instead of the old one
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Failed to update task status', 
      error: error.message 
    });
  }
});

// 4. PUT Endpoint: Update an entire task document (Edit Modal)
router.put('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, status, priority, component, assignee, dueDate } = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
          title,
          description,
          status,
          priority,
          component,
          assignee,
          dueDate: new Date(dueDate)
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(400).json({ 
        message: 'Failed to update task details', 
        error: error.message 
      });
    }
  });

// 5. DELETE Endpoint: Purge a task permanently from the database
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully', id });
    } catch (error: any) {
      res.status(500).json({ 
        message: 'Failed to delete task', 
        error: error.message 
      });
    }
  });
  
export default router;