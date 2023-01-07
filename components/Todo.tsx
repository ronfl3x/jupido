import React from "react";
import { TodoItem } from "../types/types";

interface Props {
  todo: TodoItem;
}

function Todo({ todo }: Props) {
  return (
    <div
      title={todo.title}
      className="todo flex justify-between w-[100%] bg-[#f0f0f0] py-2 px-3 rounded-md hover:bg-[#e5e5e5] transition duration-200 cursor-pointer"
      id={todo.id}
    >
      <span className="todo w-[70%] truncate" id={todo.id}>
        {todo.title}
      </span>
      {todo.completed ? (
        <span className="todo text-green-600" id={todo.id}>
          Done
        </span>
      ) : (
        <span className="todo text-red-600" id={todo.id}>
          Todo
        </span>
      )}
    </div>
  );
}

export default Todo;
