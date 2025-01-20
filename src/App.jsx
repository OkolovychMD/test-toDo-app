import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo/AddTodoItem';
import SearchBar from './components/SearchBar/SearchBar';
import TodoList from './components/TodoList/TodoList';
import './App.css';

function App() {
  // Initialize state with todos from localStorage if they exist
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">Todo List</h1>
        <p className="app-subtitle">Keep track of your tasks</p>
      </div>
      <SearchBar onSearch={setSearchQuery} />
      <AddTodo onAdd={addTodo} />
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;