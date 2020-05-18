class Todo {
    constructor(id, workTodo, isCompleted) {
        this.id = id;
        this.workTodo = workTodo;
        this.isCompleted = isCompleted;
    }
}

const todoInput = document.querySelector('#add-todo-input');
const filterInput = document.querySelector('#filter-todo-input');
const addGroup = document.querySelector('.add-group');
const filterGroup = document.querySelector('.filter-group');
const todosContainer = document.querySelector('.todos-container');
const searchBtn = document.querySelector('.search-btn');
const saveBtn = document.querySelector('.save-btn');
const showId = document.querySelector('.show-id');


// =================
// EVENT LISTENERS
// =================
// DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded', () => {
    const store = new Store();
    const ui = new UI();
    const todos = store.getTodosFromLocalStorage();
    todos.forEach((todo) => {
        ui.addTodo(todo);
    });
});

searchBtn.parentElement.addEventListener('click', () => {
    addGroup.style.display = 'none';
    filterGroup.style.display = 'flex';
});

saveBtn.parentElement.addEventListener('click', () => {
    addGroup.style.display = 'flex';
    filterGroup.style.display = 'none';
});

// Create todo
todoInput.addEventListener('keydown', createTodo);
// Edit Todo
todosContainer.addEventListener('click', editTodo);
// Delete Todo
todosContainer.addEventListener('click', removeTodo);
// check completed todos
todosContainer.addEventListener('click', checkCompletedTodo);
// filter todos
filterInput.addEventListener('keyup', filterTodo);

// create todo
function createTodo(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        const id = getId();
        const workTodo = todoInput.value;
        const isCompleted = null;
        const todo = new Todo(id, workTodo, isCompleted);
        const ui = new UI();
        const store = new Store();
        // validate
        if (workTodo === "") {
            ui.showAlert('Please fill the field', 'error');
            setTimeout(() => {
               UI.removeAlert('error') 
            }, 2000);   
        } else {
            ui.addTodo(todo);
            store.addTodoToLocalStorage(todo);
            ui.clearFields();
        }
    }
}

// Edit todo
function editTodo(e) {
    if (e.target.classList.contains('edit')) {
        const item = e.target.parentElement.parentElement.firstElementChild.textContent;
        const id = e.target.parentElement.parentElement.lastElementChild.textContent;
        showId.textContent = id;
        console.log(id);
        todoInput.value = item;
        todoInput.removeEventListener('keydown', createTodo);
        todoInput.addEventListener('keydown', updateTodo);
    }
}

// Update Todo
function updateTodo(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        const id = showId.textContent;
        const store = new Store();
        const ui = new UI();
        store.updateLsTodos(id);
        ui.updateUiTodos(id);
        ui.clearFields();
    }
}

// Delete todo
function removeTodo(e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.parentElement.parentElement.lastElementChild.textContent;
        const store = new Store();
        store.deleteTodo(id);
        e.target.parentElement.parentElement.remove();
    }
}

// filter todo
function filterTodo(e){
    const ul = document.querySelector('.todo-collection');
    const lis = ul.querySelectorAll('li.todo-item');
    const item = e.target.value.toLowerCase();
    lis.forEach((li) => {
        if (li.firstElementChild.innerHTML.toLowerCase().indexOf(item) > -1) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        } 
    });
}

// check completed todo
function checkCompletedTodo(e) {
    if (e.target.classList.contains('done')) {
        const store = new Store();
        const todos = store.getTodosFromLocalStorage();
        const id = e.target.parentElement.parentElement.lastElementChild.textContent;
        
        todos.forEach((todo) => {
            if (todo.id === id) {
                if (e.target.parentElement.firstElementChild.checked) {
                    todo.isCompleted = true;
                    e.target.parentElement.parentElement.firstElementChild.classList = 'done';
                } else {
                    todo.isCompleted = false;
                    e.target.parentElement.parentElement.firstElementChild.classList.remove('done');
                }
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// get random Ids
function getId() {
    return this.hex(Date.now() / 1000) +
        ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16))
}
// round up
function hex(value) {
    return Math.floor(value).toString(16)
}
