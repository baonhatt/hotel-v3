import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service';
import { Room } from '../models/room.model';
@Component({
  selector: 'app-hot-sale',
  templateUrl: './hot-sale.component.html',
  styleUrls: ['./hot-sale.component.scss']
})
export class HotSaleComponent implements OnInit{
  discountRoom!: Room[]
  constructor(
    private api: ApiService
  ){

  }

  ngOnInit(): void {
    this.api  .getRoomOnSale().subscribe(
      (rooms: Room[]) => {
        this.discountRoom = rooms;
      },
      (error: any) => {
        console.log(error);
      }
    );
   
  }

}
