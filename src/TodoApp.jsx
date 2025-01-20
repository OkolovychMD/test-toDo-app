import React, { useState, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  // Debounce search
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  // Add todo
  const handleAddTodo = () => {
    if (newTodo.title.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          ...newTodo,
          completed: false,
        },
      ]);
      setNewTodo({ title: '', description: '' });
    }
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle completion
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Start editing
  const handleStartEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditForm({ title: todo.title, description: todo.description });
  };

  // Save edit
  const handleSaveEdit = () => {
    if (editForm.title.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === editingTodo ? { ...todo, ...editForm } : todo
        )
      );
      setEditingTodo(null);
    }
  };

  // Filter todos based on search
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search todos..."
          className="pl-8"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {/* Add Todo Form */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Todo title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
            <Button onClick={handleAddTodo} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Todo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Todo List */}
      <div className="space-y-4">
        {filteredTodos.map(todo => (
          <Card key={todo.id} className={`${todo.completed ? 'bg-gray-50' : ''}`}>
            <CardContent className="pt-6">
              {editingTodo === todo.id ? (
                <div className="space-y-4">
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                  <Input
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit} className="flex-1">
                      <Check className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button onClick={() => setEditingTodo(null)} variant="outline" className="flex-1">
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={`${todo.completed ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${todo.completed ? 'line-through' : ''}`}>
                      {todo.title}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleToggleComplete(todo.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleStartEdit(todo)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteTodo(todo.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {todo.description && (
                    <p className="mt-2 text-gray-600">{todo.description}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;