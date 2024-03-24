import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherForecast } from 'src/app/models/forecast.model';
import { WeatherData } from 'src/app/models/weather.model';
import { ToggleService } from 'src/app/services/toggle-service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {

  inCelsius!: boolean;
  selectedCard: any; 

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

  dataCard: any[] = []; 
  hourlyDataCard: any[] = [];
  currentIndex: number = 0;
  cardsToShow: number = 10;

  constructor(private weatherService: WeatherService,private toggleService: ToggleService){  }
  toggleValueSubscription!: Subscription;

  ngOnInit(): void {
    this.inCelsius = !this.toggleService.toggleValue;

    this.toggleValueSubscription = this.toggleService.toggleValue$.subscribe(value => {
      //console.log("toggleValueSubscription...");
      this.inCelsius = !value; 
    });

    this.setData();
    this.selectedCard = this.dataCard[0]; // Set the first card as selected
    this.hourlyDataCard = this.selectedCard.hour;
  }

  ngOnDestroy(): void {
    //console.log("ngOnDestroy...");
    this.toggleValueSubscription.unsubscribe();
  }

  setData(){
    const dataObj: { weather: WeatherData, forecast: WeatherForecast } = this.weatherService.getPreviousData(); 
    //console.log("setData >> dataObj :: ",dataObj);

    if (!dataObj || !dataObj.weather || !dataObj.forecast) {
      //console.error("dataObj or its properties are undefined.");
      return;
    }

    let weatherData = dataObj.weather;
    let forecastData = dataObj.forecast;
    
    // console.log("updateView >> weatherData :: ", weatherData);
    // console.log("updateView >> forcastData :: ", forecastData);
    //console.log('inCelsius :: ', this.inCelsius);
    
    this.dataCard = forecastData.forecast.forecastday;
    //console.log("dataCard :: ",this.dataCard);
    this.hourlyDataCard = forecastData.forecast.forecastday[0].hour;
    
  }
  
  getNextCards(): void {
    if (this.currentIndex + this.cardsToShow < this.hourlyDataCard.length) {
      this.currentIndex += this.cardsToShow;
    }
  }

  getPreviousCards(): void {
    if (this.currentIndex - this.cardsToShow >= 0) {
      this.currentIndex -= this.cardsToShow;
    }
  }

  getVisibleCards(): any[] {
    return this.hourlyDataCard.slice(this.currentIndex, this.currentIndex + this.cardsToShow);
  }

  selectCard(card: any) {
    this.selectedCard = card; 
    this.hourlyDataCard = card.hour;
    this.getVisibleCards();
  }
}

