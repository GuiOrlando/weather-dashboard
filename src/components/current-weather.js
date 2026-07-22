export function createCurrentWeather() {
    return [
        '<section class="weather-card">',
            '<div class="weather-card__header">',
                '<div>',
                    '<span class="weather-card__location">São Paulo, Brasil</span>',
                    '<p class="weather-card__date">Clima atual</p>',
                '</div>',

                '<span class="weather-card__icon" aria-hidden="true">',
                    '☀️',
                '</span>',
            '</div>',

            '<div class="current-weather">',
                '<div>',
                    '<strong class="current-weather__temperature">24°C</strong>',
                    '<p class="current-weather__condition">Céu limpo</p>',
                '</div>',

                '<div class="weather-details">',
                    '<article class="detail-card">',
                        '<span>Sensação</span>',
                        '<strong>25°C</strong>',
                    '</article>',

                    '<article class="detail-card">',
                        '<span>Umidade</span>',
                        '<strong>64%</strong>',
                    '</article>',

                    '<article class="detail-card">',
                        '<span>Vento</span>',
                        '<strong>12 km/h</strong>',
                    '</article>',
                '</div>',
            '</div>',
        '</section>',
    ].join('');
}