import type { Task } from './types';

export const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Set up JWT authentication middleware',
    description: 'Implement secure route guard protection and token refreshing logic.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    component: 'BACKEND',
    assignee: 'Pravallika',
    estimatedHours: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Set up JWT authentication middleware',
    description: 'Implement secure route guard protection and token refreshing logic.',
    status: 'TODO',
    priority: 'CRITICAL',
    component: 'BACKEND',
    assignee: 'Pravallika',
    estimatedHours: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Design Kanban Columns layout grid',
    description: 'Build responsive grid structure using CSS Flexbox/Grid for task states.',
    status: 'TODO',
    priority: 'HIGH',
    component: 'FRONTEND',
    assignee: 'Vamsi',
    estimatedHours: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Optimize indexing on Task status field',
    description: 'Create compound database indices to ensure fast queries for dashboards.',
    status: 'DONE',
    priority: 'MEDIUM',
    component: 'DATABASE',
    assignee: 'Pravallika',
    estimatedHours: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];