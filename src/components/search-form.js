export function createSearchForm() {
    return `
        <section class="search-section">
            <form id="search-form" class="search-form">
                <label for="city-input" class="sr-only">
                    Nome da cidade
                </label>

                <input
                    id="city-input"
                    name="city"
                    type="text"
                    placeholder="Insira uma cidade para a busca"
                    autocomplete="off"
                    required
                />

                <button id="search-button" type="submit">
                    Buscar
                </button>
            </form>

            <p
                id="form-message"
                class="form-message"
                aria-live="polite"
            ></p>
        </section>
    `;
}

export function registerSearchEvents(onSearch) {
    const searchForm =
        document.querySelector('#search-form');

    const cityInput =
        document.querySelector('#city-input');

    if (!searchForm || !cityInput) {
        throw new Error(
            'O formulário de pesquisa não foi encontrado.',
        );
    }

    searchForm.addEventListener(
        'submit',
        async function (event) {
            event.preventDefault();

            const city = cityInput.value.trim();

            if (!city) {
                setFormMessage(
                    'Digite o nome de uma cidade.',
                    'error',
                );

                return;
            }

            await onSearch(city);
        },
    );
}

export function setFormMessage(message, type = '') {
    const formMessage =
        document.querySelector('#form-message');

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;
    formMessage.className = 'form-message';

    if (type) {
        formMessage.classList.add(
            'form-message--' + type,
        );
    }
}

export function setSearchLoading(isLoading) {
    const searchButton =
        document.querySelector('#search-button');

    if (!searchButton) {
        return;
    }

    searchButton.disabled = isLoading;

    searchButton.textContent = isLoading
        ? 'Buscando...'
        : 'Buscar';
}