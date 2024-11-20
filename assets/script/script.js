const inputTask = document.querySelector(".input-task");
const buttonAddTask = document.querySelector(".button-add-task");
const tasks = document.querySelector(".tasks")
const box = document.querySelector(".box");

let toDoListSize = 0;

buttonAddTask.addEventListener('click', function(event){
    addTask(inputTask.value);
    clearInput();
    saveTasks();
})

inputTask.addEventListener('keypress', function(event){
    
    if(event.key === 'Enter') {
        addTask(inputTask.value);
        clearInput();
        saveTasks();
    }
})

inputTask.addEventListener('click', function(event){
    box.classList.remove('error-box');
    box.innerHTML = "";
})

function clearInput(){
    inputTask.value = '';
    inputTask.focus();
}

function createListItem(){
    return document.createElement('li');
}

function createDiv(){
    return document.createElement('div');
}

function createP(){
    return document.createElement('p');
}

function createTask(value){
    const li = createListItem();
    li.innerText = value;
    return li;
}

function addTask(value){

    if(toDoListSize === 15) {
        alertFullList();
        return;
    }

    try {
        validateInput(value);
        const li = createTask(value);
        tasks.appendChild(li);
        createDeleteButton(li);
        toDoListSize += 1;
        saveTasks();
    }
    catch (Error){
        return;
    }
}

function createDeleteButton(li){
    li.innerText += " ";
    const button = document.createElement('button');
    button.classList.add('delete');
    button.innerText = "delete"
    li.appendChild(button);
}

function validateInput(value){
    if(!value){
        throw new Error("Valor não pode ser vazio");
    }
}

document.addEventListener('click', function(event){
    const element = event.target;
    if(element.classList.contains('delete')){
        element.parentElement.remove();
        toDoListSize -= 1;
        box.innerText = "";
        saveTasks();
        
    }
})

/* document.addEventListener('click', function(event){
    const element = event.target;
    if(element.classList.contains('completed')){
        const parent = element.parentElement;
        const elementS = document.createElement('s');
        elementS.innerHTML = parent.innerHTML;
        parent.innerHTML = '';
        parent.appendChild(elementS);
    }
}) */

function saveTasks(){
    const liTasksItems = tasks.querySelectorAll('li');
    const tasksItems = [];

    for(let task of liTasksItems){
        let taskContent = task.innerText;
        taskContent = taskContent.replace('delete', " ").trim();
        tasksItems.push(taskContent);
    }

    const tasksJSON = JSON.stringify(tasksItems);
    localStorage.setItem('tasks', tasksJSON);
}

function readStorageTasks(){
    const tasksItems = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasksItems);

    for(let task of taskList){
        addTask(task);
    }
}

function alertFullList(){
    box.innerText = "lista está cheia";
}

readStorageTasks();