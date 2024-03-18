import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherForcast } from 'src/app/models/forcast.model';
import { WeatherData } from 'src/app/models/weather.model';
import { ToggleService } from 'src/app/services/toggle-service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  inCelsius!: boolean;

  currentDateTime!: string;
  lastUpdatedTime!: string;

  iconURL!:string;
  cityName!: string;
  weatherStatus!: string;
  humidity!:number;
  wind!:number;
  minTemp_c!: number;
  maxTemp_c!: number;
  temperature_c!:number;

  minTemp_f!: number;
  maxTemp_f!: number;
  temperature_f!:number;

  constructor(private weatherService: WeatherService,private toggleService: ToggleService){  }
  toggleValueSubscription!: Subscription;

  ngOnInit(): void {
    this.inCelsius = !this.toggleService.toggleValue;

    this.toggleValueSubscription = this.toggleService.toggleValue$.subscribe(value => {
      console.log("toggleValueSubscription...");
      this.inCelsius = !value; 
    });

  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy...");
    this.toggleValueSubscription.unsubscribe();
  }

  onEnterKeyPressed(event: any) {
    console.log("inside onEnterKeyPressed..")
    const cityName = (event.target as HTMLInputElement)?.value;
    console.log(cityName);
    if (cityName) {

      this.weatherService.getWeatherData(cityName)
        .subscribe({
          next: (weatherResponse: WeatherData) => {
            console.log("weather response :: ", weatherResponse);

            this.weatherService.getForcastData(cityName)
              .subscribe({
                next: (forecastResponse: any) => {
                  console.log("forecast response :: ", forecastResponse);
                  this.updateData(weatherResponse, forecastResponse);
                },

                error: (errorCode) => {
                  console.error("Error fetching forecast data: ", errorCode);
                  if(errorCode == '400'){
                    alert("Invalid city! please check city name");
                  }
                  else if(errorCode == '502'){
                    alert("Something went wrong! please try again");
                  }
                }
              });

          },

          error: (errorCode) => {
            console.error("Error fetching weather data: ", errorCode);
            if(errorCode == '400'){
              alert("Invalid city! please check city name");
            }
          }
        });
    }
    

  }

  updateData(weatherData: WeatherData, forcastData: WeatherForcast) {
    console.log("weatherData :: ", weatherData);
    console.log("forcastData :: ", forcastData);
    console.log('inCelsius :: ', this.inCelsius);

    this.iconURL = weatherData.current.condition.icon;
    this.currentDateTime = weatherData.location.localtime;
    this.lastUpdatedTime = weatherData.current.last_updated;
    this.weatherStatus = weatherData.current.condition.text;
    this.cityName = weatherData.location.name;
    this.humidity = weatherData.current.humidity;
    this.wind = weatherData.current.wind_kph;

    this.temperature_c = weatherData.current.temp_c;
    this.minTemp_c = forcastData.forecast.forecastday[0].day.mintemp_c;
    this.maxTemp_c = forcastData.forecast.forecastday[0].day.maxtemp_c;

    this.temperature_f = weatherData.current.temp_f;
    this.minTemp_f = forcastData.forecast.forecastday[0].day.mintemp_f;
    this.maxTemp_f = forcastData.forecast.forecastday[0].day.maxtemp_f;
    
  }
}
