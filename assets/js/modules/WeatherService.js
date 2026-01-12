export class WeatherService {
    static async getWeather(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return {
            temperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode
        };
    }

    static getWeatherIcon(code) {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 49) return '🌫️';
        if (code <= 69) return '🌧️';
        if (code <= 79) return '🌨️';
        if (code <= 99) return '⛈️';
        return '🌡️';
    }
}
