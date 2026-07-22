import { createAppHeader } from "./components/app-header.js";
import { createSearchForm } from "./components/search-form.js";
import { createCurrentWeather } from "./components/current-weather.js";
import { createForecastList } from "./components/forecast-list.js";
import { createAppFooter } from "./components/app-footer.js";

export function renderApp(element) {
    element.innerHTML = `
        <main class="app-container">
            ${createAppHeader()}
            ${createSearchForm()}
            ${createCurrentWeather()}
            ${createForecastList()}
            ${createAppFooter()}
        </main>
    `;
}