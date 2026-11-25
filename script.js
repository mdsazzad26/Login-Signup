const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const nameField = document.getElementById("nameField");
const confirmField = document.getElementById("confirmField");
const rememberRow = document.getElementById("rememberRow");
const forgotLink = document.getElementById("forgotLink");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const submitBtn = document.getElementById("submitBtn");
const switchCopy = document.getElementById("switchCopy");
const switchBtn = document.getElementById("switchBtn");
const authForm = document.getElementById("authForm");
const message = document.getElementById("message");
const password = document.getElementById("password");
let isSignup = false;

function setMode(signup) {
  isSignup = signup;
  loginTab.classList.toggle("active", !signup);
  signupTab.classList.toggle("active", signup);
  loginTab.setAttribute("aria-selected", String(!signup));
  signupTab.setAttribute("aria-selected", String(signup));
  nameField.hidden = !signup;
  confirmField.hidden = !signup;
  rememberRow.hidden = signup;
  forgotLink.hidden = signup;
  formTitle.textContent = signup ? "Create your account" : "Sign in to your account";
  formSubtitle.textContent = signup ? "Fill in the details to get started." : "Enter your details to continue.";
  submitBtn.textContent = signup ? "Create account" : "Sign in";
  switchCopy.firstChild.textContent = signup ? "Already have an account? " : "Don't have an account? ";
  switchBtn.textContent = signup ? "Login" : "Sign up";
  password.autocomplete = signup ? "new-password" : "current-password";
  message.textContent = "";
  message.className = "message";
}
loginTab.addEventListener("click", () => setMode(false));
signupTab.addEventListener("click", () => setMode(true));
switchBtn.addEventListener("click", () => setMode(!isSignup));

document.getElementById("togglePassword").addEventListener("click", function () {
  const show = password.type === "password";
  password.type = show ? "text" : "password";
  this.textContent = show ? "Hide" : "Show";
  this.setAttribute("aria-label", show ? "Hide password" : "Show password");
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const pass = password.value;
  message.className = "message error";

  if (!email || !pass) {
    message.textContent = "Please enter your email and password.";
    return;
  }
  if (isSignup) {
    const name = document.getElementById("name").value.trim();
    const confirm = document.getElementById("confirmPassword").value;
    if (!name) { message.textContent = "Please enter your full name."; return; }
    if (pass.length < 6) { message.textContent = "Password must be at least 6 characters."; return; }
    if (pass !== confirm) { message.textContent = "Passwords do not match."; return; }
    message.className = "message";
    message.textContent = "Demo signup successful! Connect a backend for real accounts.";
  } else {
    message.className = "message";
    message.textContent = "Demo form submitted! Real login needs a backend.";
  }
});

forgotLink.addEventListener("click", (event) => {
  event.preventDefault();
  message.className = "message";
  message.textContent = "Password reset needs an email service/backend.";
});
