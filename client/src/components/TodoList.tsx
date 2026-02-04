import TodoItem from "./TodoItem";
import type { Todo, DeleteTodoHandler, ToggleTodoHandler, ToggleDescriptionHandler } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onDelete: DeleteTodoHandler;
  onToggle: ToggleTodoHandler;
  onToggleDescription: ToggleDescriptionHandler;
}

const TodoList = ({ todos, onDelete, onToggle, onToggleDescription }: TodoListProps) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onToggleDescription={onToggleDescription}
          />
          {index < todos.length - 1 && <div className="separator" />}
        </div>
      ))}
    </div>
  );
};

export default TodoList;

