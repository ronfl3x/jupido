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

  return (
    <div className="relative flex flex-col min-width-screen min-h-screen overflow-hidden">
      <Head>
        <title>Jupido</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <AddTodo />
      <main className="relative w-[100%] h-[100%] md:h-[80vh] flex flex-col md:flex-row ">
        <TodoList todo={todo} setTodo={setTodo} />
        <TodoSide todo={todo} setTodo={setTodo} />
      </main>
    </div>
  );
};

export default Home;
