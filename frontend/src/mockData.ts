import type { Task } from './types/index';

export const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Design Database Schema',
    description: 'Create initial MongoDB schema layout with Mongoose models.',
    status: 'TODO',
    priority: 'HIGH',
    component: 'DATABASE',
    assignee: 'Pravallika',
    dueDate: '2026-07-01', 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Setup Express API Pipelines',
    description: 'Configure initial web service routers and server ports.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    component: 'BACKEND',
    assignee: 'Pravallika',
    dueDate: '2026-06-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];