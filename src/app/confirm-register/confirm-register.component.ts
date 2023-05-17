import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../_service/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { Room } from '../models/room.model';
import { CheckoutComponent } from '../checkout/checkout.component';
@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent implements OnInit {
  urlParams = new URLSearchParams(window.location.search);
  resultCode = this.urlParams.get('resultCode');
  message = this.urlParams.get('message');
  orderType = this.urlParams.get('orderType');
  orderInfo = this.urlParams.get('orderInfo');
  payType = this.urlParams.get('payType');
  amount = this.urlParams.get('amount');
  email = this.urlParams.get('email');
  code = this.urlParams.get('code');
  decodeCode!: string;
  decodeEmail!: string;
  vnp_ResponseCode = this.urlParams.get('vnp_ResponseCode');
  formGroup!: FormGroup;
  invoiceForm!: FormGroup;
  reservationId!: any;
  submitted = false;
  finalCode!: string;
  constructor(private router: Router, private api: ApiService, private http: HttpClient, private fb: FormBuilder, private toast: ToastrService, private checkout: CheckoutComponent) {
  }
  ngOnInit(): void {

    // console.log(new URLSearchParams(window.location.search))
    console.log(this.code);
    console.log(this.email);

    if (this.code !== null) {
      this.decodeCode = this.code
      console.log(this.decodeCode)
    } else {
      // Xử lý khi `code` là null

    }


    if (this.code !== '0') {
      this.finalCode = this.decodeCode
      const url = `${environment.BASE_URL_API}/user/confirm-email-register?email=${this.email}&code=${(this.decodeCode)}`;
      this.http.get<any>(url).subscribe(

        (response) => {
          console.log(this.code)
          this.toast.success(response);
          console.log(this.finalCode);


        },
        (error) => {
          this.toast.error(error.error.message)
        },
      )
    }
    this.vnp_ResponseCode == '0'
  }
  goBackToProFile() {
    this.router.navigate(['/paymentdetail']);
  }

}
