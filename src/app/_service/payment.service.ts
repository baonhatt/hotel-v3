import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor( private http: HttpClient) { }

  
}
