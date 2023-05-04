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
  filteredRooms!: Room[];
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
  peopleNumber: number  = 1;


  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private search: SearchService
  ) {
    this.rooms = [],
      this.roomtoDisplay = this.roomtoDisplay;
    this.blogs = [],
      this.blogtoDisplay = this.blogs;

    this.roomSearchForm = this.fb.group({
      peopleNumber: '',
      roomTypeName: ''
    })
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
    this.toast.success("ok");
    this.apiService.searchRoom().subscribe((data: any)=> {
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
    const roomTypeName = this.roomSearchForm.value.roomTypeName;
    const peopleNumber = this.roomSearchForm.value.peopleNumber.value;

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

