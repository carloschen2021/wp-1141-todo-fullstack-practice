import { useState, useEffect, useMemo } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SearchFilter from "./components/SearchFilter";
import type { Todo } from "./types/todo";
import * as todoApi from "./services/api";
import { useToast } from "./contexts/ToastContext";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const { showToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      // Map backend data to frontend model (adding UI specific fields if needed)
      const mappedTodos = data.map((t: Todo) => ({
        ...t,
        description: t.description || "",
        expanded: false
      }));
      setTodos(mappedTodos);
    } catch (err) {
      showToast('Failed to load todos', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (newTodoItem: Todo): Promise<void> => {
    try {
      const createdTodo = await todoApi.createTodo({
        title: newTodoItem.title,
        completed: newTodoItem.completed
      });
      // Add local UI properties
      const todoWithUI: Todo = {
        ...createdTodo,
        description: newTodoItem.description, // We are not saving description to DB in this simple version yet, effectively this is just local unless we update schema
        expanded: false
      };
      setTodos([todoWithUI, ...todos]);
      showToast('Todo added successfully', 'success');
    } catch (err) {
      showToast('Failed to create todo', 'error');
      console.error(err);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      showToast('Todo deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete todo', 'error');
      console.error(err);
    }
  };

  const toggleTodo = async (id: number): Promise<void> => {
    const todoToToggle = todos.find(t => t.id === id);
    if (!todoToToggle) return;

    try {
      const updated = await todoApi.updateTodo(id, {
        completed: !todoToToggle.completed
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: updated.completed } : todo
        )
      );
      showToast(updated.completed ? 'Todo marked as complete' : 'Todo marked as incomplete', 'info');
    } catch (err) {
      showToast('Failed to update todo', 'error');
      console.error(err);
    }
  };

  const editTodo = async (id: number, newTitle: string): Promise<void> => {
    if (!newTitle.trim()) {
      showToast('Todo title cannot be empty', 'error');
      return;
    }

    try {
      const updated = await todoApi.updateTodo(id, {
        title: newTitle.trim()
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: updated.title } : todo
        )
      );
      showToast('Todo updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update todo', 'error');
      console.error(err);
    }
  };

  const toggleDescription = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
  };

  // Filter todos based on search query and filter status
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Search filter (case-insensitive)
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        filterStatus === 'all' ? true :
          filterStatus === 'active' ? !todo.completed :
            todo.completed;

      return matchesSearch && matchesStatus;
    });
  }, [todos, searchQuery, filterStatus]);

  if (loading && todos.length === 0) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="title-row">
        <h1 className="title">todo list</h1>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <AddTodo onAddTodo={addTodo} />

      <SearchFilter
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterStatus}
        totalCount={todos.length}
        filteredCount={filteredTodos.length}
      />

      {filteredTodos.length === 0 && todos.length > 0 ? (
        <div className="empty-state">
          No todos found. Try adjusting your search or filter.
        </div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onToggleDescription={toggleDescription}
        />
      )}
    </div>
  );
}

export default App;

