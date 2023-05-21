import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Room } from "../../models/room.model";
import { ApiService } from "../../_service/api.service";
import { Payment } from "../../_service/payment.service";
import { Reservation } from "../../_service/reservation.service";

@Component({
    selector: "app-reservation",
    templateUrl: "./reservation.component.html",
    styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
    formReservation!: FormGroup;
    formSearch!: FormGroup;
    rooms!: Room[];
    dataSearch: any = {
        maxPerson: "",
        maxPrice: "",
        roomTypes: "",
        serviceAttachs: "",
    };
    constructor(
        private reservation: Reservation,
        private payment: Payment,
        private fb: FormBuilder,
        private roomService: ApiService
    ) {
        this.formReservation = this.fb.group({
            startDate: ["2023-05-20T00:00:00.000Z"],
            endDate: ["2023-05-21T00:00:00.000Z"],
            roomId: [""],
            numberOfDay: [0],
            numberOfPeople: [0],
            name: [""],
            email: [""],
            phoneNumber: [""],
            address: [""],
        });
        this.formSearch = this.fb.group({
            checkIn: new Date(),
            checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
            peopleNumber: 0,
            roomTypeId: 0,
        });
    }

    ngOnInit(): void {
        this.getRooms();
        this.getDataAddSearch();
        // this.reservationCreat(this.formReservation);
    }

    reservationCreat(reservationCreate: FormGroup) {
        this.reservation.reservationCreate(reservationCreate.value).subscribe(
            (res) => {
                alert(res.message);
            },
            (err) => {
                alert(err.message);
            }
        );
    }

    getDataAddSearch() {
        this.roomService.DataAddToSearch().subscribe((data: any) => {
            this.dataSearch.maxPrice = data.maxPrice;
            this.dataSearch.roomTypes = data.roomTypes;
            this.dataSearch.serviceAttachs = data.serviceAttachs;
            this.dataSearch.maxPerson = Array.from(
                { length: data.maxPerson },
                (v, k) => k + 1
            );
            console.log(this.dataSearch);
            
        });
    }

    getRooms() {
        this.roomService.getRooms().subscribe((res: any) => {
            this.rooms = res;
        });
    }

    getRoomByDateSearch()
    {
        
    }
}
