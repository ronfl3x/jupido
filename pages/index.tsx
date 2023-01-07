import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import TodoSide from "../components/TodoSide";
import AddTodo from "../modals/AddTodo";
import { TodoItem } from "../types/types";

const Home = () => {
  const [todo, setTodo] = React.useState<TodoItem>({
    id: "ronfl3x",
    title: "",
    description: "",
    completed: false,
  });
  const [showList, setShowList] = React.useState<boolean>(true);
  const [showSide, setShowSide] = React.useState<boolean>(false);

  //react hook on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowList(true);
        setShowSide(true);
      } else {
        setShowList(true);
        setShowSide(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-col min-width-screen min-h-screen overflow-hidden">
      <Head>
        <title>Jupido</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        showList={showList}
        setShowList={setShowList}
        setShowSide={setShowSide}
      />
      <AddTodo />
      <main className="relative w-[100%] h-[80vh] flex flex-col items-center md:flex-row ">
        {showList ? (
          <TodoList
            todo={todo}
            setTodo={setTodo}
            setShowList={setShowList}
            setShowSide={setShowSide}
          />
        ) : (
          <></>
        )}
        {showSide ? (
          <TodoSide
            todo={todo}
            setTodo={setTodo}
            setShowList={setShowList}
            setShowSide={setShowSide}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default Home;
