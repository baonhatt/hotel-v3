import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Route } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { differenceInDays } from 'date-fns';
import { DatePipe } from '@angular/common';
import { userProfile } from '../models/userProfile.model';
import { UserService } from '../_service/user.service';
import {formatDate} from '@angular/common';
import { ReservationGet } from '../models/reservationGet.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('momoRadio') momoRadio!: ElementRef;
  @ViewChild('vnpayRadio') vnpayRadio!: ElementRef;
  paymentFailed!: any;
  room!: Room;
  bookForm!: FormGroup;
  dateForm!: FormGroup;
  startDate!: Date;
  numberOfDay: number = 0;
  numdayDisplay!: number;
  endDate!: Date;
  numDays!: number;
  amountNum1!: number;
  orderInfoString!: string;
  checkIn = new FormControl(new Date().toISOString());
  checkOut = new FormControl(new Date().toISOString());
  userInfo!: userProfile;
  reservationId!: any;
  resultReservation:any;
  reservationGet!:ReservationGet;
  priceRoom:any;
  get f() {
    return this.bookForm.controls;
  }

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toast: ToastrService,
    private userProfile: UserService
  ) {

  }

  ngOnInit(): void {
    this.paymentFailed = false;
    this.reservationId = this.route.snapshot.paramMap.get('id');

    this.getReservationByID(this.reservationId);

    this.resultReservation = JSON.parse(localStorage.getItem("resultReservation")!);
    this.resultReservation.startDate = new Date(new Date(this.resultReservation.startDate).setHours(0,0,0)).toLocaleString();
    this.resultReservation.endDate = new Date(new Date(this.resultReservation.endDate).setHours(0,0,0)).toLocaleString();

    this.bookForm = this.fb.group({
      email: [''],
      name: [''],
      phoneNumber: [''],
      address: [''],
      paymentMethod: ['momo'],
    });
    this.userProfile.getUserProfile().subscribe((res) => {
      this.bookForm.patchValue({
        name: res.userName,
        email: res.email,
        phoneNumber: res.phoneNumber,
        address: res.address,
      });
    });
  }

  getRoomById(id:any): void {
    this.apiService.getRoomDetail(id)
      .subscribe(res => {
        this.room = res;
        this.priceRoom = this.room.discountPrice == 0?this.room.currentPrice:this.room.discountPrice;
      });
  }

  getReservationByID(id:any)
  {
    this.http
      .get<any>(
        `${environment.BASE_URL_API}/user/reservation/get-by-id?id=${this.reservationId}`).subscribe(
          res => {
            this.reservationGet = res as ReservationGet
            this.getRoomById(this.reservationGet.roomId);
          },
          err => {
            this.toast.error("Reservation Id not found");
          }
        )
  }

  methodPay() {
    const selectedPaymentMethod = this.bookForm.get('paymentMethod')?.value;
    if (selectedPaymentMethod == 'momo') {
      this.payMoMo();
    } else if (selectedPaymentMethod == 'vnpay') {
      this.payVnPay();
    }
  }

  confirmInfoBookingRoom() {
    var payLoad = {
      name: this.bookForm.controls["name"].value,
      email: this.bookForm.controls["email"].value,
      phoneNumber: this.bookForm.controls["phoneNumber"].value,
      address: this.bookForm.controls["address"].value
    }
    this.http
      .post<any>(
        `${environment.BASE_URL_API}/user/reservation/edit-info?id=${this.reservationId}`,
        payLoad
      )
      .subscribe(
        (res) => {
          this.methodPay();
          this.toast.success("Please payment");
          localStorage.setItem('reservationId', this.reservationId)
        },
        (_err) => {
          const wrongtime = _err.error.title;
          if (wrongtime) {
            this.toast.error(_err.error.title);
          } else {
            this.toast.error(_err.error.message);
          }
        }
      );
  }
  payMoMo() {
    const orderInfo = this.room.name;
    const amount = Math.round(this.reservationGet.reservationPrice).toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    var payLoad = { orderInfo: orderInfo, amount: amount}

    this.http
      .post<any>(
        environment.QR_MOMO,payLoad,{ headers }
      )
      .subscribe(
        (response) => {
          const redirectUrl = response['payUrl'];
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        },
        (_err) => {
          this.toast.error(
            ' The maximum transaction only 50.000.000 đ, please switch to another method.'
          );
        }
      );
    console.log(orderInfo, amount);
  }

  payVnPay() {
    // this.amountNum1 = this.reservationGet.ReservationPrice
    this.orderInfoString = this.room.name;
    this.amountNum1 = Math.round(this.reservationGet.reservationPrice);
    this.http
      .post<any>(environment.BASE_URL_API + '/user/vn-pay/create', {
        amount: this.amountNum1,
        orderDescription: this.orderInfoString,
        name: 'Customer',
      })
      .subscribe(
        (res) => {
          const payUrl = res['url'];
          window.location.href = payUrl;
        },
        (err) => {
          this.toast.error('Pay Failed');
          // window.location.href = this.payurl
        }
      );
  }

  OnSubmit() {
    if (this.bookForm.invalid) {
      return;
    }

    this.confirmInfoBookingRoom();
  }
}
