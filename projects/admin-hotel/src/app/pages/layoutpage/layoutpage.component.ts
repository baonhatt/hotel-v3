import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../_service/api.service";
import { Staff } from "../../models/staff.model";
import { Observable } from "rxjs";
import { ReservationModel } from "../booking/booking.component";
import { Revenue, RevenueComponent } from "../../models/revenue.model";
import { DashboardApi } from "../../_service/dashboard.service";
@Component({
    selector: "app-layoutpage",
    templateUrl: "./layoutpage.component.html",
    styleUrls: ["./layoutpage.component.css"],
})
export class LayoutpageComponent implements OnInit {
    numStaff: Staff[] = [];
    numAccount!: number;
    numbBookings!: number;
    revenueTotal!: number;
    revenueData!: Revenue;

    getSumResponse: any;
    getRoomTopBookedResponse: any;
    getUserTopBookedResponse: any;
    getEmployeeTopBookedResponse: any;
    getServiceRoomTopBookedResponse: any;

    constructor(private api: ApiService, private dashboard: DashboardApi) {}
    ngOnInit(): void {
        $.getScript("assets/js/pages/demo.dashboard.js");
        this.getSum(2023);
        this.getRoomTopBooked(2023);
    }
    
    getSum(year: any) {
        this.dashboard.getSum(year).subscribe(
            (res) => {
                this.getSumResponse = res;
            },
            (err) => {}
        );
    }

    getRoomTopBooked(year: any) {
        this.dashboard.getRoomTopBooked(year).subscribe(
            (res) => {
                this.getRoomTopBookedResponse = res;
            },
            (err) => {}
        );
    }

    getUserTopBooked(year: any) {
        this.dashboard.getUserTopBooked(year).subscribe(
            (res) => {
                this.getUserTopBookedResponse = res;
            },
            (err) => {}
        );
    }

    getEmployeeTopBooked(year: any) {
        this.dashboard.getEmployeeTopBooked(year).subscribe(
            (res) => {
                this.getEmployeeTopBookedResponse = res;
            },
            (err) => {}
        );
    }

    getServiceRoomTopBooked(year: any) {
        this.dashboard.getServiceRoomTopBooked(year).subscribe(
            (res) => {
                this.getServiceRoomTopBookedResponse = res;
            },
            (err) => {}
        );
    }

    sideBarOpen = true;

    sideBarToggler() {
        this.sideBarOpen = !this.sideBarOpen;
    }

    fetchRevenue() {
        this.api.getRevenue().subscribe((data: any) => {
            this.revenueData = data;
            console.log(this.revenueData);
        });
    }

    getRevenue() {
        this.api
            .getAllReservation()
            .subscribe((reservations: ReservationModel[]) => {
                this.revenueTotal = reservations.reduce(
                    (total, reservation) =>
                        total + reservation.reservationPrice,
                    0
                );
            });
    }
    async countAccounts(): Promise<number> {
        try {
            const accounts: Observable<Staff[]> = this.api.getallUser();
            const staffArray: Staff[] = (await accounts.toPromise()) || [];
            if (staffArray) {
                const length = staffArray.length;

                this.numAccount = length;
                console.log("Total accounts:", length);
                return length;
            } else {
                console.log("Staff array is undefined.");
                return 0;
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            return 0;
        }
    }

    async accountBooking(): Promise<number> {
        try {
            const bookings: Observable<ReservationModel[]> =
                this.api.getAllReservation();
            const bookingArray: ReservationModel[] =
                (await bookings.toPromise()) || [];
            if (bookingArray) {
                const length = bookingArray.length;

                this.numbBookings = length;
                console.log("Total bookings:", length);
                return length;
            } else {
                console.log("Booking array is undefined.");
                return 0;
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return 0;
        }
    }
}
