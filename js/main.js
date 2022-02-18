const input = document.querySelector('.todo__input');
const todoAdd = document.querySelector('.todo__add');
const todoContent = document.querySelector('.todo-content');

let todoArray;
!localStorage.todo ? todoArray = [] : todoArray = JSON.parse(localStorage.getItem('todo'));

const addTodo = () => {
    if(input.value !== ''){
        let todoItem = {
            description: input.value,
            completed: false
        };
        todoArray.push(todoItem);
        upadateLocalStorage();
        updateTodoTemplate();
    };
};
todoAdd.addEventListener('click', addTodo);
input.addEventListener('keydown', e=>{
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.keyCode === 13) {
        addTodo();
    };
});

const upadateLocalStorage = () => localStorage.setItem('todo', JSON.stringify(todoArray));

const updateTodoTemplate = () => {
    todoContent.innerHTML = '';
    
    if(localStorage.todo){
        JSON.parse(localStorage.getItem('todo')).map((item, i)=>{
            let todoTemplate = `
            <div class="todo-item">
                <label class="todo-label">
                    <input class="todo__real-checkbox" type="checkbox">
                    <span onclick="completeTodo(${i})" class="todo__fake-checkbox ${item.completed ? 'checked' : ''}"></span>
                    <p onclick="completeTodo(${i})" class="todo__text ${item.completed ? 'checked' : ''}">${item.description}</p>
                </label>
                <svg onclick="deleteTodo(${i})" class="todo__delete svg" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11" />
                    <path d="M10 17V11" />
                    <path d="M14 17V11" />
                    <path d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7" />
                </svg>
            </div>
            `;
            input.value = '';
            todoContent.innerHTML += todoTemplate;
        });
    }
};
updateTodoTemplate();

const completeTodo = (i) => {
    todoArray[i].completed = !todoArray[i].completed;
    todoContent.children[i].querySelector('.todo__fake-checkbox').classList.toggle('checked');
    todoContent.children[i].querySelector('.todo__text').classList.toggle('checked');
    upadateLocalStorage();
};

const deleteTodo = (i) => {
    todoArray.splice(i, 1);
    upadateLocalStorage();
    updateTodoTemplate();
};