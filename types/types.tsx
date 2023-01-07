export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type TodoContextType = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
  saveTodo: (todo: TodoItem) => void;
  updateTodo: (updatedTodo: TodoItem) => void;
  deleteTodo: (id: string) => void;
};

export interface Hooks {
  useSet: (todo: TodoItem) => void;
}
