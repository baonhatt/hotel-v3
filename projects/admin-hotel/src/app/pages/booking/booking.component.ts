import { Component, OnInit } from '@angular/core';
import { DateFilterFn } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  reservationGetAll! : ReservationModel[];
  reservationGetById! : ReservationModel;
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.GetReservationAll();
  }
  GetReservationAll()
  {
    this.http.get<ReservationModel[]>(environment.BASE_URL_API+"/v2/admin/reservation/get-all")
    .subscribe(
      (res)=>{
        this.reservationGetAll = res;
        console.log(res);

      },
      (err) => {
        console.log(err);
      }
    )
  }
  GetReservationById(id : string)
  {
    this.http.get<ReservationModel>(environment.BASE_URL_API+`/v2/admin/reservation/get-by-id?id=${id}`)
    .subscribe(
      (res)=>{
        this.reservationGetById = res;
        console.log(this.reservationGetById);

      },
      (err) => {
        console.log(err);
      }
    )
  }
}

export class ReservationModel
{
  id! : string;
  startDate!: string;
  numberOfDay!: number;
  endDate!: Date;
  roomPrice!: number;
  createdAt!: string;
  updatedAt!: string;
  reservationPrice!: number;
  roomNumber!: string;
  name!: string;
  phoneNumber!: string;
  address!: string;
  userName!: string;
  status!: boolean;
  reservationPayment!: ReservationPaymentModel;
}

export class ReservationPaymentModel
{
  id! : string;
  createdAt!: Date;
  priceTotal!: number;
  orderInfo!: string;
  orderType!: string;
  payType!: string;
  status!: number;
  message!: string;
  reservationId!: any;
  reservation!: any;
}
