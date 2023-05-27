import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service';
import { Room } from '../models/room.model';
@Component({
  selector: 'app-hot-sale',
  templateUrl: './hot-sale.component.html',
  styleUrls: ['./hot-sale.component.scss']
})
export class HotSaleComponent implements OnInit{
  discountRoom!: Room[];
  slideAnimation: string = '';
  currentIndex: number = 0;
  startIndex: number = 0;
  endIndex: number = 1;
  constructor(
    private api: ApiService
  ){

  }




  ngOnInit(): void {
    this.api.getRoomOnSale().subscribe(
      (rooms: Room[]) => {
        this.discountRoom = rooms;
      },
      (error: any) => {
        console.log(error);
      }
    );

  }
  nextProduct(): void {
    this.currentIndex++;
    if (this.currentIndex > this.endIndex) {
      this.startIndex++;
      this.endIndex++;
    }
    this.slideAnimation = 'slide-next'; // Áp dụng hiệu ứng slide khi chuyển qua phần tử tiếp theo
  }

  previousProduct(): void {
    this.currentIndex--;
    if (this.currentIndex < this.startIndex) {
      this.startIndex--;
      this.endIndex--;
    }
    this.slideAnimation = 'slide-previous'; // Áp dụng hiệu ứng slide khi chuyển qua phần tử trước đó
  }

}
