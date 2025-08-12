import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = '0fd15e3738d12f66c01657a9fad288f9';
  private BASE_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  // Step 1: Get current weather (to find lat/lon)
  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric`);
  }

  // Step 2: Get 7-day forecast
  getWeeklyWeather(city: string): Observable<any> {
    return this.getWeather(city).pipe(
      switchMap((data: any) => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        return this.http.get(
          `${this.BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.API_KEY}`
        );
      })
    );
  }
}
