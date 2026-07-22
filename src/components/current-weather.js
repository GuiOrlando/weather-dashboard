import { getWeatherInfo } from '../utils/weather-codes.js';
import { formatCurrentDate } from '../utils/date-format.js';

export function createCurrentWeather() {
    return `
        <section class="weather-card">
            <div class="weather-card__header">
                <div>
                    <span
                        id="weather-location"
                        class="weather-card__location"
                    >
                        São Paulo, Brasil
                    </span>

                    <p
                        id="weather-date"
                        class="weather-card__date"
                    >
                        Clima atual
                    </p>
                </div>

                <span
                    id="weather-icon"
                    class="weather-card__icon"
                    aria-hidden="true"
                >
                    ☀️
                </span>
            </div>

            <div class="current-weather">
                <div>
                    <strong
                        id="weather-temperature"
                        class="current-weather__temperature"
                    >
                        24°C
                    </strong>

                    <p
                        id="weather-condition"
                        class="current-weather__condition"
                    >
                        Céu limpo
                    </p>
                </div>

                <div class="weather-details">
                    <article class="detail-card">
                        <span>Sensação</span>

                        <strong id="weather-apparent">
                            25°C
                        </strong>
                    </article>

                    <article class="detail-card">
                        <span>Umidade</span>

                        <strong id="weather-humidity">
                            64%
                        </strong>
                    </article>

                    <article class="detail-card">
                        <span>Vento</span>

                        <strong id="weather-wind">
                            12 km/h
                        </strong>
                    </article>
                </div>
            </div>
        </section>
    `;
}

function setElementText(id, value) {
    const element = document.querySelector(
        '#' + id,
    );

    if (!element) {
        return;
    }

    element.textContent = value;
}

function formatNumber(value) {
    if (
        value === null ||
        value === undefined ||
        Number.isNaN(Number(value))
    ) {
        return '--';
    }

    return Math.round(Number(value));
}

export function updateCurrentWeather(weather) {
    const current = weather.current;
    const units = weather.currentUnits || {};

    if (!current) {
        throw new Error(
            'Os dados do clima atual não foram recebidos.',
        );
    }

    const weatherInfo = getWeatherInfo(
        current.weather_code,
    );

    setElementText(
        'weather-location',
        weather.location.label,
    );

    setElementText(
        'weather-date',
        formatCurrentDate(current.time),
    );

    setElementText(
        'weather-icon',
        weatherInfo.icon,
    );

    setElementText(
        'weather-condition',
        weatherInfo.description,
    );

    setElementText(
        'weather-temperature',
        formatNumber(current.temperature_2m) +
            (units.temperature_2m || '°C'),
    );

    setElementText(
        'weather-apparent',
        formatNumber(
            current.apparent_temperature,
        ) +
            (units.apparent_temperature || '°C'),
    );

    setElementText(
        'weather-humidity',
        formatNumber(
            current.relative_humidity_2m,
        ) +
            (units.relative_humidity_2m || '%'),
    );

    setElementText(
        'weather-wind',
        formatNumber(current.wind_speed_10m) +
            ' ' +
            (units.wind_speed_10m || 'km/h'),
    );
}