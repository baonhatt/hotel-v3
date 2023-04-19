import { Component } from '@angular/core';
@Component({
  selector: 'app-layoutpage',
  templateUrl: './layoutpage.component.html',
  styleUrls: ['./layoutpage.component.css']
})
export class LayoutpageComponent {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
