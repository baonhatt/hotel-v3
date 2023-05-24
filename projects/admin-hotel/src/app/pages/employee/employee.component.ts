import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { Staff } from '../../models/staff.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    Accounts: Staff[] = [];
    numAccount!: number;
    numbBookings!: number;
    revenueTotal!: number;
    constructor(private api: ApiService) { }
    ngOnInit(): void {

        this.api.getallEmployee().subscribe(res => {
            this.Accounts = res
            console.log(this.Accounts)

        })
    }
}