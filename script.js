let list = document.getElementById("list-container");
let input = document.getElementById("item");
let form = document.querySelector("form");
let successSound = document.getElementById("success-sound");


function addTask() {
    if (input.value === "") {
        showError("Input cannot be empty.");
    } else {
        clearError();
        let li = document.createElement("li");
        li.textContent = input.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = "";

    saveData();
}

// Add event listener to input for hiding error message when input has text
input.addEventListener('input', function () {
    if (input.value.trim() !== "") {
        clearError(); // Clear error message if input has text
    }
});


list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        if (!e.target.classList.contains("checked")) {
            playSuccessSound();
        }

        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData() {
    const tasks = [];
    list.querySelectorAll("li").forEach(task => {
        tasks.push({
            content: task.textContent,
            checked: task.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function showTask() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.content;
            if (task.checked) {
                li.classList.add("checked");
            }
            const span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            list.appendChild(li);
        });
    }
}


function playSuccessSound() {
    successSound.play();
}
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

showTask();

