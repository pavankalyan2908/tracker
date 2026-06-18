import { Schema, model, Document } from 'mongoose';

// This defines what data our TypeScript code expects
export interface ITask extends Document {
  title: string;
  description: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  component: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS';
  assignee: string;
  estimatedHours: number;
}

// This tells MongoDB exactly how to validate data before saving it
const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'], default: 'TODO' },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
    component: { type: String, enum: ['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS'], required: true },
    assignee: { type: String, default: 'Unassigned' },
    estimatedHours: { type: Number, default: 1 }
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

export const Task = model<ITask>('Task', taskSchema);