import React from "react";
import { TodoContext } from "../context/todoContext";
import { TodoContextType, TodoItem } from "../types/types";
import { FiCheck, FiX } from "react-icons/fi";

function AddTodo() {
  //--------------//
  const { visible, setVisible, saveTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;
  //--------------//

  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [completed, setCompleted] = React.useState<boolean>(false);

  //--------------//
  const bgRef = React.useRef<HTMLDivElement>(null);

  //------------------//

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (visible && e.key === "Escape") {
        setVisible(false);
      }
      if (visible && e.key === "Tab") {
        const descriptionElement = document.querySelector(
          "#description"
        ) as HTMLTextAreaElement;

        if (descriptionElement === document.activeElement) {
          e.preventDefault();
          descriptionElement?.setRangeText(
            "\t",
            descriptionElement.selectionStart,
            descriptionElement.selectionStart,
            "end"
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        visible &&
        bgRef.current &&
        !bgRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
      const clickedElement = e.target as HTMLElement;
      const clickedElementClassList = clickedElement.classList;
      if (clickedElementClassList.contains("border-red-500")) {
        clickedElement.classList.remove("border-red-500");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  //--------------------//
  return (
    <div
      className={` absolute flex justify-center items-center z-10 w-screen  h-[100%] bg-[rgba(0,0,0,.15)] ${
        visible ? "fade-in" : "fade-out "
      }`}
    >
      <div
        ref={bgRef}
        className={` min-w-[300px] min-h-[450px] relative bg-[#f7f7f7] md:min-w-[60%] w-[60%] h-[80%] shadow-sm rounded-lg md:rounded ${
          visible ? "slide-from-bottom" : " slide-to-bottom"
        }`}
      >
        <div className="relative w-[100%] h-[10%] flex justify-center items-center">
          <h1 className="font-semibold text-[#292929] py-3 text-lg">
            New Task
          </h1>
          <FiX
            className="absolute right-3 top-3 cursor-pointer text-[#757575] text-3xl transition duration-300 hover:text-black"
            onClick={() => setVisible(false)}
          />
        </div>

        <section className="flex flex-col justify-start w-[100%] h-[90%]  px-5">
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="input-field text-4xl border-b-2 mb-4 h-[10%]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            id="description"
            className="input-field resize-none h-[60%] min-h-[200px] border-b-2 mb-4"
            placeholder="Do something as if it was important."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label
            htmlFor="checkbox"
            className=" cursor-pointer flex items-center mb-4 h-[10%]"
            onClick={() => setCompleted(!completed)}
          >
            <div
              id="checkbox"
              className={`flex items-center justify-center cursor-pointer w-6 h-6  rounded-full mr-2 shadow-inner ${
                !completed ? " background-fade-out" : "background-fade-in"
              }`}
            >
              <FiCheck
                className={`fade-in text-white ${
                  !completed ? " fade-out duration-100" : ""
                }`}
              />
            </div>
            Done
          </label>
          <div className="flex h-[10%] width-[100%] items-center justify-center pb-5">
            <button
              className="w-[50%] ld:w-[30%] h-10 text-lg font-medium bg-[#d14a5c] text-white 
              rounded-md shadow-md hover:bg-[#ad3645] transition duration-300 ease-in-out"
              onClick={() => {
                if (!title) {
                  document
                    .getElementById("title")
                    ?.classList.add("border-red-500");
                  return;
                }
                const newTodo: TodoItem = {
                  id: "new",
                  title,
                  description,
                  completed,
                };
                saveTodo(newTodo);
                setVisible(false);
                setCompleted(false);
                setTitle("");
                setDescription("");
              }}
            >
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddTodo;
