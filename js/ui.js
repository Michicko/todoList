class UI {

    // Add todo
    addTodo(todo) {
        const ul = document.querySelector('.todo-collection');
        let html = `
        <li class="todo-item">
            <div class="${this.completedTodo(todo).status}">${todo.workTodo}</div>
            <div>
              <input type="checkbox" id="done" class="done" ${this.completedTodo(todo).check}/>
              <i class="fa fa-edit edit"></i>
              <i class="fa fa-trash delete"></i>
            </div>
            <div id="id">${todo.id}</div>
          </li>
        `;
        ul.innerHTML += html;
    }

    // show alert
    showAlert(msg, className) {
        const div = document.createElement('div');
        div.classList = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.navbar .container');
        const filterGroup = document.querySelector('.filter-group');
        UI.removeAlert(className);
        filterGroup.parentNode.insertBefore(div, filterGroup.nextSibling);
    }

    // update todos
    updateUiTodos(id) {
        const ul = document.querySelector('.todo-collection');
        const lis = ul.querySelectorAll('li.todo-item');
        lis.forEach((li) => {
            if (id === li.lastElementChild.textContent) {
                li.firstElementChild.textContent = todoInput.value;
            }
        });
    }

    // clear fields
    clearFields() {
        todoInput.value = '';
    }

    // remove alert
    static removeAlert(className) {
        const filterGroup = document.querySelector('.filter-group');
        if (filterGroup.nextElementSibling.classList.contains(className)) {
            filterGroup.nextElementSibling.remove();
        }
    }

    // checked
    completedTodo(todo) {
        if (todo.isCompleted) {
            return {
                check: 'checked',
                status: 'done'
            }
        } else {
            return {
                check: '',
                status: ''
            }
        }
    }
}