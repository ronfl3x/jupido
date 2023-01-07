import app from "../config/firebase";
import { getDatabase, ref, remove, set, get, update } from "firebase/database";
import { TodoItem } from "../types/types";

const db = getDatabase(app);
const todoRef = ref(db, "todolist/");

export default function getData() {
  let todos: TodoItem[] = [];
  get(todoRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let tmp = snapshot.val();
        for (let key in tmp) {
          let todo: TodoItem = {
            id: key,
            title: tmp[key].title,
            description: tmp[key].description,
            completed: tmp[key].completed,
          };
          todos.push(todo);
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return todos;
}

export function setData(todo: TodoItem) {
  set(ref(db, "todolist/" + todo.id), {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  });
}

export function updateData(todo: TodoItem) {
  update(ref(db, "todolist/" + todo.id), {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  });
}

export function deleteData(id: string) {
  remove(ref(db, "todolist/" + id));
}
