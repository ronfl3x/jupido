import React from "react";
import { TodoContext } from "../context/todoContext";
import { TodoContextType } from "../types/types";

function Navbar() {
  const { visible, setVisible } = React.useContext(
    TodoContext
  ) as TodoContextType;

  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      let dateTime = new Date();
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let minutesS = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutesS;
      setTime(strTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible && e.ctrlKey && e.altKey && e.key === "n") {
        setVisible(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`flex w-screen  justify-between items-center px-8 pt-4 pb-10  ${
        visible ? " z-0" : "z-20"
      }  `}
    >
      <h1 className="text-3xl font-semibold">Jupido</h1>
      <div className="flex items-center justify-center">
        <h1 className="text-lg md:text-2xl font-semibold">{time}</h1>
      </div>

      <div
        onClick={() => {
          if (visible) return;
          setVisible(true);
        }}
        className="flex items-center justify-center bg-[#D14A5C] px-4 py-3 
      rounded-md cursor-pointer text-white transition duration-300ms ease-in-out hover:bg-[#8a2e3b] 
        lg:text-lg lg:px-5 lg:py-3 lg:font-medium
      "
      >
        New Task
      </div>
    </div>
  );
}

export default Navbar;
