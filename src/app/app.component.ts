import { Component } from '@angular/core';
import { ToggleService } from './services/toggle-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
  
  constructor(private toggleService: ToggleService) {}
  
  toggleUnits(): void {
    this.toggleService.setToggleValue(!this.toggleService.toggleValue);
    //console.log("toggleValue changed => ",this.toggleService.toggleValue);
  }

}
