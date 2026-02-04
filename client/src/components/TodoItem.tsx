import type { Todo, DeleteTodoHandler, ToggleTodoHandler, ToggleDescriptionHandler } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: ToggleTodoHandler;
  onDelete: DeleteTodoHandler;
  onToggleDescription: ToggleDescriptionHandler;
}

const TodoItem = ({ todo, onToggle, onDelete, onToggleDescription }: TodoItemProps) => {
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT" && !target.classList.contains("delete-btn")) {
      onToggleDescription(todo.id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(todo.id);
  };

  return (
    <div>
      <div className="todo-item" onClick={handleItemClick}>
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-text">{todo.title}</span>
        <button className="delete-btn" onClick={handleDeleteClick}>
          delete
        </button>
      </div>
      {todo.expanded && (
        <div className="todo-description show">{todo.description}</div>
      )}
    </div>
  );
};

export default TodoItem;

