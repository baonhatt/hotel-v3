import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.scss']
})
export class PaymentdetailComponent implements OnInit{
  paymentInfo!: any;

  constructor(
    private api: ApiService
  ){}


  ngOnInit(): void {
    $.getScript('main.js');

    this.api.getInfoPayment().subscribe( res=>{
      this.paymentInfo = res
    })

  }

}
