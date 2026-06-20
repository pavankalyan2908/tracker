import axios from 'axios';
import type { Task, TaskStatus } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  },

  createTask: async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', taskData);
    return response.data;
  },

  // NEW: Update a task's status via a PATCH request when dragged and dropped
  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${taskId}`, { status });
    return response.data;
  },

  // Send a PUT request to update full task details from the edit modal
  updateTaskDetails: async (taskId: string, taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Send a DELETE network call to strip a card out of MongoDB completely
  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}`);
  }
};