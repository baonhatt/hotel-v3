import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { ReservationModel } from '../booking/booking.component';
import { ServiceAttach } from '../../models/serviceAttach.model';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{


    roombooked!: ReservationModel[];
    roomId!: any
    attachService!: Room[]
    constructor(private api: ApiService) {

    }

    ngOnInit(): void {

       
        this.api.getAllReservation().subscribe(res => {
            this.roombooked = res;

            this.filterExpiredReservations();

           
        })
       
    }
    toggleSelection(itemId: string) {
        this.roomId = itemId;
    }
    filterExpiredReservations(): void {
        const currentDate = new Date();
        this.roombooked = this.roombooked.filter(roombooked => {
          const checkoutDate = new Date(roombooked.endDate);
          if (checkoutDate >= currentDate) {
          
            return true;
          }
          return false;
        });
      }
}

