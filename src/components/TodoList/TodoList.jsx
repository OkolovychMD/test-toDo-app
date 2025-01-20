import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;