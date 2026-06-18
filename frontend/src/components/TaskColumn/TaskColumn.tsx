// TaskColumn.tsx
import React, { useState } from 'react';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';
import './TaskColumn.css';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskDrop: (taskId: string, targetStatus: TaskStatus) => void;
  onCardClick: (task: Task) => void;
  onCardDelete: (taskId: string) => void; // <-- Prop routed to card top row
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, 
  status, 
  tasks, 
  onTaskDrop, 
  onCardClick, 
  onCardDelete 
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false); 
    
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onTaskDrop(taskId, status);
    }
  };

  return (
    <div 
      className={`task-column ${isDragOver ? 'column-dragged-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="column-header">
        <div className="column-title-wrapper">
          <h3 className="column-title">{title}</h3>
          <span className="task-count-badge">{tasks.length}</span>
        </div>
      </div>

      {/* Stretchable Drop Container Layer */}
      <div className="task-list-container">
        {tasks.map((task) => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onCardClick={onCardClick}
            onCardDelete={onCardDelete} // <-- Fed down straight to card top row
          />
        ))}
      </div>
    </div>
  );
};