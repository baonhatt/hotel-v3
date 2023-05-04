import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Route } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';

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
  startDate!: Date;
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
    private apiService: ApiService


    ) { 
      
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

    const id = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getRoomDetail(id)
      .subscribe(res => {
        console.log(res);
        this.rooms = res

      });
    this.calculateDays()
  }

  calculateDays() {
    this.numDays = this.auth.getNumberOfDays(this.bookForm?.get('startDate')?.value,this.bookForm?.get('endDate')?.value);
    console.log(this.numDays);

  }


  bookingRoom(bookForm: FormGroup){

    this.http.post<any>(`${environment.BASE_URL_API}/user/reservation/create`, this.bookForm.value)
    .subscribe(res =>{
      alert("Create an account successfully!");

    },_err=>{
      alert('Something was wrong');

    })
  }
  pay() {
    const orderInfo = this.rooms.name;
    const amount = this.rooms.currentPrice;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    this.http.post<any>(environment.QR_MOMO(orderInfo,amount),{}, {headers})
       .subscribe(response => {
        const redirectUrl = response['payUrl'];
       if (redirectUrl) { window.location.href = redirectUrl;
      } 
    })
    console.log(orderInfo, amount)
  }
  
  OnSubmit(){
  
    this.calculateDays
    // this.bookingRoom(this.bookForm)
    console.log(this.roomId);

  }

}
