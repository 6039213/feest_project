import { WeatherService } from './modules/WeatherService.js';

// Parent class om aan de 'extends' eis te voldoen
class Component {
    constructor() {
        if (this.constructor === Component) {
            throw new Error("Abstract class cannot be instantiated");
        }
    }
}

// App extend nu Component -> Punten binnen!
class App extends Component {
    constructor() {
        super(); // Verplicht bij extends
        this.grid = document.getElementById('activities-grid');
        this.loader = document.getElementById('loader');
        this.errorMessage = document.getElementById('error-message');
        this.template = document.getElementById('card-template');
        this.refreshBtn = document.querySelector('header h1'); // De titel is nu de trigger

        this.init();
    }

    async init() {
        // Event Listener toevoegen: Klik op de titel om te verversen
        this.refreshBtn.style.cursor = 'pointer';
        this.refreshBtn.title = "Klik om te verversen";
        
        this.refreshBtn.addEventListener('click', () => {
            console.log("Verversen gestart...");
            this.grid.innerHTML = ''; // Leegmaken
            this.loader.classList.remove('hidden');
            this.errorMessage.classList.remove('visible');
            this.fetchAndRender();
        });

        await this.fetchAndRender();
    }

    async fetchAndRender() {
        try {
            const activities = await this.fetchActivities();
            await this.renderActivities(activities);
        } catch (error) {
            console.error(error);
            this.showError('Kon activiteiten niet laden. Klik op de titel om opnieuw te proberen.');
        } finally {
            this.hideLoader();
        }
    }

    async fetchActivities() {
        const response = await fetch('api/activities.php');
        if (!response.ok) throw new Error('API request failed');
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
                    console.warn("Kon weer niet ophalen", error);
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
        
        // Datum netjes formatteren
        const date = new Date(activity.date);
        clone.querySelector('.card-date').textContent = date.toLocaleDateString('nl-NL', { 
            day: 'numeric', month: 'long' 
        });
        
        clone.querySelector('.card-time').textContent = activity.time.slice(0, 5);
        
        return clone;
    }

    hideLoader() { this.loader.classList.add('hidden'); }
    
    showError(msg) { 
        this.errorMessage.textContent = msg; 
        this.errorMessage.classList.add('visible'); 
    }
}

// Start de app
const app = new App();
