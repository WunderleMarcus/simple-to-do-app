let tasks = []; // Array für alle Aufgaben

// Funktion zum Hinzufügen einer neuen Aufgabe
function addTask() {
    const taskDescription = prompt("Gib die Aufgabenbeschreibung ein:");
    const dueDate = prompt("Gib das Fälligkeitsdatum ein (z.B. 14.10.2024):");
    const priority = prompt("Gib die Priorität an (hoch, mittel, niedrig):").toLowerCase();

    if (taskDescription && dueDate && priority) {
        const task = {
            description: taskDescription,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };
        tasks.push(task);
        renderTasks(); // Aktualisiere die Aufgabenliste
    } else {
        alert("Bitte alle Felder ausfüllen!");
    }
}

// Funktion zum Aufgaben-Rendering
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Leeren der aktuellen Liste

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        
        // Checkbox für die Aufgabe
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${index}`;
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));
        
        // Label für die Aufgabe
        const label = document.createElement("label");
        label.setAttribute("for", `task-${index}`);
        label.innerHTML = `${task.description} <span class="due-date">Fällig: ${task.dueDate}</span>`;
        
        // Prioritätsanzeige
        const prioritySpan = document.createElement("span");
        prioritySpan.className = `priority ${task.priority}`;
        prioritySpan.innerText = capitalizeFirstLetter(task.priority);
        
        // Löschen-Button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Löschen";
        deleteBtn.onclick = () => deleteTask(index);
        
        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        taskElement.appendChild(prioritySpan);
        taskElement.appendChild(deleteBtn);
        taskList.appendChild(taskElement);
    });

    updateProgress();
}

// Funktion zur Aktualisierung des Fortschrittsbalkens und Textes
function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    
    progressText.innerText = `Fortschritt: ${completedTasks} von ${totalTasks} Aufgaben erledigt`;
    progressBar.max = totalTasks;
    progressBar.value = completedTasks;
}

// Funktion zum Markieren einer Aufgabe als erledigt/nicht erledigt
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateProgress();
}

// Funktion zum Löschen einer Aufgabe
function deleteTask(index) {
    tasks.splice(index, 1); // Entferne Aufgabe aus dem Array
    renderTasks(); // Aktualisiere die Liste
}

// Funktion zum Filtern von Aufgaben nach Priorität
function filterTasks(priority) {
    if (priority === 'alle') {
        renderTasks();
    } else {
        const filteredTasks = tasks.filter(task => task.priority === priority);
        renderFilteredTasks(filteredTasks);
    }
}

// Funktion zum Rendering gefilterter Aufgaben
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Leeren der aktuellen Liste

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${index}`;
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));
        
        const label = document.createElement("label");
        label.setAttribute("for", `task-${index}`);
        label.innerHTML = `${task.description} <span class="due-date">Fällig: ${task.dueDate}</span>`;
        
        const prioritySpan = document.createElement("span");
        prioritySpan.className = `priority ${task.priority}`;
        prioritySpan.innerText = capitalizeFirstLetter(task.priority);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Löschen";
        deleteBtn.onclick = () => deleteTask(index);
        
        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        taskElement.appendChild(prioritySpan);
        taskElement.appendChild(deleteBtn);
        taskList.appendChild(taskElement);
    });
}

// Funktion zum Großschreiben des ersten Buchstabens (für die Priorität)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
