import React from "react";
import { TodoItem } from "../types/types";
import { FiCheck } from "react-icons/fi";
import { TodoContextType } from "../types/types";
import { TodoContext } from "../context/todoContext";

interface Props {
  title: string;
  completed: boolean;
  id: string;
}

function Todo({ title, completed, id }: Props) {
  const { todos, updateTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;
  const [sCompleted, setSCompleted] = React.useState<boolean | undefined>(
    completed
  );

  React.useEffect(() => {
    setSCompleted(completed);
  }, [completed]);

  return (
    <div
      title={title}
      className="todo flex justify-between w-[100%] bg-[#f0f0f0] py-2 px-3 rounded-md hover:bg-[#e5e5e5] transition duration-200 cursor-pointer mb-1"
      id={id}
    >
      <span className="todo w-[70%] truncate" id={id}>
        {title}
      </span>
      <label
        htmlFor="checkbox"
        className="cursor-pointer flex justify-center items-center"
        onClick={() => {
          setSCompleted(!sCompleted);
          let todo = todos.find((todo) => todo.id === id) as TodoItem;
          let newTodo = { ...todo, completed: !sCompleted } as TodoItem;
          updateTodo(newTodo);
        }}
      >
        <div
          id="checkbox"
          className={`flex items-center justify-center cursor-pointer w-5 h-5 md:w-6 md:h-6 rounded-full shadow-inner ${
            !sCompleted ? "background-fade-out" : "background-fade-in"
          }`}
        >
          <FiCheck
            className={`fade-in text-[12px] md:text-[14px] text-white ${
              !sCompleted ? " fade-out duration-100" : ""
            }`}
          />
        </div>
      </label>
    </div>
  );
}

export default Todo;
