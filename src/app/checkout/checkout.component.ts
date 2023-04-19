import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  bookForm!: FormGroup;
  startDate!: Date;
  endDate!: Date;
  numDays!: number;
  numOfPeople!: number;
  roomId!: any;
  get f() {
    return this.bookForm.controls
  }

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute


    ) { }

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



  OnSubmit(){
    this.calculateDays
    this.bookingRoom(this.bookForm)
    console.log(this.roomId);

  }
}
