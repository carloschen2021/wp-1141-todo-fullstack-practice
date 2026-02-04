import { useState, useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";
import * as todoApi from "./services/api";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
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
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
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
    } catch (err) {
      setError('Failed to update todo');
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

  if (loading && todos.length === 0) return <div className="container">Loading...</div>;
  if (error) return <div className="container" style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="title">todo list</h1>

      <AddTodo onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onToggleDescription={toggleDescription}
      />
    </div>
  );
}

export default App;

