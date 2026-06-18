// TaskColumn.tsx
import React from 'react';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';
import './TaskColumn.css';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks }) => {
  return (
    <div className="task-column">
      {/* Column Header */}
      <div className="column-header">
        <div className="column-title-wrapper">
          <h3 className="column-title">{title}</h3>
          <span className="task-count-badge">{tasks.length}</span>
        </div>
      </div>

      {/* Scrollable List of Cards */}
      <div className="task-list-container">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};