import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";
import { Observable } from "rxjs";
import { StatusResponse } from "../models/statusResponse.model";

@Injectable({
    providedIn: "root",
})
export class Payment {
    constructor(private http: HttpClient) {}
    paymentCreate(paymentCreate: PaymentCreateModel) : Observable<StatusResponse>{
        return this.http.post<StatusResponse>(environment.BASE_URL_API + "/user/invoid/create", paymentCreate);
    }
}

export class PaymentCreateModel {
    priceTotal!: number;
    orderInfo!: string;
    orderType!: string;
    payType!: string;
    status!: number;
    message!: string;
    reservationId!: string;
}
