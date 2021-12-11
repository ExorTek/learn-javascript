const form = document.querySelector("#todo-form");
const formRow = document.querySelector(".form-row");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const formGroup = document.querySelector(".col-md-6");
const secondCardBody = document.querySelector(".card-body-two");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventHandler();


function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();

    const listItems = document.getElementsByClassName("list-group-item");
    Array.from(listItems).map(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none !important;");
        } else {
            listItem.setAttribute("style", "display:block");
        }
    });

// const sele = document.getElementsByClassName("app--row--1ydzX");
const sele = document.getElementsByName("body")
sele.body.style.backgroundColor="black";
    // listItems.forEach(function (listItem) {
    // const text = listItem.textContent.toLowerCase();
    //         if (text.indexOf(filterValue) === -1) {
    //             listItem.setAttribute("style", "display:none !important;");
    //         } else {
    //             listItem.setAttribute("style", "display:block");
    //         }
    // })
}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoToStorage(e.target.parentElement.parentElement.textContent)
        showAlert(formGroup, "success", "Todo Başarıyla Silindi...");
    }
}

function clearAllTodos(e) {
    if (confirm("Clear All Todos?")) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert(formRow, "danger", "Bu Alan Boş Geçilemez");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert(formRow, "success", "Todo Eklendi");
    }
    e.preventDefault();
}

function showAlert(htmlType, type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    htmlType.appendChild(alert);
    //setTimeout
    setTimeout(function () {
        alert.remove();
    }, 2000);
}

function addTodoToUI(newTodo) {
    //Create List Item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    //Add Text Node
    listItem.appendChild(document.createTextNode(newTodo));

    //Create Link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = \"fa fa-remove\"></i>";
    //Add listItem to link
    listItem.appendChild(link);
    //Add TodoList to ListItem
    todoList.appendChild(listItem);
    todoInput.value = "";
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoToStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function eventHandler() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}
const listem=document.getElementsByClassName("FPmhX");
Array.from(listem).map(function (list) {
    console.log(list.textContent)
});
