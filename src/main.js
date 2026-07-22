import "./styles/index.css";
import { renderApp } from "./app.js";
import { registerSearchEvents } from "./components/search-form.js";

const appElement = document.querySelector("#app");

if (!appElement) {
  throw new Error(
    "Elemento principal da aplicação não encontrado.",
  );
}

renderApp(appElement);
registerSearchEvents();