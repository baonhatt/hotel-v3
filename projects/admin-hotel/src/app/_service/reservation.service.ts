import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})

export class Reservation {
    constructor(private http: HttpClient) {}

    reservationCreate(reservationCreate: any) : Observable<ReservationCreateResponse>{
        return this.http.post<ReservationCreateResponse>(environment.BASE_URL_API + "/user/reservation/create", reservationCreate);
    }
}

export class ReservationCreateResponse
{
    reservationId!:string;
    statusCode!:number;
    message!:string;
}
