import App from "./App.js";

const $app = document.querySelector("#App");

new App($app);

const darkToggleCheckbox = document.querySelector("#dark-toggle");

darkToggleCheckbox.addEventListener("change", (event) => {
    document.body.classList.toggle("dark-mode", event.target.checked);
})