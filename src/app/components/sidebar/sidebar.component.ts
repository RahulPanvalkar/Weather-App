import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() hidden: boolean = true;

  sidebarWidth: number = 50;

  /*adjustWidth(){
    if(this.hidden){
      this.sidebarWidth = 200;
      this.hidden = false;
    }
    else{
      this.sidebarWidth = 50;
      this.hidden = true;
    }
  }*/

}
