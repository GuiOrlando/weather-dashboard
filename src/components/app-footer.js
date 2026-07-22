export function createAppFooter() {
    return [
        '<footer class="app-footer">',
            '<p>',
                'Dados meteorológicos fornecidos por ',
                '<a ',
                    'href="https://open-meteo.com/" ',
                    'target="_blank" ',
                    'rel="noopener noreferrer"',
                '>',
                    'Open-Meteo',
                '</a>',
            '</p>',
        '</footer>',
    ].join('');
}