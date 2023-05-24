import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { Staff } from '../../models/staff.model';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    Accounts: Staff[] = [];
    numAccount!: number;
    numbBookings!: number;
    revenueTotal!: number;
    constructor(private api: ApiService) { }
    ngOnInit(): void {

        this.api.getallUser().subscribe(res => {
            this.Accounts = res
            console.log(this.Accounts)

        })
    }
}