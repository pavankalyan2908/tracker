// TaskBoard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Filter } from 'lucide-react';
import type { Task, TaskStatus } from '../../types';
import { TaskColumn } from '../TaskColumn/TaskColumn';
import { CreateTaskModal } from '../CreateTaskModal/CreateTaskModal';
import './TaskBoard.css';

interface TaskBoardProps {
  tasks: Task[];
}

const COLUMNS: { title: string; status: TaskStatus }[] = [
  { title: 'Backlog', status: 'BACKLOG' },
  { title: 'To Do', status: 'TODO' },
  { title: 'In Progress', status: 'IN_PROGRESS' },
  { title: 'In Review', status: 'IN_REVIEW' },
  { title: 'Done', status: 'DONE' },
];

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('ALL');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // Handle saving new tasks or updates to existing tasks
  const handleTaskSaved = (savedTask: Task) => {
    setTasks((prevTasks) => {
      const exists = prevTasks.some(t => t._id === savedTask._id);
      if (exists) {
        return prevTasks.map(t => t._id === savedTask._id ? savedTask : t);
      }
      return [...prevTasks, savedTask];
    });
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null); 
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task); 
    setIsModalOpen(true);
  };

  // Drag and Drop Status Update Handler
  const handleTaskDrop = async (taskId: string, targetStatus: TaskStatus) => {
    const originalTasks = [...tasks];
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === taskId ? { ...t, status: targetStatus } : t))
    );

    try {
      const { taskService } = await import('../../services/api');
      await taskService.updateTaskStatus(taskId, targetStatus);
    } catch (err) {
      console.error('Failed to sync drag-and-drop state on server:', err);
      setTasks(originalTasks);
    }
  };

  // Permanent Task Deletion Handler
  const handleTaskDelete = async (taskId: string) => {
    const originalTasks = [...tasks];
    setTasks((prevTasks) => prevTasks.filter(t => t._id !== taskId));

    try {
      const { taskService } = await import('../../services/api');
      await taskService.deleteTask(taskId);
    } catch (err) {
      console.error('Server failure during card purging:', err);
      alert('Could not remove task from server. Rolling layout back.');
      setTasks(originalTasks);
    }
  };

  // Memoized filter lists to avoid extra layout calculation lag
  const uniqueAssignees = useMemo(() => {
    return Array.from(new Set(tasks.map((task) => task.assignee).filter(Boolean)));
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    return selectedAssignee === 'ALL' 
      ? tasks 
      : tasks.filter(task => task.assignee === selectedAssignee);
  }, [tasks, selectedAssignee]);

  return (
    <div className="task-board-container">
      <div className="board-header board-header-flex-wrapper">
        <div>
          <h1 className="board-title">Development Sprint Board</h1>
          <p className="board-subtitle">Track, manage, and accelerate engineering velocity.</p>
        </div>
        
        <div className="board-actions-cluster">
          <div className="assignee-filter-wrapper">
            <Filter size={14} />
            <select 
              className="assignee-filter-select"
              value={selectedAssignee} 
              onChange={(e) => setSelectedAssignee(e.target.value)}
            >
              <option value="ALL">All Assignees</option>
              {uniqueAssignees.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <button className="btn-create-trigger" onClick={handleOpenCreateModal}>
            <Plus size={16} />
            Create Task
          </button>
        </div>
      </div>

      <div className="columns-track">
        {COLUMNS.map((column) => {
          const filteredTasks = visibleTasks.filter((task) => task.status === column.status);
          return (
            <TaskColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={filteredTasks}
              onTaskDrop={handleTaskDrop}
              onCardClick={handleOpenEditModal}
              onCardDelete={handleTaskDelete}
            />
          );
        })}
      </div>

      <CreateTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskSaved}
        taskToEdit={editingTask}
      />
    </div>
  );
};