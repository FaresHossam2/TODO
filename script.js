// Define variables
let list = document.getElementById("list-container");
let input = document.getElementById("item");
let form = document.querySelector("form");
let successSound = document.getElementById("success-sound");

// Function to add a new task
function addTask() {
    // Check if input is empty
    if (input.value.trim() === "") {
        showError("Input cannot be empty.");
    } else {
        clearError(); // Clear any previous error message
        let task = {
            text: input.value.trim(), // Trimmed value
            checked: false
        };
        // Add task to tasks array
        tasks.push(task);
        // Render tasks
        renderTasks();
    }
    // Clear input after adding task
    input.value = "";
    // Save tasks to localStorage
    saveData();
}

// Function to handle input event and clear error message
input.addEventListener('input', function () {
    if (input.value.trim() !== "") {
        clearError(); // Clear error message if input has text
    }
});

// Event listener for list items and close button
list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        let index = Array.from(list.children).indexOf(e.target);
        tasks[index].checked = !tasks[index].checked;
        // Render tasks
        renderTasks();
        // Play success sound
        playSuccessSound();
        // Save tasks to localStorage
        saveData();
    } else if (e.target.tagName === "SPAN") {
        let index = Array.from(list.children).indexOf(e.target.parentElement);
        // Remove task from tasks array
        tasks.splice(index, 1);
        // Render tasks
        renderTasks();
        // Save tasks to localStorage
        saveData();
    }
});

// Function to save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to display tasks from localStorage
function showTask() {
    let tasksData = localStorage.getItem("tasks");
    if (tasksData) {
        tasks = JSON.parse(tasksData);
        renderTasks();
    }
}

// Function to render tasks
function renderTasks() {
    list.innerHTML = ""; // Clear existing list items
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
}

// Function to play success sound
function playSuccessSound() {
    successSound.play();
}

// Function to display error message
function showError(message) {
    let errorMessage = form.querySelector('.alert-error');
    if (!errorMessage) { 
        errorMessage = document.createElement('div');
        errorMessage.classList.add('alert', 'alert-danger', 'alert-error', 'mt-3');
        errorMessage.textContent = message;
        errorMessage.style.fontWeight = 'bold';
        form.insertBefore(errorMessage, input.nextElementSibling); 
    } else { 
        errorMessage.textContent = message;
    }
}

// Event listener for input field to add task on Enter key press
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask(); // Call addTask function when Enter key is pressed
    }
});

// Function to clear error message
function clearError() {
    const existingErrorMessage = form.querySelector('.alert-error');
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }
}

// Array to store tasks
let tasks = [];

// Call the showTask function to display tasks from local storage on page load
showTask();
