export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskComponent = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  component: TaskComponent;
  assignee: string;
  estimatedHours: number;
  createdAt: string;
  updatedAt: string;
}