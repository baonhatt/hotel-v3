import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  rooms: Room[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor( private roomService: ApiService,
    private router: Router){


  }
  ngOnInit(): void {

    this.getRooms();
  }
  getRooms(){
    this.roomService.getRooms().subscribe((res: any)=>{
      this.rooms = res;
    })
  }
  routePage(){
    this.router.navigate(['/room-detail/{{room.id}}'])
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getRooms();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRooms();
  }
}
