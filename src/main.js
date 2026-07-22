import './styles/index.css';
import { renderApp } from './app.js';

import {
    registerSearchEvents,
    setFormMessage,
    setSearchLoading,
} from './components/search-form.js';

import { getWeatherByCity } from './services/weather-api.js';
import { updateCurrentWeather } from './components/current-weather.js';
import { updateForecastList } from './components/forecast-list.js';

const appElement =
    document.querySelector('#app');

if (!appElement) {
    throw new Error(
        'Elemento principal da aplicação não encontrado.',
    );
}

renderApp(appElement);

registerSearchEvents(loadWeather);

async function loadWeather(city) {
    setSearchLoading(true);

    setFormMessage(
        'Buscando informações para ' +
            city +
            '...',
    );

    try {
        const weather =
            await getWeatherByCity(city);

        console.log(
            'Dados meteorológicos recebidos:',
            weather,
        );

        updateCurrentWeather(weather);
        updateForecastList(weather);

        setFormMessage(
            'Dados carregados para ' +
                weather.location.label +
                '.',
            'success',
        );
    } catch (error) {
        console.error(
            'Erro ao consultar o clima:',
            error,
        );

        const message =
            error instanceof Error
                ? error.message
                : 'Ocorreu um erro inesperado.';

        setFormMessage(message, 'error');
    } finally {
        setSearchLoading(false);
    }
}