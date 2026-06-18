// TaskBoard.tsx
import React from 'react';
import type { Task, TaskStatus } from '../../types';
import { TaskColumn } from '../TaskColumn/TaskColumn';
import './TaskBoard.css';

interface TaskBoardProps {
  tasks: Task[];
}

// Explicitly defining our canonical workflow order
const COLUMNS: { title: string; status: TaskStatus }[] = [
  { title: 'Backlog', status: 'BACKLOG' },
  { title: 'To Do', status: 'TODO' },
  { title: 'In Progress', status: 'IN_PROGRESS' },
  { title: 'In Review', status: 'IN_REVIEW' },
  { title: 'Done', status: 'DONE' },
];

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  return (
    <div className="task-board-container">
      {/* Board Layout Header */}
      <div className="board-header">
        <h1 className="board-title">Development Sprint Board</h1>
        <p className="board-subtitle">Track, manage, and accelerate engineering velocity.</p>
      </div>

      {/* Kanban Column Track */}
      <div className="columns-track">
        {COLUMNS.map((column) => {
          // Filter out the items belonging explicitly to this lifecycle bucket
          const filteredTasks = tasks.filter((task) => task.status === column.status);
          
          return (
            <TaskColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={filteredTasks}
            />
          );
        })}
      </div>
    </div>
  );
};