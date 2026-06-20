import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
    default: 'TODO'
  },
  priority: { 
    type: String, 
    required: true, 
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM'
  },
  component: { 
    type: String, 
    required: true, 
    enum: ['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS'],
    default: 'FRONTEND'
  },
  assignee: { type: String, required: true, trim: true },
  dueDate: { type: Date, required: true } // <-- CHANGED: Replaced estimatedHours with Date
}, {
  timestamps: true
});

export const Task = model('Task', taskSchema);