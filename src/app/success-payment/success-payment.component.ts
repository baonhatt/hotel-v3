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
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit {
  urlParams = new URLSearchParams(window.location.search);
  resultCode = this.urlParams.get('resultCode');
  message = this.urlParams.get('message');
  orderType = this.urlParams.get('orderType');
  orderInfo = this.urlParams.get('orderInfo');
  payType = this.urlParams.get('payType');
  amount = this.urlParams.get('amount');
  vnp_ResponseCode = this.urlParams.get('vnp_ResponseCode');
  formGroup!: FormGroup;
  invoiceForm!: FormGroup;
  reservationId!: any;
  constructor(private router: Router, private api: ApiService, private http: HttpClient, private fb: FormBuilder, private toast: ToastrService, private checkout:CheckoutComponent) {
  }
  ngOnInit(): void {
    const bookingForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      roomId: [''],
      numberOfDay: [''],
      email: [''],
      name: [''],
      phoneNumber: [''],
      address: ['']
    });

    // Get value of bookingForm is stored in checkout component
    const bookingFormStored = JSON.stringify(localStorage.getItem('bookingForm'));
    const savedData = localStorage.getItem('bookingData');

    if (savedData) {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const bookingData = JSON.parse(savedData);
      this.reservationId = JSON.parse(savedData);
      // Sử dụng giá trị lấy được
      console.log(bookingData.message);
      console.log(bookingData.reservationId);
      console.log(bookingData.statusCode);
    }

    // Form Invoice
    this.invoiceForm = this.fb.group({
      priceTotal: this.amount,
      orderInfo: this.orderInfo,
      orderType: this.orderType,
      payType: this.payType,
      status: this.reservationId.statusCode,
      message: this.reservationId.message,
      reservationId: this.reservationId.reservationId,
    })
    // Transfer to json data
    const bookingFormValues = JSON.parse(bookingFormStored)
    // Param value for new form
    bookingForm.patchValue(bookingFormValues)
    if (bookingFormStored) {


      if (this.resultCode == '0') {

        this.http.post<any>(`${environment.BASE_URL_API}/user/invoid/create`, this.invoiceForm.value)
          .subscribe(respon => {

            this.toast.success(respon.success.message);
            this.checkout.paymentFailed = true;


          }, _err => {
            this.toast.error(_err.error.message);

          })
      }

    }
   this.vnp_ResponseCode == '0'
  }
  goBackToProFile() {
    this.router.navigate(['/paymentdetail']);
  }

}
