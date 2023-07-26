// selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo);
document.addEventListener('DOMContentLoaded',getTodos);
//functions
function addTodo(event){
event.preventDefault();

// TODO DIV
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//LI
const todoLi= document.createElement('li');
todoLi.innerText = todoInput.value ;
todoLi.classList.add("todo-li");
todoDiv.appendChild(todoLi);
//add todo to local storage
saveLocalTodos(todoInput.value);

//completed button 
let checkButton = document.createElement('button');
checkButton.innerHTML= " <i class = 'fas fa-check'> </i> " ; 
checkButton.classList.add("check-button");
todoDiv.appendChild(checkButton);
//trash button 
let trashButton = document.createElement('button');
trashButton.classList.add("trash-button");
trashButton.innerHTML= " <i class = 'fas fa-trash'> </i> " ; 
todoDiv.appendChild(trashButton);


// finally adding it to a ul class so it doesn't floats is attached to our html
todoList.appendChild(todoDiv);
//clearing input bar 
todoInput.value= "";
}

function deleteCheck(event){
    const item  = event.target;
// deleting todo
if(item.classList[0] === "trash-button"){
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove();
    })

  
}
if(item.classList[0]=== "check-button"){
    const todo = item.parentElement;
    todo.classList.toggle("completed")
}

}
function filterTodo() {
    const todos = todoList.children;
  
    [...todos].forEach(function (todo) {
      switch (filterOption.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        default:
          todo.style.display = "flex";
          break;
      }
    });
  }

  function saveLocalTodos(todo){
    // check hey do i have already have thing in there?
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

  }


function getTodos(){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }

  todos.forEach(function(todo){
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//LI
const todoLi= document.createElement('li');
todoLi.innerText = todo ;
todoLi.classList.add("todo-li");
todoDiv.appendChild(todoLi);


//completed button 
let checkButton = document.createElement('button');
checkButton.innerHTML= " <i class = 'fas fa-check'> </i> " ; 
checkButton.classList.add("check-button");
todoDiv.appendChild(checkButton);
//trash button 
let trashButton = document.createElement('button');
trashButton.classList.add("trash-button");
trashButton.innerHTML= " <i class = 'fas fa-trash'> </i> " ; 
todoDiv.appendChild(trashButton);


// finally adding it to a ul class so it doesn't floats is attached to our html
todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
   


}
