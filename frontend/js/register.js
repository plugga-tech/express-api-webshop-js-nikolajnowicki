import { renderHome } from "./home.js";

let contentContainer = document.getElementById("content-container");

export function renderRegister() {
  let RegisterPageContainer = document.createElement("div");
  RegisterPageContainer.id = "register-page-container";

  let registerPageTitle = document.createElement("h1");
  registerPageTitle.innerHTML = "Register";
  registerPageTitle.id = "register-page-title";

  contentContainer.append(RegisterPageContainer);
  RegisterPageContainer.append(registerPageTitle);

  renderRegisterInputs();
}

export function renderRegisterInputs() {
  let registerFormContainer = document.createElement("div");
  registerFormContainer.id = "register-form-container";

  let registerForm = document.createElement("form");
  registerForm.id = "register-form";

  let regNameLabel = document.createElement("label");
  regNameLabel.textContent = "Name ";
  regNameLabel.setAttribute("for", "reg-name-input");

  let regNameInput = document.createElement("input");
  regNameInput.type = "text";
  regNameInput.id = "reg-name-input";
  regNameInput.required = true;

  let regUsernameLabel = document.createElement("label");
  regUsernameLabel.textContent = "E-Mail";
  regUsernameLabel.setAttribute("for", "reg-username-input");

  let regUsernameInput = document.createElement("input");
  regUsernameInput.type = "text";
  regUsernameInput.id = "reg-username-input";
  regUsernameInput.required = true;

  let regPasswordLabel = document.createElement("label");
  regPasswordLabel.textContent = "Password ";
  regPasswordLabel.setAttribute("for", "reg-password-input");

  let regPasswordInput = document.createElement("input");
  regPasswordInput.type = "password";
  regPasswordInput.id = "reg-password-input";
  regPasswordInput.required = true;

  let regMailLabel = document.createElement("label");
  regMailLabel.textContent = "E-mail ";
  regMailLabel.setAttribute("for", "reg-mail-input");

  let regMailInput = document.createElement("input");
  regMailInput.type = "email";
  regMailInput.id = "reg-mail-input";
  regMailInput.required = true;

  let regButton = document.createElement("button");
  regButton.id = "reg-button";
  regButton.textContent = "Register";
  regButton.type = "submit";

  regButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let user = {
      email: regUsernameInput.value,
      password: regPasswordInput.value,
      name: regNameInput.value,
    };
    let response = await fetch("http://localhost:3000/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      alert("Account Created");
      renderHome();
    } else {
      alert("Account Creation Failed");
    }
  });

  contentContainer.append(registerFormContainer);
  registerFormContainer.append(registerForm);
  registerForm.appendChild(regNameLabel);
  registerForm.appendChild(regNameInput);
  registerForm.appendChild(regUsernameLabel);
  registerForm.appendChild(regUsernameInput);
  registerForm.appendChild(regPasswordLabel);
  registerForm.appendChild(regPasswordInput);
  registerForm.append(regButton);
}
