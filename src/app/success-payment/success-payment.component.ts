import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit{

  message: string = 'Successful';

  constructor(private router: Router){}
  ngOnInit(): void {
    if(this.message =='Successful'){
      // alert("ok")
    }
  }
  goBackToProFile(){
    this.router.navigate(['/profile']);
  }
}
