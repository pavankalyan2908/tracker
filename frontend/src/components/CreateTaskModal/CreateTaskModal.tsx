// CreateTaskModal.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Task, TaskPriority, TaskComponent } from '../../types';
import './CreateTaskModal.css';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (newTask: Task) => void;
  taskToEdit?: Task | null; // NEW: Holds the card data if we are editing
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onTaskCreated, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [component, setComponent] = useState<TaskComponent>('FRONTEND');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState<string>('');

  // Sync and pre-fill form fields if taskToEdit changes or is passed down
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setComponent(taskToEdit.component);
      setPriority(taskToEdit.priority);
      setAssignee(taskToEdit.assignee);
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
    } else {
      // Clear fields for a brand new task
      setTitle('');
      setDescription('');
      setComponent('FRONTEND');
      setPriority('MEDIUM');
      setAssignee('');
      setDueDate(new Date().toISOString().split('T')[0]);
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assignee.trim() || !dueDate) return;

    try {
      const { taskService } = await import('../../services/api');
      
      if (taskToEdit) {
        // Mode A: Update existing task details
        const updated = await taskService.updateTaskDetails(taskToEdit._id, {
          title,
          description,
          status: taskToEdit.status, // Preserve current board status lane
          priority,
          component,
          assignee,
          dueDate
        });
        onTaskCreated(updated); // Pass updated task back to refresh state
      } else {
        // Mode B: Create brand new task
        const newTask = await taskService.createTask({
          title,
          description,
          status: 'TODO',
          priority,
          component,
          assignee,
          dueDate
        });
        onTaskCreated(newTask);
      }
      onClose();
    } catch (err) {
      console.error('Error saving task modifications:', err);
      alert('Failed to save task updates.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{taskToEdit ? 'Edit Task Details' : 'Create New Task'}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input 
              type="text" required className="form-input" placeholder="e.g., Secure cookie parser middleware"
              value={title} onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-textarea" rows={3} placeholder="Provide concise implementation goals..."
              value={description} onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Component Layer</label>
              <select className="form-select" value={component} onChange={e => setComponent(e.target.value as TaskComponent)}>
                <option value="FRONTEND">FRONTEND</option>
                <option value="BACKEND">BACKEND</option>
                <option value="DATABASE">DATABASE</option>
                <option value="DEVOPS">DEVOPS</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority Severity</label>
              <select className="form-select" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)}>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Assignee Name</label>
              <input 
                type="text" required className="form-input" placeholder="Developer name"
                value={assignee} onChange={e => setAssignee(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input 
                type="date" required className="form-input"
                value={dueDate} onChange={e => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{taskToEdit ? 'Save Changes' : 'Create Ticket'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};