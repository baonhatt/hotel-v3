import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { Staff } from '../../models/staff.model';
@Component({
  selector: 'app-layoutpage',
  templateUrl: './layoutpage.component.html',
  styleUrls: ['./layoutpage.component.css']
})
export class LayoutpageComponent implements OnInit{
  numStaff: Staff[] = [];


  constructor(private api: ApiService){}
  ngOnInit(): void {

    $.getScript('assets/js/pages/demo.dashboard.js');
    this.api.getallUser().subscribe( res =>{
      this.numStaff = res
      console.log(this.numStaff)
    })

  }
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  reload(){
    window.location.reload()
  }
}
