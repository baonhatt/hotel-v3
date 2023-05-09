import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-hotel';

  sideBarOpen = true;
  isLoggedIn: boolean = false;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  // version = VERSION.full;
  dateNow: Date = new Date();
}
