// Workspace.tsx
import React, { useEffect, useState } from 'react';
import { TaskBoard } from '../TaskBoard/TaskBoard';
import { taskService } from '../../services/api';
import type { Task } from '../../types';

export const Workspace: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getAllTasks();
        setTasks(data);
      } catch (err: any) {
        console.error('Failed to fetch tasks:', err);
        setError('Could not connect to the backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveTasks();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#64748b' }}>
        <h3>Loading your Sprint workspace...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#dc2626' }}>
        <h3>⚠️ {error}</h3>
      </div>
    );
  }

  return <TaskBoard tasks={tasks} />;
};