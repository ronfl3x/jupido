import React from "react";
import { FiChevronLeft, FiMenu, FiPlus } from "react-icons/fi";
import { TodoContext } from "../context/todoContext";
import { TodoContextType } from "../types/types";

interface Props {
  showList: boolean;
  setShowList: (showList: boolean) => void;
  setShowSide: (showSide: boolean) => void;
}

function Navbar({ showList, setShowList, setShowSide }: Props) {
  const { visible, setVisible } = React.useContext(
    TodoContext
  ) as TodoContextType;

  const [time, setTime] = React.useState<string>("");
  const [back, setBack] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    setBack(!showList);
  }, [showList]);

  return (
    <div
      className={`flex w-screen  justify-between items-center px-8 pt-4 pb-10  ${
        visible ? " z-0" : "z-20"
      }  `}
    >
      <h1 className="hidden md:flex text-3xl font-semibold">Jupido</h1>
      {back ? (
        <FiChevronLeft
          className="flex md:hidden text-3xl text-[#c0c0c0] cursor-pointer"
          onClick={() => {
            setShowList(true);
            setShowSide(false);
          }}
        />
      ) : (
        <FiMenu
          className="flex md:hidden text-3xl text-[#c0c0c0] cursor-pointer"
          onClick={() => {
            setShowList(false);
            setShowSide(true);
          }}
        />
      )}
      <div className="hidden md:flex items-center justify-center">
        <h1 className="text-lg md:text-2xl font-semibold">{time}</h1>
      </div>

      <div
        onClick={() => {
          if (visible) return;
          setVisible(true);
        }}
        className="flex items-center justify-center bg-[#D14A5C] p-[5px] md:px-4 md:py-3 
      rounded-full md:rounded-md cursor-pointer text-white transition duration-300ms ease-in-out hover:bg-[#8a2e3b] 
        lg:text-lg lg:px-5 lg:py-3 lg:font-medium
      "
      >
        <span className="hidden md:flex">New Task</span>
        <FiPlus className="flex md:hidden text-2xl" />
      </div>
    </div>
  );
}

export default Navbar;
