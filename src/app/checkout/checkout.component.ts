import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Route } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orderInfo!: string;
  rooms!: Room;
  amount!: number;
  bookForm!: FormGroup;
  payForm!: FormGroup;
  startDate!: Date;
  numberOfDay!: number;
  endDate!: Date;
  numDays!: number;
  numOfPeople!: number;
  roomId!: any;
  orderInfoo: string = '';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  get f() {
    return this.bookForm.controls
  }

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toast: ToastrService

    ) {
      this.payForm = this.fb.group({

      })
    }

  ngOnInit(): void {
   
    this.roomId = this.route.snapshot.paramMap.get('id')
    this.bookForm = this.fb.group({
      startDate:new Date().toISOString(),
      endDate:new Date().toISOString(),
      roomId: [this.roomId],
      numberOfDay: [''],
      email: [''],
      name: [''],
      phoneNumber: [''],
      address: [''],
    });
    // if(savedCheckoutForm){
    //   const result =
    //   this.bookForm.setValue(JSON.parse(savedCheckoutForm))

    //   console.log(result);

    // }
    this.getRoomById();

  }

  getRoomById()
  {
    this.apiService.getRoomDetail(this.roomId)
    .subscribe(res => {
      // console.log(res);
      this.rooms = res
    });
  }




  bookingRoom(bookForm: FormGroup){
    this.http.post<any>(`${environment.BASE_URL_API}/user/reservation/create`, this.bookForm.value)
    .subscribe(res =>{

      this.toast.success(res.message)


      this.payMoMo()

      const dataToSave = JSON.stringify(res);
      localStorage.setItem('bookingData', dataToSave);

    },_err=>{

      const wrongtime = _err.error.title

      if(wrongtime){
        this.toast.error(_err.error.title)
      }
      this.toast.error(_err.error.message)
    })
  }
  payMoMo() {
    const orderInfo = this.rooms.name;
    const amount = this.rooms.currentPrice;
    const amountNum1 = amount.toString()
    const orderInfoString = orderInfo.toString();
    console.log(orderInfoString);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    this.http.post<any>(environment.QR_MOMO,{orderInfo : orderInfoString, amount: amountNum1}, {headers})
       .subscribe(response => {
        const redirectUrl = response['payUrl'];
       if (redirectUrl) { window.location.href = redirectUrl;
      }
    })
    console.log(orderInfo, amount)
  }

  OnSubmit(){

     if(this.bookForm.invalid){
      return;
     }

     this.bookingRoom(this.bookForm.value)
    console.log(this.roomId);

  }

}
