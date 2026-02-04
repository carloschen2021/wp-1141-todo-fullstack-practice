import useAddTodoForm from "../hooks/useAddTodoForm";
import type { AddTodoHandler } from "../types/todo";

interface AddTodoProps {
  onAddTodo: AddTodoHandler;
}

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const {
    newTodo,
    description,
    setNewTodo,
    setDescription,
    handleSubmit,
    handleTitleKeyDown,
    handleDescriptionKeyDown,
  } = useAddTodoForm(onAddTodo);

  return (
    <div className="add-todo-section">
      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          placeholder="new todo"
          className="todo-input"
        />
        <button onClick={handleSubmit} className="add-btn">
          add
        </button>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleDescriptionKeyDown}
        placeholder="description"
        className="description-input"
      />
    </div>
  );
};

export default AddTodo;

