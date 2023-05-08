import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.scss']
})
export class PaymentdetailComponent implements OnInit{
  ngOnInit(): void {
    $.getScript('main.js');
  }

}
