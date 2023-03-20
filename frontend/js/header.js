import { renderRegister } from "./register.js";
import { renderHome } from "./home.js";

let contentContainer = document.getElementById("content-container");
let headerContainer = document.getElementById("header-container");
let logoContainer = document.getElementById("logo-container");
let navBar = document.getElementById("nav-bar");
let loginContainer = document.getElementById("login-container");

export function renderHeader() {
  let headerLogo = document.createElement("h1");
  headerLogo.innerHTML = "Fresh Kicks";
  headerLogo.id = "header-logo";

  logoContainer.append(headerLogo);

  renderNav();
  renderLoginBar();
}

export function renderNav() {
  let navButtons = document.createElement("div");
  navButtons.id = "nav-buttons";

  let homeBtn = document.createElement("button");
  homeBtn.innerHTML = "Home";
  homeBtn.id = "home-btn";
  homeBtn.className = "nav-btn";

  homeBtn.addEventListener("click", () => {
    contentContainer.innerHTML = "";
    renderHome();
  });

  let aboutBtn = document.createElement("button");
  aboutBtn.innerHTML = "About";
  aboutBtn.id = "about-btn";
  aboutBtn.className = "nav-btn";

  let registerBtn = document.createElement("button");
  registerBtn.innerHTML = "Register";
  registerBtn.id = "register-btn";
  registerBtn.className = "nav-btn";

  registerBtn.addEventListener("click", () => {
    contentContainer.innerHTML = "";
    renderRegister();
  });

  navBar.append(navButtons);
  navButtons.append(homeBtn);
  navButtons.append(aboutBtn);
  navButtons.append(registerBtn);
}

export function renderLoginBar() {
  let loginBar = document.createElement("form");
  loginBar.id = "login-bar";

  let usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.id = "username-input";
  usernameInput.placeholder = "Username";

  let passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password-input";
  passwordInput.placeholder = "Password";

  let loginBtn = document.createElement("button");
  loginBtn.innerHTML = "Login";
  loginBtn.id = "login-btn";

  loginContainer.append(loginBar);
  loginBar.append(usernameInput);
  loginBar.append(passwordInput);
  loginBar.append(loginBtn);
}
