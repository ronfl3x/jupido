import React from "react";
import { TodoContextType, TodoItem } from "../types/types";
import { TodoContext } from "../context/todoContext";
import Todo from "./Todo";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  todo: TodoItem;
  setTodo: (todo: TodoItem) => void;
  setShowList: (showList: boolean) => void;
  setShowSide: (showSide: boolean) => void;
}

function TodoList({ todo, setTodo, setShowList, setShowSide }: Props) {
  const { todos, deleteTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;

  const [todolist, setTodolist] = React.useState<any>(null);
  const [topCustomMenu, setTopCustomMenu] = React.useState(0);
  const [leftCustomMenu, setLeftCustomMenu] = React.useState(0);
  const [showCustomMenu, setShowCustomMenu] = React.useState(false);
  const [key, setKey] = React.useState("");

  React.useEffect(() => {
    setTodolist(todos);
  }, [todos]);

  // custom right click menu
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("todo")) {
          let key = e.target.getAttribute("id");
          if (key == "b9wuiw") return;
          setKey(key ? key : "");
          e.preventDefault();
          setTopCustomMenu(e.clientY - 85);
          if (e.clientX > 80) {
            setLeftCustomMenu(e.clientX - 80);
          } else {
            setLeftCustomMenu(e.clientX);
          }
          setShowCustomMenu(true);
        }
      }
    });

    document.addEventListener("click", () => {
      setShowCustomMenu(false);
      setKey("");
    });
  }, []);

  if (todolist === null) {
    return (
      <div className="flex flex-col items-center w-[screen] md:w-[20%] h-[100%] space-y-2 p-2">
        {/* make 3 rectangles with background bg-[#f0f0f0] and animation pulse tailwind */}
        <div className="w-[100%] h-10 bg-[#d0d0d0] rounded animate-pulse"></div>
        <div className="w-[100%] h-10 bg-[#d0d0d0] rounded animate-pulse"></div>
        <div className="w-[100%] h-10 bg-[#d0d0d0] rounded animate-pulse"></div>
      </div>
    );
  }

  if (todolist.length == 0)
    return (
      <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
        <h1 className="text-2xl font-bold text-gray-500">No todos</h1>
      </div>
    );

  return (
    <div className="relative flex flex-col h-[100%]  w-screen md:w-[20vw] md:min-w-[200px] items-center p-2 pt-0 overflow-y-scroll overflow-x-auto">
      <div
        className={`absolute  ${
          showCustomMenu ? "flex" : "hidden"
        } bg-white rounded-md shadow-md p-2 space-y-2 z-10 cursor-pointer transition duration-200 hover:bg-gray-100 hover:shadow-lg items-center`}
        style={{ top: topCustomMenu, left: leftCustomMenu }}
        onClick={() => {
          if (key !== "") {
            if (todo.id == key) {
              setTodo({
                id: "ronfl3x",
                title: "",
                description: "",
                completed: false,
              });
            }
            deleteTodo(key);
          }
        }}
      >
        <FiTrash2 className="text-red-500 mr-3" />
        Delete
      </div>

      <div className="flex flex-col items-center w-[100%] space-y-3">
        {todolist.map((todo: TodoItem, index: React.Key | null | undefined) => (
          <div
            key={index}
            id={todo.id}
            className="flex items-center w-[90%] todo"
            onClick={(e) => {
              if (e.target instanceof HTMLElement) {
                if (e.target.id !== "checkbox") {
                  setTodo(todo);
                }
              }
              // if screen is small then hide the todo list
              if (window.innerWidth < 768) {
                setShowList(false);
                setShowSide(true);
              }
            }}
          >
            <Todo id={todo.id} title={todo.title} completed={todo.completed} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
