import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import './AddTodo.css';

const AddTodo = ({ onAdd }) => {
  const [todo, setTodo] = useState({ title: '', description: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.title.trim()) return;

    onAdd({
      id: Date.now(),
      title: todo.title,
      description: todo.description,
      completed: false
    });
    setTodo({ title: '', description: '' });
    setIsExpanded(false);
  };

  return (
    <div className="add-todo-container">
      {!isExpanded ? (
        <button
          className="add-todo-trigger"
          onClick={() => setIsExpanded(true)}
        >
          <Plus size={20} />
          Add New Todo
        </button>
      ) : (
        <form className="add-todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="add-todo-input"
            autoFocus
          />
          <textarea
            placeholder="Add a description (optional)"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            className="add-todo-textarea"
          />
          <div className="add-todo-actions">
            <button type="button" onClick={() => setIsExpanded(false)} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              <Plus size={16} />
              Add Todo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTodo;