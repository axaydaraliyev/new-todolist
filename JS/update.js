const listEl = document.querySelector(".todos");
const overlayEl = document.querySelector(".overlay");
const modalForm = document.querySelector(".modal-form")
const modalBtn = document.querySelector(".modal-btn");
const modalInputEl =document.querySelector(".modal-input");


export const createUi = (todos)=> {
    listEl.innerHTML = "";
    todos.forEach(({id, text, time, isComplited})=> {
        const li = document.createElement("li");
        if(isComplited) li.classList.add("complated");
        const spanEl = document.createElement("span");
        spanEl.textContent = ")";
        const textEl = document.createElement("p");
        textEl.textContent = text;
        const divEl = document.createElement("div");
        const timeEl = document.createElement("time");
        timeEl.textContent = time;
        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtn.style.color = "red";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const newTodos = todos.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos))
            createUi(newTodos);
        });
        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
        editBtn.style.color = "#123456";
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            overlayEl.classList.remove("hidden");
            editTodoFn(todos, id)
        });
        divEl.append(timeEl, editBtn, deleteBtn);
        
        li.append(spanEl, textEl, divEl);
        li.addEventListener("click", () => {
            const newTodos = todos.map((todo) => {
                return todo.id === id 
                ? {...todo, isComplited: !todo.isComplited} 
                : todo;
            });

            createUi(newTodos);
            localStorage.setItem("todos", JSON.stringify(newTodos))
        });
        listEl.append(li);
    });
}

function hiddenModal() {
    overlayEl.classList.add("hidden")
};

overlayEl.addEventListener("click", (e) => {
   if(e.target.classList.contains("overlay")) {
    hiddenModal();
   }
});

modalBtn.addEventListener("click", hiddenModal);

function editTodoFn(todos, id) {

    const activeTodo = todos.find((todo) => todo.id === id);
    modalInputEl.value = activeTodo.text;


    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        if(!modalInputEl.value.trim()) return;

        const newTodos = todos.map((todo) => {
            return todo.id === id ? {...todo, text: modalInputEl.value} : {...todo}
         });
         
         localStorage.setItem("todos", JSON.stringify(newTodos));
         createUi(newTodos);
         hiddenModal();
    });
};