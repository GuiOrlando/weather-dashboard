function createForecastCard(day, icon, maximum, minimum) {
    return [
        '<article class="forecast-card">',
            '<strong>' + day + '</strong>',

            '<span class="forecast-card__icon" aria-hidden="true">',
                icon,
            '</span>',

            '<div class="forecast-card__temperatures">',
                '<span>' + maximum + '</span>',
                '<span>' + minimum + '</span>',
            '</div>',
        '</article>',
    ].join('');
}

export function createForecastList() {
    return [
        '<section class="forecast-section">',
            '<div class="section-heading">',
                '<h2>Próximos dias</h2>',
                '<p>Previsão para cinco dias</p>',
            '</div>',

            '<div class="forecast-grid">',
                createForecastCard('Segunda', '☀️', '27°', '18°'),
                createForecastCard('Terça', '🌤️', '25°', '17°'),
                createForecastCard('Quarta', '🌧️', '22°', '16°'),
                createForecastCard('Quinta', '⛅', '24°', '17°'),
                createForecastCard('Sexta', '☀️', '28°', '19°'),
            '</div>',
        '</section>',
    ].join('');
}