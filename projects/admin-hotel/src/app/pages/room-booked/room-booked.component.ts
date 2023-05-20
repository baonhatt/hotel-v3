import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { ReservationModel } from '../booking/booking.component';

@Component({
  selector: 'app-room-booked',
  templateUrl: './room-booked.component.html',
  styleUrls: ['./room-booked.component.css']
})
export class RoomBookedComponent implements OnInit {

    roombooked!: ReservationModel[];
    constructor( private api: ApiService){

    }

    ngOnInit(): void {
        this.api.getAllReservation().subscribe( res=>{
            this.roombooked = res;
            this.filterExpiredReservations();
        })
    }

    filterExpiredReservations(): void {
        const currentDate = new Date();
        this.roombooked = this.roombooked.filter(roombooked => {
          const checkoutDate = new Date(roombooked.endDate);
          return checkoutDate >= currentDate;
        });
      }

}
