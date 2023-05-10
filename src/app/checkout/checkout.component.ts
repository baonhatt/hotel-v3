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
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('momoRadio') momoRadio!: ElementRef;
  @ViewChild('vnpayRadio') vnpayRadio!: ElementRef;
  orderInfo!: string;
  rooms!: Room;
  payurl!: string;
  amount!: number;
  bookForm!: FormGroup;
  dateForm!: FormGroup;
  startDate!: Date;
  numberOfDay!: number;
  endDate!: Date;
  numDays!: number;
  roomId!: any;
  amountNum1!: number;
  orderInfoString!: string;
  checkIn = new FormControl(new Date().toISOString());
  checkOut = new FormControl(new Date().toISOString());
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  get f() {
    return this.bookForm.controls
  }

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toast: ToastrService,
  ) {
    this.bookForm = this.fb.group({
      startDate: [''],
      checkOut: ['']
    });

  }

  ngOnInit(): void {

    this.roomId = this.route.snapshot.paramMap.get('id')
    this.bookForm = this.fb.group({
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      roomId: [this.roomId],
      numberOfDay: [''],
      email: [''],
      name: [''],
      phoneNumber: [''],
      address: [''],
      paymentMethod: ['momo'],

    });

    // Lắng nghe sự thay đổi của startDate và endDate
    this.bookForm.get('startDate')?.valueChanges.subscribe(() => {
      this.calculateNumberOfDays();
    });

    this.bookForm.get('endDate')?.valueChanges.subscribe(() => {
      this.calculateNumberOfDays();
    });
    this.getRoomById();

  }

  calculateNumberOfDays() {
    const startDateControl = this.bookForm.get('startDate');
    const endDateControl = this.bookForm.get('endDate');
    if (startDateControl && endDateControl) {
      const startDateValue = startDateControl.value;
      const endDateValue = endDateControl.value;

      if (startDateValue && endDateValue) {
        const startDate = new Date(startDateValue);
        const endDate = new Date(endDateValue);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const abc = this.bookForm.get('numberOfDay')?.setValue(numberOfDays);
        console.log(abc);

      }
    }
  }



  getRoomById() {
    this.apiService.getRoomDetail(this.roomId)
      .subscribe(res => {
        // console.log(res);
        this.rooms = res
      });
  }

  methodPay() {
    const selectedPaymentMethod = this.bookForm.get('paymentMethod')?.value;
    if (selectedPaymentMethod == 'momo') {
      this.payMoMo();
    } else if (selectedPaymentMethod == 'vnpay') {
      this.payVnPay()
    }
  }


  bookingRoom(bookForm: FormGroup) {
    this.http.post<any>(`${environment.BASE_URL_API}/user/reservation/create`, this.bookForm.value)
      .subscribe(res => {

        this.methodPay()
        this.toast.success(res.message)


        const dataToSave = JSON.stringify(res);
        localStorage.setItem('bookingData', dataToSave);

      }, _err => {

        const wrongtime = _err.error.title

        if (wrongtime) {
          this.toast.error(_err.error.title)
        } else {
          this.toast.error(_err.error.message)

        }
      })
  }
  payMoMo() {
    const orderInfo = this.rooms.name;
    const amount = this.rooms.currentPrice;
    const amountNum1 = amount.toString()
    const orderInfoString = orderInfo.toString();
    console.log(orderInfoString);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    this.http.post<any>(environment.QR_MOMO, { orderInfo: orderInfoString, amount: amountNum1 },)
      .subscribe(response => {
        const redirectUrl = response['payUrl'];
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }, _err => {
        this.toast.error(" The booking amount is too high, please switch to another method.")
      })
    console.log(orderInfo, amount)
  }

  payVnPay() {

    this.amountNum1 = this.rooms.currentPrice;
    this.orderInfoString = this.rooms.name;

    this.http.post<any>(environment.BASE_URL_API + '/user/vn-pay/create', { amount: this.amountNum1, orderDescription: this.orderInfoString, name: 'Customer' }).subscribe(res => {

      const payUrl = res['url']
      window.location.href = payUrl
    }, err => {
      this.toast.error("Pay Failed")
      // window.location.href = this.payurl


    });
  }
  OnSubmit() {

    if (this.bookForm.invalid) {
      return;
    }


    this.bookingRoom(this.bookForm.value)
    console.log(this.roomId);

  }

}
