import render from "./render.js";
import store from "./store.js";
import { addTodo, deleteTodo, toggleCompleted } from "./store.js";

window.addEventListener("todoschange", () => {
  render();
});

// storing fro loacalstorage

const storeFromLocalStorage = JSON.parse(localStorage.getItem("store"));
if (storeFromLocalStorage?.todos.length > 0) {
  store.todos = storeFromLocalStorage.todos;
} else {
  localStorage.setItem("store", JSON.stringify(store));
  render();
}

const form = document.querySelector("#form");
const todoTitleInput = document.querySelector(".todo-title-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todotitle = todoTitleInput.value;
  const newTodo = {
    id: crypto.randomUUID(),
    title: todotitle,
    completed: false,
  };
  addTodo(newTodo);
});

const todos = document.querySelector(".todos");

todos.addEventListener("click", (e) => {
  const target = e.target;
  if (e.target.classList.contains("delete-todo-button")) {
    const id = target.closest(".todo").dataset.id;
    deleteTodo(id);
  }
});

todos.addEventListener("change", (e) => {
  const target = e.target;
  if (target.classList.contains("todo-checkbox")) {
    const id = target.closest(".todo").dataset.id;
    const completed = target.checked;
    toggleCompleted(id, completed);
  }
});
