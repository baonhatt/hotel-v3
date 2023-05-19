import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../pages/modal/modal/modal.component';
import { FormGroup } from '@angular/forms';
import { SearchRoom } from '../models/searchRoom.model';
import { userProfile } from '../models/userProfile.model';
import { Booking } from '../models/booking.model ';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
MatDialog
@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  imgUrl!: string;
  id!: any;
  rateForm!: FormGroup;
  room!: Room;
  imageUrls: string[] = [];
  roomId!: any;
  showDiscount: number = 0;
  discount!: number
  rating = 0;
  searchData:any;
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private viewPort: ViewportScroller, private dialogref: MatDialog, private http: HttpClient,private toastr: ToastrService){


  }
  isHomePageLoaded = false;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.roomId = this.route.snapshot.paramMap.get('id')
    this.viewPort.scrollToPosition([0, 0]);
    this.getRoomById();
    const dataToSave = JSON.stringify(this.roomId);
    localStorage.setItem('star', dataToSave);
    var searchLocal = JSON.parse(localStorage.getItem("searchReservation")!);
    this.searchData = searchLocal as SearchRoom;
    this.searchData.checkIn = new Date(this.searchData.checkIn);
    this.searchData.checkOut = new Date(this.searchData.checkOut);
  }

  openDialog(){
    this.dialogref.open(ModalComponent)
  }
  getRoomById(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getRoomDetail(id)
      .subscribe(res => {
        this.room = res
        this.showDiscount = res.discountPrice
        const linkArray: string[] = JSON.parse(res.roomPictures);
        const formattedLinks: string[] = linkArray.map((link: string) => `${link}`);
        this.imageUrls = formattedLinks
      });
  }

  bookingRoom() {
    const checkInValue = this.searchData.checkIn;
    const checkOutValue = this.searchData.checkOut;
    if (!checkInValue || !checkOutValue) {
      return;
    }
    const checkInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);
    const numberOfNights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    var userProfileLocal = new userProfile();
    if (localStorage.getItem('user_profile')!.length > 0) {
      let result = localStorage.getItem('user_profile')!;
      userProfileLocal = JSON.parse(result) as userProfile;
    }
    var payLoad = new Booking();
    payLoad.startDate = checkInDate;
    payLoad.endDate = checkOutDate;
    payLoad.roomId = this.room.id;
    payLoad.numberOfDay = numberOfNights;
    payLoad.name = userProfileLocal.userName;
    payLoad.email = userProfileLocal.email;
    payLoad.phoneNumber = userProfileLocal.phoneNumber;
    payLoad.address = userProfileLocal.address;
    this.http
      .post<any>(
        `${environment.BASE_URL_API}/user/reservation/create`,
        payLoad
      )
      .subscribe(
        (res) => {
          this.toastr.success(res.message);
          var resultReservation = {
            startDate : checkInDate,
            endDate : checkOutDate,
            numberOfDay: numberOfNights,
            roomId : this.room.id,
          }
          const dataToSave = JSON.stringify(resultReservation);
          localStorage.setItem('resultReservation', dataToSave);
          this.router.navigate(['/checkout', res.reservationId]);
        },
        (_err) => {
          const wrongtime = _err.error.title;
          if (wrongtime) {
            this.toastr.error(_err.error.title);
          } else {
            this.toastr.error(_err.error.message);
          }
        }
      );
  }
}

