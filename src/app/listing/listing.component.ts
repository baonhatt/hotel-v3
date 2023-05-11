import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { SearchService } from '../_service/search.service';
import { Room } from '../models/room.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
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
  room!: Room ;
  results!: number;
  pageOfItems!: Array<any>;
  currentPrice!: number ;
  numDays!: number;
  numNights!: number;
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
  displayPrice = false;
  roomTypeName: RoomType[] = [];
  constructor(
    private roomService: ApiService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
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

    this.apiService.searchRoom().subscribe((data: any) => {
      this.maxPerson = data.maxPerson;
      this.maxPrice = data.maxPrice;
      this.roomTypeName = data.roomTypes;
      this.serviceAttachs = data.serviceAttachs;
    });


    this.route.queryParams.subscribe(params => {
      if (params['rooms']) {
        const encodedRooms = (params['rooms']);
        let numDaysroute = parseInt(params['numdays']);
        let result = parseInt(params['results']);
        this.results = result
        const rooms =  JSON.parse(decodeURIComponent(encodedRooms));
        this.filteredRooms = rooms
        this.numNights = numDaysroute
        if(this.displayPrice = true){
          this.currentPrice = numDaysroute
        }
  }});

    // if(this.filteredRooms == null)
    // {
    //   this.getRooms();
    // }


    this.auth.reloadOnNavigation();
    this.sortMaxPersonArrayDescending();

  }
  getFullRooms(){
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
  deleteData() {
    // Xóa dữ liệu khỏi URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { data: null },
      queryParamsHandling: 'merge'
    });
  }
  onSubmit() {

    const roomTypeId = this.roomSearchForm.value.roomTypeId;
    const peopleNumber = this.roomSearchForm.value.peopleNumber;
    console.log(this.checkIn);
    console.log(this.checkOut);

    const checkInValue = this.checkIn.value
    const checkOutValue = this.checkOut.value;

    if (!checkInValue || !checkOutValue) {
      // Handle error when check-in or check-out values are not set
      return;
    }

    const checkInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);


    const numberOfNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const numDays = numberOfNights

    var payLoad = {
      checkIn: this.checkIn.value,
      checkOut: this.checkOut.value,
      price: 0,
      typeRoomId: roomTypeId == "" ? 0 : roomTypeId,
      star: 0,
      peopleNumber: peopleNumber == "" ? 0 : peopleNumber,
    }

    if(numDays > 0 ){
      this.deleteData
      this.http.post<Room[]>(`https://webhotel.click/user/room/get-all-by`, payLoad).subscribe(res => {
        this.filteredRooms = res;
        // Truyền kết quả tìm kiếm dưới dạng query parameter
        const bin = JSON.stringify(this.filteredRooms)
        // console.log(JSON.parse(bin));
        // alert(this.result)
        this.filteredRooms.forEach(room => {

          this.currentPrice = numDays
          this.numNights = numDays
        });


        // this.router.navigate(['/room-listing'], { queryParams: { rooms: JSON.stringify(this.filteredRooms) } });

      }, _err => {
        console.log(_err);
      })
    }else{
      this.toast.error("You have to select to Checkout day!")
    }
  }
}
