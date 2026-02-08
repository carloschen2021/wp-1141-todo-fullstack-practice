import { useState } from "react";
import type { Todo, AddTodoHandler } from "../types/todo";

interface UseAddTodoFormReturn {
  newTodo: string;
  description: string;
  setNewTodo: (value: string) => void;
  setDescription: (value: string) => void;
  handleSubmit: () => void;
  handleTitleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDescriptionKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  resetForm: () => void;
}

/**
 * 自定義 hook：管理新增 Todo 的表單邏輯
 * @param {Function} onAddTodo - 新增 todo 的回調函數
 * @returns {Object} 表單狀態和處理函數
 */
const useAddTodoForm = (onAddTodo: AddTodoHandler): UseAddTodoFormReturn => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // 重置表單
  const resetForm = (): void => {
    setNewTodo("");
    setDescription("");
  };

  // 處理新增 todo
  const handleSubmit = (): void => {
    const text = newTodo.trim();
    const desc = description.trim();

    if (!text) return;

    const newTodoItem: Todo = {
      id: 0, // Placeholder ID, backend will generate
      title: text,
      description: desc || "No description provided",
      completed: false,
      expanded: false,
    };

    onAddTodo(newTodoItem);
    resetForm();
  };

  // 處理標題輸入的鍵盤事件 (Enter)
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // 處理描述輸入的鍵盤事件 (Ctrl+Enter)
  const handleDescriptionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return {
    // State
    newTodo,
    description,
    // State setters
    setNewTodo,
    setDescription,
    // Handlers
    handleSubmit,
    handleTitleKeyDown,
    handleDescriptionKeyDown,
    resetForm,
  };
};

export default useAddTodoForm;

