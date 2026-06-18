// TaskCard.tsx
import React from 'react';
import type { Task } from '../../types';
import { AlertCircle, Code, Database, Terminal, Calendar, User, Trash2 } from 'lucide-react';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onCardClick: (task: Task) => void;
  onCardDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onCardClick, onCardDelete }) => {
  
  // 1. Drag initiation handler
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task._id);
    e.dataTransfer.effectAllowed = 'move';
  };

  // 2. Isolated deletion click handler
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // <-- CRITICAL: Stops the click from bubbling up to the main card onClick!
    
    if (window.confirm(`Are you sure you want to permanently delete: "${task.title}"?`)) {
      onCardDelete(task._id);
    }
  };

  // UI styling decorators
  const getPriorityColor = (prio: string) => {
    switch (prio) {
      case 'CRITICAL': return { bg: '#fef2f2', text: '#991b1b', border: '#fca5a5' };
      case 'HIGH': return { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' };
      case 'MEDIUM': return { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' };
      default: return { bg: '#f8fafc', text: '#475569', border: '#cbd5e1' };
    }
  };

  const getComponentBadge = (comp: string) => {
    switch (comp) {
      case 'FRONTEND': return { label: 'FE Layer', icon: <Code size={12} />, color: '#4f46e5' };
      case 'BACKEND': return { label: 'BE Core', icon: <Terminal size={12} />, color: '#0ea5e9' };
      case 'DATABASE': return { label: 'DB Cluster', icon: <Database size={12} />, color: '#10b981' };
      default: return { label: 'DevOps/Infra', icon: <AlertCircle size={12} />, color: '#f59e0b' };
    }
  };

  const getDateUrgencyClass = (dateString: string, status: string): string => {
    if (status === 'DONE' || !dateString) return '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'date-overdue';
    if (diffDays <= 1) return 'date-urgent';
    return '';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const prioStyle = getPriorityColor(task.priority);
  const compBadge = getComponentBadge(task.component);
  const dateUrgencyClass = getDateUrgencyClass(task.dueDate, task.status);

  return (
    <div 
      className="task-card" 
      draggable 
      onDragStart={handleDragStart} 
      onClick={() => onCardClick(task)} // <-- Trigger Edit Modal when clicking body
    >
      <div className="card-top-row">
        <div className="component-tag" style={{ color: compBadge.color }}>
          {compBadge.icon}
          <span>{compBadge.label}</span>
        </div>
        
        {/* Right side controls block */}
        <div className="card-header-right-cluster">
          <span className="priority-badge" style={{ backgroundColor: prioStyle.bg, color: prioStyle.text, border: `1px solid ${prioStyle.border}` }}>
            {task.priority}
          </span>
          <button className="btn-card-delete" onClick={handleDeleteClick}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <h4 className="task-card-title">{task.title}</h4>
      {task.description && <p className="task-card-desc">{task.description}</p>}

      <div className="card-metadata-footer">
        <div className="metadata-item">
          <User size={13} />
          <span>{task.assignee}</span>
        </div>
        <div className={`metadata-item ${dateUrgencyClass}`}>
          <Calendar size={13} />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>
    </div>
  );
};