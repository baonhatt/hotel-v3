import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { ApiService } from '../_service/api.service';
import { Room } from '../models/room.model';
import { Blog } from '../models/blog.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from '../models/search.model';
import { SearchService } from '../_service/search.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { daysInWeek, differenceInDays } from 'date-fns';
import { DatePipe } from '@angular/common';
import { ListingComponent } from '../listing/listing.component';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
interface RoomType {
  id: number;
  typeName: string;
  maxPerson: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  rooms: Room[];
  result!: number;
  numNights!: number;
  filteredRooms!: Room[];
  discountRoom!: Room[];
  private apiRooms = 'https://webhotel.click/user/room/get-all';
  blogs: Blog[];
  roomtoDisplay!: Room[];
  blogtoDisplay!: Blog[];
  maxPerson!: any;
  maxPrice = null;
  selectedRoomType = '';
  selectedServiceAttach = '';
  roomTypeName: RoomType[] = [];
  serviceAttachs = [];
  peopleNumberOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  roomSearchForm!: FormGroup;
  peopleNumber: number = 1;

  date = new FormControl(new Date());
  checkIn = new FormControl(new Date().toISOString());
  checkOut = new FormControl(new Date().toISOString());


  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.rooms = [],
      this.roomtoDisplay = this.roomtoDisplay;
    this.blogs = [],
      this.blogtoDisplay = this.blogs;

    this.roomSearchForm = this.fb.group({
      peopleNumber: '',
      roomTypeId: ''
    })
  }

  ngOnInit(): void {
    this.apiService.searchRoom().subscribe((data: any) => {
      this.maxPerson = data.maxPerson;
      this.maxPrice = data.maxPrice;
      this.roomTypeName = data.roomTypes;
      this.serviceAttachs = data.serviceAttachs;
    });

    this.apiService.getRoomOnSale().subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
        this.discountRoom = rooms;
      },
      (error: any) => {
        console.log(error);
      }
    );

    // this.apiService.getRooms().subscribe(data => {
    //   this.rooms = data;
    // });
    this.sortMaxPersonArrayDescending();
    // $.getScript('assets/js/main.js');
    this.apiService.getBlogs().subscribe((res: any) => {
      for (let b of res) {
        this.blogs.unshift(b);
      }
      this.blogtoDisplay = this.blogs;
    });

  }



  sortMaxPersonArrayDescending() {
    this.maxPersonArray.sort((a, b) => a - b);
  }

  get maxPersonArray(): number[] {
    return Array.from({ length: this.maxPerson }, (_, i) => this.maxPerson - i);
  }

  navigateToPage(url: string) {
    window.location.href = url;
    window.scrollTo(0, 0);
  }



  onSubmit() {
    const datePipe = new DatePipe('en-US');

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

    const formattedCheckInDate = datePipe.transform(checkInDate, 'yyyy-MM-dd');
    const formattedCheckOutDate = datePipe.transform(checkOutDate, 'yyyy-MM-dd');
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

    this.http.post<Room[]>(`https://webhotel.click/user/room/get-all-by`, payLoad).subscribe(res => {
      this.filteredRooms = res;
      // Truyền kết quả tìm kiếm dưới dạng query parameter


      const dataToSave = JSON.stringify(this.filteredRooms);
      localStorage.setItem('bookingData', dataToSave);
      // const bin = JSON.stringify(this.filteredRooms)
      // console.log(JSON.parse(bin));

      this.result = res.length
      // alert(this.result)
      this.filteredRooms.forEach(room => {

        this.numNights = numDays
      });

      // // this.router.navigate(['/room-listing'], { queryParams: { rooms: JSON.stringify(this.filteredRooms) } });
      if(numDays > 0){

        // const encodedRooms = encodeURIComponent(JSON.stringify(this.filteredRooms));
        this.router.navigate(['/room-listing']);
      }else{

        this.toast.error("You have to select to Checkout day!")
      }
    }, _err => {
      console.log(_err);
    })
  }

}

