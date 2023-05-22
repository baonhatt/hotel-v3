import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { ReservationModel } from '../booking/booking.component';
import { Room } from '../../models/room.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomTypeService } from '../../models/roomtypeservice.model';

@Component({
    selector: 'app-room-booked',
    templateUrl: './room-booked.component.html',
    styleUrls: ['./room-booked.component.css']
})
export class RoomBookedComponent implements OnInit {

    roombooked!: ReservationModel[];
    reservationServiceId!: any
    services!: RoomTypeService[]
    serviceForm!: FormGroup
    serviceRoomId!: number 
    constructor(private api: ApiService,
        private fb: FormBuilder,
        private toast: ToastrService
    ) {
        this.serviceForm = this.fb.group({
            amount: [''],
            serviceRoomId: [''],
            reservationId: ['']
        })
    }

    ngOnInit(): void {


        this.api.getAllReservation().subscribe(res => {
            this.roombooked = res;

            this.filterExpiredReservations();

        })

        this.getAllService()
    }
   
    toggleSelection(itemId: string) {
        this.reservationServiceId = itemId;
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

    order(serviceForm: FormGroup) {
        this.serviceForm.controls["serviceRoomId"].setValue(this.serviceRoomId);      
        this.serviceForm.controls["reservationId"].setValue(this.reservationServiceId);      
        this.api.createOrderService(this.serviceForm.value).subscribe(res=>{
            this.toast.success("Add successfully!")
        },err=>{
            this.toast.error(err.error.message)
        })
    }
    getAllService() {
        this.api.getAllRoomTypeService().subscribe((res: any) => {
            this.services = res;
            this.serviceRoomId = res[0].id

           console.log(this.serviceRoomId);
           
            
           

        });
    }
    onServiceSelectionChange(e: any){
        const selectedServiceId: number = parseInt(e.target.value, 10);
        this.serviceRoomId = selectedServiceId
    }
}
