// Importar las dependencias necesarias
const fetch = require('node-fetch');

// Mockear la función fetch para simular las respuestas
jest.mock('node-fetch');

// Importar el código que se va a testear
const index = require('./index');

describe('index.js', () => {
  test('Hace la solicitud correctamente y actualiza el DOM', async () => {
    // Mockear la respuesta de la API
    const mockResponse = {
      cod: 200,
      main: {
        temp: 25,
        humidity: 70
      },
      weather: [
        {
          main: 'Clear',
          description: 'Clear sky'
        }
      ],
      wind: {
        speed: 10
      }
    };
    fetch.mockResolvedValue({ json: () => Promise.resolve(mockResponse) });

    // Ejecutar el código que se va a testear
    await index();

    // Realizar las verificaciones
    expect(document.querySelector('.weather-box img').src).toBe('img/clear.png');
    expect(document.querySelector('.weather-box .temperature').innerHTML).toBe('25<span>°C</span>');
    expect(document.querySelector('.weather-box .description').innerHTML).toBe('Clear sky');
    expect(document.querySelector('.weather-details .humidity span').innerHTML).toBe('70%');
    expect(document.querySelector('.weather-details .wind span').innerHTML).toBe('10Km/h');
    expect(document.querySelector('.search-box').style.marginBottom).toBe('40px');
    expect(document.querySelector('.not-found').style.display).toBe('none');
    expect(document.querySelector('.weather-box').style.display).toBe('flex');
    expect(document.querySelector('.weather-details').style.display).toBe('flex');
    expect(document.querySelector('.weather-box').classList).toContain('fadeIn');
    expect(document.querySelector('.weather-details').classList).toContain('fadeIn');
    expect(document.querySelector('.container').style.height).toBe('600px');
  });

  test('Maneja el código de respuesta 404 correctamente', async () => {
    // Mockear la respuesta de la API
    const mockResponse = {
      cod: '404'
    };
    fetch.mockResolvedValue({ json: () => Promise.resolve(mockResponse) });

    // Ejecutar el código que se va a testear
    await index();

    // Realizar las verificaciones
    expect(document.querySelector('.search-box').style.marginBottom).toBe('40px');
    expect(document.querySelector('.container').style.height).toBe('400px');
    expect(document.querySelector('.weather-box').style.display).toBe('none');
    expect(document.querySelector('.weather-details').style.display).toBe('none');
    expect(document.querySelector('.not-found').style.display).toBe('block');
    expect(document.querySelector('.not-found').classList).toContain('fadeIn');
  });
});
