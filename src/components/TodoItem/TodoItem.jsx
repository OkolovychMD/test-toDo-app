import React, { useState } from 'react';
import { Check, X, Edit2, Trash2, Save } from 'lucide-react';
import './TodoItem.css';

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description
  });

  const handleSave = () => {
    if (!editForm.title.trim()) return;
    onEdit(todo.id, editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          className="edit-input"
          autoFocus
        />
        <textarea
          value={editForm.description}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
          className="edit-textarea"
          placeholder="Description (optional)"
        />
        <div className="edit-actions">
          <button onClick={() => setIsEditing(false)} className="cancel-button">
            <X size={16} />
            Cancel
          </button>
          <button onClick={handleSave} className="save-button">
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          onClick={() => onToggle(todo.id)}
          className={`complete-button ${todo.completed ? 'completed' : ''}`}
        >
          <Check size={16} />
        </button>
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && <p className="todo-description">{todo.description}</p>}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="edit-button">
          <Edit2 size={16} />
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-button">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;