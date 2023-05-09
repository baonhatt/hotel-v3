import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-layoutpage',
  templateUrl: './layoutpage.component.html',
  styleUrls: ['./layoutpage.component.css']
})
export class LayoutpageComponent implements OnInit{
  ngOnInit(): void {

  }
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  reload(){
    window.location.reload()
  }
}
