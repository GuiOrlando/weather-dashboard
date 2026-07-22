const WEATHER_CODES = {
    0: {
        description: 'Céu limpo',
        icon: '☀️',
    },
    1: {
        description: 'Predominantemente limpo',
        icon: '🌤️',
    },
    2: {
        description: 'Parcialmente nublado',
        icon: '⛅',
    },
    3: {
        description: 'Nublado',
        icon: '☁️',
    },
    45: {
        description: 'Neblina',
        icon: '🌫️',
    },
    48: {
        description: 'Neblina com geada',
        icon: '🌫️',
    },
    51: {
        description: 'Garoa leve',
        icon: '🌦️',
    },
    53: {
        description: 'Garoa moderada',
        icon: '🌦️',
    },
    55: {
        description: 'Garoa intensa',
        icon: '🌧️',
    },
    61: {
        description: 'Chuva leve',
        icon: '🌧️',
    },
    63: {
        description: 'Chuva moderada',
        icon: '🌧️',
    },
    65: {
        description: 'Chuva forte',
        icon: '🌧️',
    },
    71: {
        description: 'Neve leve',
        icon: '🌨️',
    },
    73: {
        description: 'Neve moderada',
        icon: '🌨️',
    },
    75: {
        description: 'Neve forte',
        icon: '❄️',
    },
    80: {
        description: 'Pancadas de chuva leves',
        icon: '🌦️',
    },
    81: {
        description: 'Pancadas de chuva',
        icon: '🌧️',
    },
    82: {
        description: 'Pancadas de chuva fortes',
        icon: '⛈️',
    },
    95: {
        description: 'Trovoadas',
        icon: '⛈️',
    },
    96: {
        description: 'Trovoadas com granizo',
        icon: '⛈️',
    },
    99: {
        description: 'Trovoadas fortes com granizo',
        icon: '⛈️',
    },
};

export function getWeatherInfo(code) {
    return WEATHER_CODES[code] || {
        description: 'Condição não identificada',
        icon: '🌡️',
    };
}