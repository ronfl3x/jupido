import React from "react";
import { TodoContextType, TodoItem } from "../types/types";
import { TodoContext } from "../context/todoContext";
import { FiCheck, FiTrash2 } from "react-icons/fi";

interface Props {
  todo: TodoItem;
  setTodo: (todo: TodoItem) => void;
}

function TodoSide({ todo, setTodo }: Props) {
  const { updateTodo, deleteTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;

  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [completed, setCompleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTitle(todo ? todo.title : "");
    setDescription(todo ? todo.description : "");
    setCompleted(todo ? todo.completed : false);
  }, [todo]);

  if (todo.id == "ronfl3x") return <></>;

  return (
    <div className="relative flex flex-col h-[100%] w-screen md:w-[80vw] items-start mx-5 rounded-lg space-y-5 p-3 bg-[#f0f0f0]">
      <div className="flex items-center justify-between w-[100%] h-[15%]">
        <input
          className="text-xl w-[90%] h-[100%] p-1 md:text-2xl lg:text-3xl font-medium bg-transparent outline-none border-b-2"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            let newTodo = { ...todo, title: e.target.value } as TodoItem;
            updateTodo(newTodo);
          }}
        />
        <div className="w-[10%] flex items-center justify-center text-2xl cursor-pointer">
          <FiTrash2
            className="w-10 h-10 bg-[#f0f0f0] p-2 rounded-full text-red-600 transition duration-200 hover:bg-[#e0e0e0] ease-in-out"
            onClick={() => {
              deleteTodo(todo.id);
              setTodo({
                id: "ronfl3x",
                title: "",
                description: "",
                completed: false,
              });
            }}
          />
        </div>
      </div>

      <textarea
        id="description"
        className="input-field resize-none w-[100%] h-[70%] border-b-2"
        placeholder="Do something as if it was important."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          let newTodo = { ...todo, description: e.target.value } as TodoItem;
          updateTodo(newTodo);
        }}
      />
      <label
        htmlFor="checkbox"
        className="w-[100%] cursor-pointer flex justify-center h-[5%] items-center"
        onClick={() => {
          setCompleted(!completed);
          let newTodo = { ...todo, completed: !completed } as TodoItem;
          updateTodo(newTodo);
        }}
      >
        <div
          id="checkbox"
          className={`flex items-center justify-center cursor-pointer w-6 h-6 md:w-7 md:h-7 rounded mr-2 shadow-inner ${
            !completed ? "background-fade-out" : "background-fade-in"
          }`}
        >
          <FiCheck
            className={`fade-in md:text-xl text-white ${
              !completed ? " fade-out duration-100" : ""
            }`}
          />
        </div>
        <span className="text-sm md:text-lg">Done</span>
      </label>
    </div>
  );
}

export default TodoSide;
