import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { SearchService } from '../_service/search.service';
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
  filteredRooms!: Room[];
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  roomtoDisplay!: Room[];
  maxPerson!: any;
  datasearch!: number[];
  maxPrice = null;
  selectedRoomType = '';
  selectedServiceAttach = '';
  roomTypeName: RoomType[] = [];
  serviceAttachs = [];
  roomSearchForm!: FormGroup;
  array!: number[];
  selectedPersonCount: number = 1;
  constructor( private roomService: ApiService,
    private router: Router,
    private auth: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder){

      this.roomSearchForm = this.fb.group({
        peopleNumber: '',
        roomTypeName: ''
      })
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
    this.apiService.searchRoom().subscribe((data: any) => {
      this.maxPerson = data.maxPerson;
      this.maxPrice = data.maxPrice;
      this.roomTypeName = data.roomTypes;
      this.serviceAttachs = data.serviceAttachs;
    });

    this.apiService.getRooms().subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
        this.filteredRooms = rooms;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.auth.reloadOnNavigation();
    this.sortMaxPersonArrayDescending();
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
  searchRoom()
  {
    //viet 1 ham khi click nut seach se lay cac data o cac o can search và gọi api search r điền vào
    //sau khi get thành công
    //gọi SearchResultComponent . rooms rồi gắn bằng cái res trả về
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
  onSubmit() {
    const roomTypeName = this.roomSearchForm.value.roomTypeName;
    const peopleNumber = this.roomSearchForm.value.peopleNumber;

    if (roomTypeName || peopleNumber) {
      this.filteredRooms = this.rooms.filter((room: Room) => {
        if (roomTypeName && !room.name.toLowerCase().includes(roomTypeName.toLowerCase())) {
          return false;
        }

        if (peopleNumber && room.peopleNumber < peopleNumber) {
          return false;
        }

        return true;
      });
    } else {
      this.filteredRooms = this.rooms;
    }

  }
}
