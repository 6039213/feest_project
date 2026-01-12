import { WeatherService } from './modules/WeatherService.js';

class App {
    constructor() {
        this.grid = document.getElementById('activities-grid');
        this.loader = document.getElementById('loader');
        this.errorMessage = document.getElementById('error-message');
        this.template = document.getElementById('card-template');
        
        this.init();
    }

    async init() {
        try {
            const activities = await this.fetchActivities();
            await this.renderActivities(activities);
        } catch (error) {
            this.showError('Kon activiteiten niet laden. Probeer het later opnieuw.');
        } finally {
            this.hideLoader();
        }
    }

    async fetchActivities() {
        const response = await fetch('api/activities.php');
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        return await response.json();
    }

    async renderActivities(activities) {
        for (const activity of activities) {
            const card = this.createCard(activity);
            
            if (activity.type === 'buiten') {
                try {
                    const weather = await WeatherService.getWeather(activity.lat, activity.lon);
                    const icon = WeatherService.getWeatherIcon(weather.weatherCode);
                    card.querySelector('.card-weather').textContent = `${icon} ${weather.temperature}°C`;
                } catch (error) {
                    card.querySelector('.card-weather').textContent = '🌡️ --';
                }
            }
            
            this.grid.appendChild(card);
        }
    }

    createCard(activity) {
        const clone = this.template.content.cloneNode(true);
        
        const typeElement = clone.querySelector('.card-type');
        typeElement.textContent = activity.type;
        typeElement.classList.add(activity.type);
        
        clone.querySelector('.card-title').textContent = activity.title;
        clone.querySelector('.card-description').textContent = activity.description;
        
        const date = new Date(activity.date);
        const formattedDate = date.toLocaleDateString('nl-NL', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
        clone.querySelector('.card-date').textContent = formattedDate;
        
        const time = activity.time.slice(0, 5);
        clone.querySelector('.card-time').textContent = time;
        
        return clone;
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('visible');
    }
}

const app = new App();
