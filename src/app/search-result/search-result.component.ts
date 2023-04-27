import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
interface RoomType {
  id: number;
  typeName: string;
  maxPerson: number;

}


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit{
  roomtoDisplay!: Room[];
  rooms!: Room[];
  maxPerson!: any;
  datasearch!: number[];
  maxPrice = null;
  selectedRoomType = '';
  selectedServiceAttach = '';
  serviceAttachs = [];
  array!: number[];
  roomTypes:  RoomType[] = [];
  selectedPersonCount: number = 1;
  constructor( private roomService: ApiService,
    private router: Router,
    private api: ApiService){


  }
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {

    this.getRooms();

    this.api.searchRoom().subscribe((data: any)=> {
      this.maxPerson = data.maxPerson;
      this.maxPrice = data.maxPrice;
      this.roomTypes = data.roomTypes;
      this.serviceAttachs = data.serviceAttachs;
    });
    this.sortMaxPersonArrayDescending()
  }

  sortMaxPersonArrayDescending() {
    this.maxPersonArray.sort((a, b) => a - b);
  }

  get maxPersonArray(): number[] {
    return Array.from({length: this.maxPerson}, (_, i) => this.maxPerson - i);
  }
  getRooms(){
    this.roomService.getRooms().subscribe((res: any)=>{
      this.rooms = res;
    })
  }
  routePage(){
    this.router.navigate(['/room-detail/{{room.id}}'])
  }

}
