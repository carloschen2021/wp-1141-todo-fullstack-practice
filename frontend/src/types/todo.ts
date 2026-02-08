export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  // UI only properties (optional as they are not on backend)
  description?: string;
  expanded?: boolean;
}

export type AddTodoHandler = (todo: Todo) => void;
export type DeleteTodoHandler = (id: number) => void;
export type ToggleTodoHandler = (id: number) => void;
export type ToggleDescriptionHandler = (id: number) => void;
export type EditTodoHandler = (id: number, newTitle: string) => void;

