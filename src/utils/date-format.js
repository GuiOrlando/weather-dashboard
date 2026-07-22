const WEEK_DAYS = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
];

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatCurrentDate(dateString) {
    if (!dateString) {
        return 'Clima atual';
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return 'Clima atual';
    }

    const formattedDate = new Intl.DateTimeFormat(
        'pt-BR',
        {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
        },
    ).format(date);

    return capitalize(formattedDate);
}

export function formatForecastDay(dateString) {
    const date = new Date(
        dateString + 'T12:00:00',
    );

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return WEEK_DAYS[date.getDay()];
}