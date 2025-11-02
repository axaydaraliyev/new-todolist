// imports
import { createUi } from "./update.js";

// HTML ELEMENTS 
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input")

// todos arr
export const todos = JSON.parse(localStorage.getItem("todos")) || [];
createUi(todos);

// form Submit
formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    if(!inputEl.value.trim()) return

    let date = new Date();
    let createTime = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        const todo = {
            id: Math.random(),
            text: inputEl.value,
            isComplited: false,
            time: createTime,
        }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));
    createUi(todos);
    formEl.reset();
}) ;



