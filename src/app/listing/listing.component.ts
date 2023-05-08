import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { SearchService } from '../_service/search.service';
import { Room } from '../models/room.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  rooms: Room[] = [];

  pageOfItems!: Array<any>;

  roomSearchs: Room[] = [];
  page: number = 1;
  count: number = 0;
  filteredRooms!: Room[];
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  roomtoDisplay!: Room[];
  maxPerson!: any;
  datasearch!: number[];
  maxPrice = 0;
  selectedRoomType = '';
  selectedServiceAttach = '';
  roomTypes: RoomType[] = [];
  serviceAttachs = [];
  roomSearchForm!: FormGroup;
  array!: number[];
  selectedPersonCount: number = 1;
  constructor(
    private roomService: ApiService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.roomSearchForm = this.fb.group({
      peopleNumber: '',
      roomTypeId: '',
    });
  }

  date = new FormControl(new Date());
  checkIn = new FormControl(new Date().toISOString());
  checkOut = new FormControl(new Date().toISOString());
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['rooms']) {
        const rooms = JSON.parse(params['rooms']);
        // Sử dụng biến rooms để hiển thị kết quả tìm kiếm trên trang listing
      }
    });
    if(this.filteredRooms == null)
    {
      this.getRooms();
    }

    this.apiService.searchRoom().subscribe((data: any) => {
      this.maxPerson = Array(data.maxPerson)
        .fill(1)
        .map((x, i) => i + 1);
      this.maxPrice = data.maxPrice;
      console.log(this.maxPrice);

      this.roomTypes = data.roomTypes;
      this.serviceAttachs = data.serviceAttachs;
    });

    this.apiService.getRooms().subscribe(
      (rooms: Room[]) => {
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
    return Array.from({ length: this.maxPerson }, (_, i) => this.maxPerson - i);
  }

  getRooms(){
    this.roomService.getRooms().subscribe((res: any)=>{
      this.filteredRooms = res;
    })
  }

  routePage() {
    this.router.navigate(['/room-detail/{{room.id}}']);
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
    const roomTypeId = this.roomSearchForm.value.roomTypeId;
    const peopleNumber = this.roomSearchForm.value.peopleNumber;
    console.log(roomTypeId);

    var payLoad = {
      checkIn: this.checkIn.value,
      checkOut: this.checkOut.value,
      price: 0,
      typeRoomId: roomTypeId == '' ? 0 : roomTypeId,
      star: 0,
      peopleNumber: peopleNumber == '' ? 0 : peopleNumber,
    };

    this.http
      .post<Room[]>(`https://webhotel.click/user/room/get-all-by`, payLoad)
      .subscribe(
        (res) => {
          this.filteredRooms = res;
          console.log(this.filteredRooms);
        },
        (_err) => {
          console.log(_err);
        }
      );
  }
}
