const GEOCODING_API_URL =
    'https://geocoding-api.open-meteo.com/v1/search';

const WEATHER_API_URL =
    'https://api.open-meteo.com/v1/forecast';

async function requestJson(url, errorMessage) {
    const response = await fetch(url.toString());

    const contentType =
        response.headers.get('content-type') || '';

    const responseText = await response.text();

    if (!response.ok) {
        console.error('Resposta da API:', {
            url: response.url,
            status: response.status,
            content: responseText,
        });

        throw new Error(
            errorMessage +
                ' Código HTTP: ' +
                response.status,
        );
    }

    if (!contentType.includes('application/json')) {
        console.error('Conteúdo inesperado:', {
            url: response.url,
            contentType,
            content: responseText,
        });

        throw new Error(
            'A API retornou um conteúdo inválido. ' +
                'Verifique o endereço utilizado.',
        );
    }

    try {
        return JSON.parse(responseText);
    } catch (error) {
        console.error(
            'Não foi possível converter a resposta em JSON:',
            responseText,
        );

        throw new Error(
            'A resposta recebida não é um JSON válido.',
        );
    }
}

async function searchLocation(city) {
    const url = new URL(GEOCODING_API_URL);

    url.searchParams.set('name', city);
    url.searchParams.set('count', '1');
    url.searchParams.set('language', 'pt');
    url.searchParams.set('format', 'json');

    const data = await requestJson(
        url,
        'Não foi possível pesquisar a cidade.',
    );

    const location = data.results?.[0];

    if (!location) {
        throw new Error(
            'Cidade não encontrada. Verifique o nome informado.',
        );
    }

    return location;
}

async function searchWeather(latitude, longitude) {
    const url = new URL(WEATHER_API_URL);

    url.searchParams.set(
        'latitude',
        String(latitude),
    );

    url.searchParams.set(
        'longitude',
        String(longitude),
    );

    url.searchParams.set(
        'current',
        [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'wind_speed_10m',
        ].join(','),
    );

    url.searchParams.set(
        'daily',
        [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_probability_max',
        ].join(','),
    );

    url.searchParams.set('timezone', 'auto');
    url.searchParams.set('forecast_days', '5');
    url.searchParams.set(
        'temperature_unit',
        'celsius',
    );
    url.searchParams.set(
        'wind_speed_unit',
        'kmh',
    );

    return requestJson(
        url,
        'Não foi possível consultar a previsão do tempo.',
    );
}

function createLocationLabel(location) {
    const parts = [location.name];

    const locationName =
        location.name?.toLowerCase();

    const stateName =
        location.admin1?.toLowerCase();

    if (
        location.admin1 &&
        stateName !== locationName
    ) {
        parts.push(location.admin1);
    }

    if (location.country) {
        parts.push(location.country);
    }

    return parts.join(', ');
}

export async function getWeatherByCity(city) {
    const location = await searchLocation(city);

    const weather = await searchWeather(
        location.latitude,
        location.longitude,
    );

    return {
        location: {
            name: location.name,
            state: location.admin1 || '',
            country: location.country || '',
            latitude: location.latitude,
            longitude: location.longitude,
            label: createLocationLabel(location),
        },

        current: weather.current,
        currentUnits: weather.current_units,
        daily: weather.daily,
        dailyUnits: weather.daily_units,
    };
}