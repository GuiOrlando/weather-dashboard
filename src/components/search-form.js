export function createSearchForm() {
    return `
    
        <section class="search-section">
            <form id="search-form" class="search-form">
                <label for="city-input" class="sr-only">
                    Nome da Cidade
                </label>

                <input
                    id="city-input"
                    name="city"
                    type="text"
                    placeholder="Insira uma Cidade para a busca"
                    autocomplete="off"
                    required
                />

                <button type="submit">
                    Buscar
                </button>
            </form>

            <p
                if="form-message"
                class="form-message"
                aria-live="polite"
            ></p>

    `;
}

export function registerSearchEvents() {
    const searchForm = document.querySelector("#search-form");
    const cityInput = document.querySelector("#city-input");
    const formMessage = document.querySelector("#form-message");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const city = cityInput.value.trim();

        if (!city) {
            formMessage.textContent =
                "Insira o nome de uma cidade.";

            return;
        }

        formMessage.textContent =
            `Buscando informações para ${city}...`;
    });
}