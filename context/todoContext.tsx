import React from "react";
import { TodoContextType, TodoItem } from "../types/types";
import getData, { setData, updateData, deleteData } from "../hooks/database";

export const TodoContext = React.createContext<TodoContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const TodoProvider: React.FC<Props> = ({ children }: Props) => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    let data: TodoItem[] = getData();
    setTodos(data);
  }, []);

  const generateUID = () => {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    let firstParts = ("000" + firstPart.toString(36)).slice(-3);
    let secondParts = ("000" + secondPart.toString(36)).slice(-3);
    return firstParts + secondParts;
  };

  const saveTodo = (todo: TodoItem) => {
    const newTodo: TodoItem = {
      id: generateUID(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };
    setTodos([...todos, newTodo]);
    setData(newTodo);
  };

  const updateTodo = (updatedTodo: TodoItem) => {
    todos.filter((todo: TodoItem) => {
      if (todo.id === updatedTodo.id) {
        todo.description = updatedTodo.description;
        todo.title = updatedTodo.title;
        todo.completed = updatedTodo.completed;
        setTodos([...todos]);
        updateData(updatedTodo);
      }
    });
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo: TodoItem) => todo.id !== id);
    setTodos(newTodos);
    deleteData(id);
  };

  return (
    <TodoContext.Provider
      value={{
        visible,
        setVisible,
        todos,
        setTodos,
        saveTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
