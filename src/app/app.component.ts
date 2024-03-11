import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';

  toggleValue: boolean = false;

  toggleUnits(): void {
    this.toggleValue = !this.toggleValue;
    console.log("toggleValue changed => ",this.toggleValue);
  }

}
