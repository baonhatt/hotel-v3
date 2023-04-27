import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
interface RoomType {
  id: number;
  typeName: string;
  maxPerson: number;
}
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
  roomtoDisplay!: Room[];
  maxPerson!: any;
  datasearch!: number[];
  maxPrice = null;
  selectedRoomType = '';
  selectedServiceAttach = '';
  roomTypes:  RoomType[] = []
  serviceAttachs = [];
  array!: number[];
  selectedPersonCount: number = 1;
  constructor( private roomService: ApiService,
    private router: Router,
    private auth: AuthService,
    private apiService: ApiService){


  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
    this.apiService.searchRoom().subscribe((data: any)=> {
      this.maxPerson = data.maxPerson;
      this.maxPrice = data.maxPrice;
      this.roomTypes = data.roomTypes;
      this.serviceAttachs = data.serviceAttachs;

    });
    this.getRooms();
    this.auth.reloadOnNavigation()

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
