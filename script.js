// script.js

// Ensure all DOM elements are available before running code
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements (naming as required)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array from Local Storage (or empty array if none)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    /**
     * addTask
     * Adds a task to the DOM and optionally saves it to Local Storage.
     * 
     * @param {string|null} taskTextArg - If provided, use this text (used when loading from storage).
     * @param {boolean} save - If true, persist the added task to Local Storage.
     */
    function addTask(taskTextArg = null, save = true) {
        // Determine the task text: if no argument, read from input field
        const rawText = taskTextArg !== null ? taskTextArg : taskInput.value;
        const taskText = String(rawText).trim();

        // If empty, alert user and do nothing
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When remove button clicked: remove from DOM and update Local Storage
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove first matching occurrence from tasks array and update storage
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        // Append remove button to list item, and list item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If required, save the task to tasks array and Local Storage
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field if the user typed the task (not when loading from storage)
        if (taskTextArg === null) {
            taskInput.value = '';
            taskInput.focus();
        }
    }

    /**
     * loadTasks
     * Loads tasks from the 'tasks' array (already initialized from Local Storage)
     * and populates the DOM by calling addTask(taskText, false) for each stored task.
     */
    function loadTasks() {
        // Clear the current list (in case this is called more than once)
        taskList.innerHTML = '';

        // If no tasks, nothing to do
        if (!Array.isArray(tasks) || tasks.length === 0) {
            return;
        }

        // Add each stored task to the DOM without re-saving to Local Storage
        tasks.forEach(storedTaskText => {
            addTask(storedTaskText, false);
        });
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener('click', () => {
        addTask(); // reads from the input and saves to Local Storage
    });

    // Allow adding tasks using the Enter key while typing in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent form submission if any
            addTask();
        }
    });

    // Load existing tasks from Local Storage when the page loads
    loadTasks();

});
