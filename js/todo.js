const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");

const TODOS_KEY = "todos";

let toDos = [];
let currentFilter = "all";

// Save todo function
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// Delete todo function
function deleteToDo(event) {
  const li = event.target.closest("li");
  const todoId = parseInt(li.id);
  
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== todoId);
  saveToDos();
  updateLayoutClass();
}

// Toggle todo completion status function
function toggleToDoComplete(event) {
  const li = event.target.closest("li");
  const todoId = parseInt(li.id);
  const todo = toDos.find(t => t.id === todoId);
  
  if (todo) {
    todo.completed = !todo.completed;
    li.classList.toggle("completed", todo.completed);
    saveToDos();
  }
}

// Edit todo function
function editToDo(event) {
  const li = event.target.closest("li");
  const todoId = parseInt(li.id);
  const todo = toDos.find(t => t.id === todoId);
  
  if (!todo) return;
  
  const span = li.querySelector(".todo-text");
  const currentText = span.innerText;
  
  // Create input field
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-input";
  input.style.cssText = `
    flex: 1;
    margin-right: 10px;
    padding: 12px 18px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
    font-weight: 400;
    min-height: 44px;
    box-sizing: border-box;
  `;
  
  // Create save button
  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";
  saveBtn.className = "todo-btn save";
  saveBtn.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 10px 14px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
    font-weight: 500;
    min-height: 44px;
    min-width: 60px;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;
  
  // Create cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.className = "todo-btn cancel";
  cancelBtn.style.cssText = `
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    padding: 10px 14px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
    font-weight: 500;
    min-height: 44px;
    min-width: 60px;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;
  
  // Replace existing text with input field
  span.replaceWith(input);
  
  // Replace existing buttons with save/cancel buttons
  const actions = li.querySelector(".todo-actions");
  actions.innerHTML = "";
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  
  // Focus on input field
  input.focus();
  input.select();
  
  // Save button event
  saveBtn.addEventListener("click", () => {
    const newText = input.value.trim();
    if (newText) {
      todo.text = newText;
      saveToDos();
      renderToDos(); // Re-render entire list
    }
  });
  
  // Cancel button event
  cancelBtn.addEventListener("click", () => {
          renderToDos(); // Re-render entire list
  });
  
  // Save with Enter key
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    }
  });
  
  // Cancel with Escape key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cancelBtn.click();
    }
  });
}

// Todo rendering function
function paintToDo(toDoObj) {
  const li = document.createElement("li");
  li.id = toDoObj.id;
  
  if (toDoObj.completed) {
    li.classList.add("completed");
  }
  
  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = toDoObj.completed || false;
  checkbox.addEventListener("change", toggleToDoComplete);
  
  // Todo text
  const span = document.createElement("span");
  span.innerText = toDoObj.text;
  span.className = "todo-text";
  
  // Button container
  const actions = document.createElement("div");
  actions.className = "todo-actions";
  
  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.innerText = toDoObj.completed ? "Active" : "Complete";
  completeBtn.className = `todo-btn complete ${toDoObj.completed ? 'active' : ''}`;
  completeBtn.addEventListener("click", toggleToDoComplete);
  
  // Edit button
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "todo-btn edit";
  editBtn.addEventListener("click", editToDo);
  
  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "todo-btn delete";
  deleteBtn.addEventListener("click", deleteToDo);
  
  // Add buttons to actions
  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  
  // Add all elements to li
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);
  
  toDoList.appendChild(li);
}

// Todo submission handling function
function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value.trim();
  
  if (!newToDo) return;
  
  toDoInput.value = "";
  const newTodoObj = {
    text: newToDo,
    id: Date.now(),
    completed: false
  };
  
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
  updateLayoutClass();
}

// Layout class update function
function updateLayoutClass() {
  const mainContainer = document.querySelector('.main-container');
  if (toDos.length > 0) {
    mainContainer.classList.add('has-todos');
  } else {
    mainContainer.classList.remove('has-todos');
  }
}

// Filtered todo rendering function
function renderToDos() {
  toDoList.innerHTML = "";
  
  let filteredToDos = toDos;
  
  if (currentFilter === "active") {
    filteredToDos = toDos.filter(todo => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredToDos = toDos.filter(todo => todo.completed);
  }
  
  filteredToDos.forEach(paintToDo);
  updateLayoutClass();
}

// Filter button click event
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove existing active class
    filterButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to clicked button
    button.classList.add("active");
    
    // Set filter
    currentFilter = button.dataset.filter;
    
    // Re-render todo list
    renderToDos();
  });
});

// Register event listeners
toDoForm.addEventListener("submit", handleToDoSubmit);

// Load saved todos
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos.map(todo => ({
    ...todo,
    completed: todo.completed || false // Backward compatibility
  }));
  renderToDos();
  updateLayoutClass();
}

// Complete Todo state reset function for logout
function resetTodoState() {
  toDos = [];
  toDoList.innerHTML = "";
  currentFilter = "all";
  
  // Reset filter buttons
  filterButtons.forEach(btn => btn.classList.remove("active"));
  filterButtons[0].classList.add("active"); // Activate "All" button
  
  // Remove layout class to restore center alignment
  const mainContainer = document.querySelector('.main-container');
  if (mainContainer) {
    mainContainer.classList.remove('has-todos');
  }
}

// Expose as global function (called from greetings.js)
window.resetTodoState = resetTodoState;

