import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  private _toggleValue: boolean = false;
  toggleValue$ = new Subject<boolean>();

  get toggleValue(): boolean {
    console.log("getToggleValue...");
    return this._toggleValue;
  }

  setToggleValue(value: boolean): void {
    console.log("setToggleValue >> value :: ",value);
    this._toggleValue = value;
    this.toggleValue$.next(value); 
  }
}
