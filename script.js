//date

const date = document.getElementById("date");
options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);
const list = document.querySelector("#list");
let id = 0;

// ui object
class UI {
  //function to diplay todos
  static displayTodo() {
    const todos = Store_list.getTodos();
    todos.forEach((element) => {
      UI.addTodoList(element.text, element.id, element.completed);
    });
  }
  // function to add todos
  static addTodoList(toDo, id, iscompleted) {
    const completed = iscompleted ? "checkedLine" : "";
    const statusIcon = iscompleted ? "fa-check-circle" : "fa-circle-o";
    const listItem = `
    <li>
    <p class="text ${completed}">${toDo}</p> 
    <i class="fa ${statusIcon} co"action="complete" id="${id}"> </i>
      <i class="fa fa-trash-o " action="delete" id="${id}"></i>
  </li> `;
    const postion = "beforeend";
    list.insertAdjacentHTML(postion, listItem);
  }
  //function to remove todo
  static removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    // update in storage
    const curId = element.attributes.id.value;
    const todos = Store_list.getTodos();
    todos.forEach((todo, index) => {
      if (+todo.id == +curId) {
        todos.splice(index, 1);
      }
    });
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }
  //function that defines todo is completed
  static completeTodo(element) {
    const CHECK = "fa-check-circle";
    const UNCHECK = "fa-circle-o";
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle("checkedLine");

    //update the storage
    const curId = element.attributes.id.value;
    const todos = Store_list.getTodos();
    todos.forEach((todo, index) => {
      if (+todo.id === +curId) {
        todos[index].completed = todos[index].completed ? false : true;
      }
    });
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }
  //function to reset todos
  static clearList() {
    list.innerHTML = "";
    localStorage.clear();
  }
}

//storge object
class Store_list {
  //function to get todo
  static getTodos() {
    let todos;
    if (localStorage.getItem("TodoList") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("TodoList"));
    }
    return todos;
  }
  //function to add todo
  static addTodoList(toDo, id) {
    const todos = Store_list.getTodos();
    todos.push({
      text: toDo,
      id: id,
      completed: false,
    });
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }
}

//event listner

//get data when loaded
document.addEventListener("DOMContentLoaded", UI.displayTodo);

//if press enter ad todo
document.addEventListener("keyup", function () {
  if (event.keyCode == 13) {
    const toDoItem = input.value;
    // validation
    if (toDoItem) {
      UI.addTodoList(toDoItem, Date.now());
      Store_list.addTodoList(toDoItem, Date.now());
      input.value = "";
    }
  }
});

document.addEventListener("click", (event) => {
  const element = event.target;
  if (element.attributes.action) {
    const elementAction = element.attributes.action.value;
    if (elementAction == "complete") {
      UI.completeTodo(element);
    } else if (elementAction == "delete") {
      UI.removeTodo(element);
    }
  }
});
