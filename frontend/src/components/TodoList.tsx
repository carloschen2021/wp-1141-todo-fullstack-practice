import TodoItem from "./TodoItem";
import type { Todo, DeleteTodoHandler, ToggleTodoHandler, ToggleDescriptionHandler, EditTodoHandler } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: ToggleTodoHandler;
  onDelete: DeleteTodoHandler;
  onEdit: EditTodoHandler;
  onToggleDescription: ToggleDescriptionHandler;
}

const TodoList = ({ todos, onToggle, onDelete, onEdit, onToggleDescription }: TodoListProps) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleDescription={onToggleDescription}
          />
          {index < todos.length - 1 && <div className="separator" />}
        </div>
      ))}
    </div>
  );
};

export default TodoList;

