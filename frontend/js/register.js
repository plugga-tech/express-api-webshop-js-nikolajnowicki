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

  let regUsernameLabel = document.createElement("label");
  regUsernameLabel.textContent = "User name ";
  regUsernameLabel.setAttribute("for", "reg-username-input");

  let regUsernameInput = document.createElement("input");
  regUsernameInput.type = "text";
  regUsernameInput.id = "reg-username-input";
  regUsernameInput.placeholder = "User Name";
  regUsernameInput.required = true;

  let regPasswordLabel = document.createElement("label");
  regPasswordLabel.textContent = "Password ";
  regPasswordLabel.setAttribute("for", "reg-password-input");

  let regPasswordInput = document.createElement("input");
  regPasswordInput.type = "password";
  regPasswordInput.id = "reg-password-input";
  regPasswordInput.placeholder = "Password";
  regPasswordInput.required = true;

  let regNameLabel = document.createElement("label");
  regNameLabel.textContent = "First Name ";
  regNameLabel.setAttribute("for", "reg-name-input");

  let regNameInput = document.createElement("input");
  regNameInput.type = "text";
  regNameInput.id = "reg-name-input";
  regNameInput.placeholder = "First Name";
  regNameInput.required = true;

  let regLastNameLabel = document.createElement("label");
  regLastNameLabel.textContent = "Last Name ";
  regLastNameLabel.setAttribute("for", "reg-last-name-input");

  let regLastNameInput = document.createElement("input");
  regLastNameInput.type = "text";
  regLastNameInput.id = "reg-last-name-input";
  regLastNameInput.placeholder = "Last Name";
  regLastNameInput.required = true;

  let regPhoneNumberLabel = document.createElement("label");
  regPhoneNumberLabel.textContent = "Phone Number ";
  regPhoneNumberLabel.setAttribute("for", "reg-phone-number-input");

  let regPhoneNumberInput = document.createElement("input");
  regPhoneNumberInput.type = "tel";
  regPhoneNumberInput.type = "number";
  regPhoneNumberInput.id = "reg-phone-number-input";
  regPhoneNumberInput.placeholder = "Phone Number";
  regPhoneNumberInput.required = true;

  let regMailLabel = document.createElement("label");
  regMailLabel.textContent = "E-mail ";
  regMailLabel.setAttribute("for", "reg-mail-input");

  let regMailInput = document.createElement("input");
  regMailInput.type = "email";
  regMailInput.id = "reg-mail-input";
  regMailInput.placeholder = "E-mail";
  regMailInput.required = true;

  contentContainer.append(registerFormContainer);
  registerFormContainer.append(registerForm);
  registerForm.appendChild(regUsernameLabel);
  registerForm.appendChild(regUsernameInput);
  registerForm.appendChild(regPasswordLabel);
  registerForm.appendChild(regPasswordInput);
  registerForm.appendChild(regNameLabel);
  registerForm.appendChild(regNameInput);
  registerForm.appendChild(regLastNameLabel);
  registerForm.appendChild(regLastNameInput);
  registerForm.appendChild(regPhoneNumberLabel);
  registerForm.appendChild(regPhoneNumberInput);
  registerForm.appendChild(regMailLabel);
  registerForm.appendChild(regMailInput);
}
