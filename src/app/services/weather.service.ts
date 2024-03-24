import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherData } from '../models/weather.model';
import { WeatherForecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  previousWeatherData!: WeatherData ;
  previousForecastData!: WeatherForecast ;

  constructor(private http:HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData> {
    //console.log("inside getWeatherData..");
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
    const options = {
      headers: {
        [environment.XRapidApiHostHeaderName]: environment.XRapidApiHostHeaderValue,
        [environment.XRapidApiKeyHeaderName]: environment.XRapidApiKeyHeaderValue
      }
    };

    return this.http.get<WeatherData>(url, options).pipe(
      catchError(error => {
        //console.error('Error fetching weather data:', error);
        if (error.status) {
          console.error('HTTP Error Status:', error.status);
        }
        return throwError(error.status);
      })
    );
    
  }

  getForcastData(cityName: string): Observable<WeatherForecast> {
    //console.log("inside getForcastData..");
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`;
    const options = {
      headers: {
        [environment.XRapidApiHostHeaderName]: environment.XRapidApiHostHeaderValue,
        [environment.XRapidApiKeyHeaderName]: environment.XRapidApiKeyHeaderValue
      }
    };

    return this.http.get<WeatherForecast>(url, options).pipe(
      catchError(error => {
        //console.error('Error fetching forcast data:', error);
        if (error.status) {
          console.error('HTTP Error Status:', error.status);
        }
        return throwError(error.status);
      })
    );

  }

  storeWeatherAndForecastData(weatherData: WeatherData, forcastData: WeatherForecast): void {
    this.previousWeatherData = weatherData;
    this.previousForecastData = forcastData;
  }

  getPreviousData(): { weather: WeatherData, forecast: WeatherForecast } {
    return { weather: this.previousWeatherData, forecast: this.previousForecastData };
  }

}
