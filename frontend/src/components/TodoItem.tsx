import { useState } from "react";
import type { Todo, DeleteTodoHandler, ToggleTodoHandler, ToggleDescriptionHandler, EditTodoHandler } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: ToggleTodoHandler;
  onDelete: DeleteTodoHandler;
  onEdit: EditTodoHandler;
  onToggleDescription: ToggleDescriptionHandler;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit, onToggleDescription }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) return; // Don't toggle description when editing
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT" && !target.classList.contains("delete-btn") && !target.classList.contains("edit-btn")) {
      onToggleDescription(todo.id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(todo.id);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(todo.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div>
      <div className="todo-item" onClick={handleItemClick}>
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          disabled={isEditing}
        />

        {isEditing ? (
          <input
            type="text"
            className="todo-edit-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="todo-text">{todo.title}</span>
        )}

        {isEditing ? (
          <div className="edit-actions">
            <button className="save-btn" onClick={(e) => { e.stopPropagation(); handleSave(); }}>
              save
            </button>
            <button className="cancel-btn" onClick={(e) => { e.stopPropagation(); handleCancel(); }}>
              cancel
            </button>
          </div>
        ) : (
          <>
            <button className="edit-btn" onClick={handleEditClick}>
              edit
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              delete
            </button>
          </>
        )}
      </div>
      {todo.expanded && !isEditing && (
        <div className="todo-description show">{todo.description}</div>
      )}
    </div>
  );
};

export default TodoItem;

