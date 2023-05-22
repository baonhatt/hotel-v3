import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";
import { Observable } from "rxjs";
import { Room } from "../models/room.model";
import { StatusResponse } from "../models/statusResponse.model";

@Injectable({
    providedIn: "root",
})
export class Reservation {
    constructor(private http: HttpClient) {}

    reservationCreate(
        reservationCreate: any
    ): Observable<ReservationCreateResponse> {
        return this.http.post<ReservationCreateResponse>(
            environment.BASE_URL_API + "/v2/admin/reservation/create",
            reservationCreate
        );
    }

    checkTimeReservation(
        dataCheck: any
    ): Observable<StatusResponse> {
        return this.http.post<StatusResponse>(
            environment.BASE_URL_API + "/v2/admin/reservation/create",
            dataCheck
        );
    }

    getRoomBySearch(dataSearch: any): Observable<Room[]> {
        const url = `${environment.BASE_URL_API}/user/room/get-all-by`;
        return this.http.post<Room[]>(url, dataSearch);
    }
}

export class ReservationCreateResponse {
    reservationId!: string;
    statusCode!: number;
    message!: string;
}
