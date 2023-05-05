import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../_service/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Toast } from 'ngx-toastr';
@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit{
  urlParams = new URLSearchParams(window.location.search);
  resultCode = this.urlParams.get('resultCode');
  message = this.urlParams.get('message');

  constructor(private router: Router, private api: ApiService, private http: HttpClient){}
  ngOnInit(): void {
    const bookingForm = JSON.stringify(localStorage.getItem('bookingForm'))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if(this.resultCode =='0'){
      this.http.post('https://webhotel.click/user/reservation/create', bookingForm,httpOptions).subscribe((res) =>{
        const message = res
        alert(message)
      })
      console.log(bookingForm);

    }
  }
  goBackToProFile(){
    this.router.navigate(['/profile']);
  }

}
