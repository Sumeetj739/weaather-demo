import { Component } from '@angular/core';
import { WeatherService } from './weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  city = '';
  weatherData: any;
  errorMessage = '';

  constructor(private ws : WeatherService) {}

  

  fetchWeather() {
    if (!this.city) {
      this.errorMessage = 'Please enter a city name';
      this.weatherData = null;
      return;
      
    }

    this.ws.getWeather(this.city).subscribe({
      next: (data) => {
        console.log(data);
        
        this.weatherData = data;
        this.errorMessage = '';
        
      },
      error: () => {
        this.errorMessage = 'City not found. Please try again.';
        this.weatherData = null;
      }
    });
  }

  
}
