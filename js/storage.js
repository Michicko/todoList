class Store {

    // Add todo to local storage
    addTodoToLocalStorage(todo) {
        const todos = this.getTodosFromLocalStorage();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Get todos from localstorage
    getTodosFromLocalStorage() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }

    // Update todos
    updateLsTodos(id) {
        const todos = this.getTodosFromLocalStorage();
        todos.forEach((todo) => {
            if (id === todo.id) {
                todo.workTodo = todoInput.value;
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // delete todo
    deleteTodo(id) {
        const todos = this.getTodosFromLocalStorage();
        todos.forEach((todo, i) => {
            if (id === todo.id) {
                todos.splice(i, 1);
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    
}