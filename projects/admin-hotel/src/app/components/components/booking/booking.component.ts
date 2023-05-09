import { Component, OnInit } from '@angular/core';
import { DateFilterFn } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  reservationGetAll! : ReservationModel[];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.GetReservation();
  }
  GetReservation()
  {
    this.http.get<ReservationModel[]>(environment.BASE_URL_API+"/v2/admin/reservation/get-all")
    .subscribe(
      (res)=>{
        this.reservationGetAll = res;
        console.log(res);
        console.log(this.reservationGetAll);

        console.log(this.reservationGetAll[0].startDate);
        console.log(this.reservationGetAll[0].createdAt);

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
  userName!: string;
}
