import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit{
  urlParams = new URLSearchParams(window.location.search);
  resultCode = this.urlParams.get('resultCode');
  message = this.urlParams.get('message');

  constructor(private router: Router){}
  ngOnInit(): void {
    if(this.resultCode =='0'){
      // alert("ok")
    }
  }
  goBackToProFile(){
    this.router.navigate(['/profile']);
  }
}
