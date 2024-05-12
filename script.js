let list = document.getElementById("list-container");
let input = document.getElementById("item");
let clearButton = document.querySelector(".clear");
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
        span.innerHTML= "\u00d7";
        li.appendChild(span);
    }
    saveData();
    input.value = "";
}
// Add event listener to input for hiding error message when input has text
input.addEventListener('input', function() {
    if (input.value.trim() !== "") {
        clearError(); // Clear error message if input has text
    }
});

//clear all data
clearButton.addEventListener("click", function() {
    localStorage.clear("tasks");
    list.innerHTML = "";
    clearButton.style.display = "none"; // Hide clear button
});

list.addEventListener("click", function(e) {
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
    localStorage.setItem("tasks", list.innerHTML);
    showClearButton(); // Update clear button visibility
}

function showTask() {
    list.innerHTML = localStorage.getItem("tasks");
    showClearButton(); // Update clear button visibility
}

function showClearButton() {
    // Check if list has any tasks
    if (list.getElementsByTagName("li").length > 0) {
        clearButton.style.display = "block"; // Show clear button
    } else {
        clearButton.style.display = "none"; // Hide clear button
    }
}
function playSuccessSound() {
    successSound.play();
}
function showError(message) {
    // Check if error message already exists
    let errorMessage = form.querySelector('.alert-error');
    if (!errorMessage) { // If error message doesn't exist, create and append it
        errorMessage = document.createElement('div');
        errorMessage.classList.add('alert', 'alert-danger', 'alert-error', 'mt-3');
        errorMessage.textContent = message;
        errorMessage.style.fontWeight = 'bold';
        form.insertBefore(errorMessage, input.nextElementSibling); // Insert after the input element
    } else { // Update existing error message
        errorMessage.textContent = message;
    }
}




// Function to clear error message
function clearError() {
    const existingErrorMessage = form.querySelector('.alert-error');
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }
}
showTask();

