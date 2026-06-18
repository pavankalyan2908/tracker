import React from 'react';
import type { Task } from '../../types';
import { AlertCircle, Code, Database, Terminal, Clock, User } from 'lucide-react';
import './TaskCard.css'; // <-- Importing our clean styles!

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Map tech components to corresponding icons and custom CSS class modifiers
  const getComponentConfig = (component: Task['component']) => {
    switch (component) {
      case 'FRONTEND': return { className: 'comp-frontend', icon: Code };
      case 'BACKEND': return { className: 'comp-backend', icon: Terminal };
      case 'DATABASE': return { className: 'comp-database', icon: Database };
      case 'DEVOPS': return { className: 'comp-devops', icon: AlertCircle };
    }
  };

  const priorityClassMap: Record<Task['priority'], string> = {
    CRITICAL: 'priority-critical',
    HIGH: 'priority-high',
    MEDIUM: 'priority-medium',
    LOW: 'priority-low'
  };

  const config = getComponentConfig(task.component);
  const ComponentIcon = config.icon;

  return (
    <div className="task-card">
      {/* Top Metadata Row */}
      <div className="task-card-header">
        <span className={`component-badge ${config.className}`}>
          <ComponentIcon size={12} />
          {task.component}
        </span>
        <span className={`priority-tag ${priorityClassMap[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Task Content */}
      <h4 className="task-card-title">{task.title}</h4>
      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      {/* Bottom Information Footer */}
      <div className="task-card-footer">
        <div className="assignee-wrapper">
          <div className="avatar-circle">
            <User size={10} />
          </div>
          <span className="assignee-name">{task.assignee}</span>
        </div>

        <div className="estimation-wrapper">
          <Clock size={12} />
          <span>{task.estimatedHours}h</span>
        </div>
      </div>
    </div>
  );
};