const inputBox = document.getElementById("input-box");
const dateInput = document.getElementById("date-input");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '' || dateInput.value === '') {
        alert("You must write something and select a date!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `${inputBox.value} <span class="task-date">${dateInput.value}</span>`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    dateInput.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function filterTasks(filter) {
    let tasks = listContainer.getElementsByTagName("li");
    for (let task of tasks) {
        switch (filter) {
            case "all":
                task.style.display = "";
                break;
            case "completed":
                task.style.display = task.classList.contains("checked") ? "" : "none";
                break;
            case "pending":
                task.style.display = task.classList.contains("checked") ? "none" : "";
                break;
        }
    }
}

showTask();
