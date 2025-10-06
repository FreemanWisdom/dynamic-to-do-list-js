// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize an array to hold tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskTextArg = null, save = true) {
        // Use provided text (for loading) or read trimmed input
        const taskText = taskTextArg !== null ? taskTextArg : taskInput.value.trim();

        // Validate that user entered something
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item'); // ✅ added class for styling

        // Create "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // ✅ added class for styling

        // Define what happens when "Remove" is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Remove from tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append button to list item, then add item to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage if needed
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input field and refocus
        if (taskTextArg === null) {
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        tasks.forEach(task => addTask(task, false));
    }

    // Event listener for "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Event listener to add task on pressing "Enter"
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when the page loads
    loadTasks();
});
