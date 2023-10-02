const taskInput = document.getElementById('task');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Function to add a task to the list and save it to localStorage
function addTask(taskText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button>Delete</button>
    `;
    taskList.appendChild(listItem);
    taskInput.value = '';

    const deleteButton = listItem.querySelector('button');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        updateLocalStorage();
    });

    updateLocalStorage();
}

// Function to update tasks in localStorage
function updateLocalStorage() {
    const tasks = [];
    const taskElements = taskList.querySelectorAll('li');
    taskElements.forEach((taskElement) => {
        tasks.push(taskElement.querySelector('span').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((taskText) => {
        addTask(taskText);
    });
}

// Add event listener for the Add button
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
    }
});

// Load tasks from localStorage when the page loads
window.addEventListener('load', loadTasks);
