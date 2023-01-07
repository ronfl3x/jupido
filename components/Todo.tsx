import React from "react";
import { TodoItem } from "../types/types";
import { FiCheck } from "react-icons/fi";
import { TodoContextType } from "../types/types";
import { TodoContext } from "../context/todoContext";

interface Props {
  id: string;
}

function Todo({ id }: Props) {
  const { todos, updateTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;
  const [completed, setCompleted] = React.useState(
    todos.find((todo) => todo.id === id)?.completed
  );
  const [title, setTitle] = React.useState(
    todos.find((todo) => todo.id === id)?.title
  );

  React.useEffect(() => {
    setCompleted(todos.find((todo) => todo.id === id)?.completed);
    setTitle(todos.find((todo) => todo.id === id)?.title);
  }, [todos]);

  return (
    <div
      title={title}
      className="todo flex justify-between w-[100%] bg-[#f0f0f0] py-2 px-3 rounded-md hover:bg-[#e5e5e5] transition duration-200 cursor-pointer"
      id={id}
    >
      <span className="todo w-[70%] truncate" id={id}>
        {title}
      </span>
      <label
        htmlFor="checkbox"
        className="cursor-pointer flex justify-center items-center"
        onClick={() => {
          setCompleted(!completed);
          let todo = todos.find((todo) => todo.id === id) as TodoItem;
          let newTodo = { ...todo, completed: !completed } as TodoItem;
          updateTodo(newTodo);
        }}
      >
        <div
          id="checkbox"
          className={`flex items-center justify-center cursor-pointer w-4 h-4 md:w-5 md:h-5 rounded-full shadow-inner ${
            !completed ? "background-fade-out" : "background-fade-in"
          }`}
        >
          <FiCheck
            className={`fade-in md:text-[14px] text-white ${
              !completed ? " fade-out duration-100" : ""
            }`}
          />
        </div>
      </label>
    </div>
  );
}

export default Todo;
