const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const logoutBtn = document.querySelector("#logout-btn");
const todoSection = document.querySelector(".todo-section");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior 
  
  // Hide login form
  loginForm.classList.add(HIDDEN_CLASSNAME);
  loginForm.style.display = "none"; // Hide immediately
  
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
  
  // Show todo section (including input field and filter buttons)
  setTimeout(() => {
    todoSection.classList.add("show");
    todoSection.style.display = "block"; // Show section
  }, 300);
}

function paintGreetings(username){
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME); // Show the greeting
  greeting.style.display = "block"; // Show greeting
  logoutBtn.classList.remove(HIDDEN_CLASSNAME); // Show the logout button
  logoutBtn.style.display = "block"; // Show logout button
}

// Logout function - Apple-style clean state reset
function onLogout() {
  // Clean instant logout - no flickering
  
  // Remove username
  localStorage.removeItem(USERNAME_KEY);
  
  // Hide all elements immediately (remove animations)
  greeting.style.display = "none";
  logoutBtn.style.display = "none";
  todoSection.style.display = "none";
  
  // Show login form immediately
  loginForm.style.display = "flex";
  loginInput.value = "";
  
  // Complete Todo state reset (call function from Todo.js)
  if (window.resetTodoState) {
    window.resetTodoState();
  }
  
  // Remove all Todo data from localStorage
  localStorage.removeItem("todos");
  
  // Remove has-todos class from main-container to restore center alignment
  const mainContainer = document.querySelector(".main-container");
  if (mainContainer) {
    mainContainer.classList.remove("has-todos");
  }
}

// Check for new user and show login form
function checkAndShowLogin() {
  const savedUsername = localStorage.getItem(USERNAME_KEY);
  
  if(savedUsername === null) {
    // New user: show only login form, hide todo section
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.style.display = "flex"; // Show form
    greeting.classList.add(HIDDEN_CLASSNAME);
    greeting.style.display = "none"; // Hide greeting
    logoutBtn.classList.add(HIDDEN_CLASSNAME);
    logoutBtn.style.display = "none"; // Hide logout button
    todoSection.classList.remove("show"); // Hide todo input field and filter buttons
    todoSection.style.display = "none"; // Hide todo section
    loginForm.addEventListener("submit", onLoginSubmit);
  } else {
    // Existing user: show both greeting and todo section
    paintGreetings(savedUsername);
    todoSection.classList.add("show"); // Show todo input field and filter buttons
    todoSection.style.display = "block"; // Show todo section
  }
}

// Logout button event listener
logoutBtn.addEventListener("click", onLogout);

// Execute when page loads
document.addEventListener('DOMContentLoaded', () => {
  checkAndShowLogin();
});