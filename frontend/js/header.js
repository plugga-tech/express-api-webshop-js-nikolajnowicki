import { renderRegister } from "./register.js";
import { renderHome } from "./home.js";
import { renderAbout } from "./about.js";

let contentContainer = document.getElementById("content-container");
let headerContainer = document.getElementById("header-container");
let logoContainer = document.getElementById("logo-container");
let navBar = document.getElementById("nav-bar");
let loginContainer = document.getElementById("login-container");

export function renderHeader() {
  let headerLogoImg = document.createElement("img");
  headerLogoImg.src = "./public/images/sneaker-logo.png";
  headerLogoImg.id = "header-logo-img";

  let headerLogo = document.createElement("h1");
  headerLogo.innerHTML = "Fresh Kicks";
  headerLogo.id = "header-logo";

  logoContainer.append(headerLogoImg);
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

  aboutBtn.addEventListener("click", () => {
    contentContainer.innerHTML = "";
    renderAbout();
  });

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

  loginBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
      const email = usernameInput.value;
      const password = passwordInput.value;

      console.log(email, password);

      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        alert("Logged in successfully!");
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to log in: ${err.message}`);
    }
  });

  loginContainer.append(loginBar);
  loginBar.append(usernameInput);
  loginBar.append(passwordInput);
  loginBar.append(loginBtn);
}
