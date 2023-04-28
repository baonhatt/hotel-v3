import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../_service/auth.service';
import { ApiService } from '../_service/api.service';
import { Room } from '../models/room.model';
import { Blog } from '../models/blog.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Search } from '../models/search.model';

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
  blogs: Blog[];
  roomtoDisplay!: Room[];
  blogtoDisplay!: Blog[];
  maxPerson!: any;
  datasearch!: number[];
  maxPrice = null;
  selectedRoomType = '';
  selectedServiceAttach = '';
  roomTypes:  RoomType[] = []
  serviceAttachs = [];
  array!: number[];
  selectedPersonCount: number = 1;
  constructor(
    private http: HttpClient,
    private toast: NgToastService,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {
    this.rooms = [],
    this.roomtoDisplay = this.roomtoDisplay;
    this.blogs = [],
    this.blogtoDisplay = this.blogs;
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

    // this.apiService.getRooms().subscribe((res: any) => {
    //   for (let r of res) {
    //     this.rooms.unshift(r);
    //   }
    //   this.roomtoDisplay = this.rooms ;
    // });


    this.apiService.getBlogs().subscribe((res: any) => {
      for (let b of res) {
        this.blogs.unshift(b);
      }
      this.blogtoDisplay = this.blogs ;
    });

    this.sortMaxPersonArrayDescending();
    // $.getScript('assets/js/main.js');

  }
  sortMaxPersonArrayDescending() {
    this.maxPersonArray.sort((a, b) => a - b);
  }

  get maxPersonArray(): number[] {
    return Array.from({length: this.maxPerson}, (_, i) => this.maxPerson - i);
  }

  navigateToPage(url: string) {
    window.location.href = url;
    window.scrollTo(0, 0);
  }

  // seachRoom(event: any) {
  //   let filteredRooms: Room[] = [];

  //   if (event === '') {
  //     this.roomtoDisplay = this.rooms;
  //   } else {
  //     filteredRooms = this.rooms.filter((val, index) => {
  //       let targetKey =  val.name.toLowerCase() + val.currentPrice.toString()
  //       let searchKey = event.toLowerCase();
  //       return targetKey.includes(searchKey);
  //     });
  //     this.roomtoDisplay = filteredRooms;
  //   }
  // }
}
