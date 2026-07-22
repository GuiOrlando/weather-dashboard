import { getWeatherInfo } from '../utils/weather-codes.js';
import { formatForecastDay } from '../utils/date-format.js';

function createForecastCard(
    day,
    icon,
    maximum,
    minimum,
) {
    return `
        <article class="forecast-card">
            <strong>${day}</strong>

            <span
                class="forecast-card__icon"
                aria-hidden="true"
            >
                ${icon}
            </span>

            <div class="forecast-card__temperatures">
                <span>${maximum}</span>
                <span>${minimum}</span>
            </div>
        </article>
    `;
}

export function createForecastList() {
    return `
        <section class="forecast-section">
            <div class="section-heading">
                <h2>Próximos dias</h2>

                <p>Previsão para cinco dias</p>
            </div>

            <div
                id="forecast-grid"
                class="forecast-grid"
            >
                ${createForecastCard(
                    'Segunda',
                    '☀️',
                    '27°',
                    '18°',
                )}

                ${createForecastCard(
                    'Terça',
                    '🌤️',
                    '25°',
                    '17°',
                )}

                ${createForecastCard(
                    'Quarta',
                    '🌧️',
                    '22°',
                    '16°',
                )}

                ${createForecastCard(
                    'Quinta',
                    '⛅',
                    '24°',
                    '17°',
                )}

                ${createForecastCard(
                    'Sexta',
                    '☀️',
                    '28°',
                    '19°',
                )}
            </div>
        </section>
    `;
}

function formatTemperature(
    value,
    unit = '°C',
) {
    if (
        value === null ||
        value === undefined ||
        Number.isNaN(Number(value))
    ) {
        return '--';
    }

    return Math.round(Number(value)) + unit;
}

export function updateForecastList(weather) {
    const forecastGrid =
        document.querySelector('#forecast-grid');

    if (!forecastGrid) {
        return;
    }

    const daily = weather.daily;
    const units = weather.dailyUnits || {};

    if (!daily || !Array.isArray(daily.time)) {
        throw new Error(
            'Os dados da previsão não foram recebidos.',
        );
    }

    const temperatureUnit =
        units.temperature_2m_max || '°C';

    forecastGrid.innerHTML = daily.time
        .map(function (date, index) {
            const weatherInfo =
                getWeatherInfo(
                    daily.weather_code[index],
                );

            const maximum =
                formatTemperature(
                    daily.temperature_2m_max[index],
                    temperatureUnit,
                );

            const minimum =
                formatTemperature(
                    daily.temperature_2m_min[index],
                    temperatureUnit,
                );

            return createForecastCard(
                formatForecastDay(date),
                weatherInfo.icon,
                maximum,
                minimum,
            );
        })
        .join('');
}