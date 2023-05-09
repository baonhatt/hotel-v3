import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  imgUrl!: string;
  room!: Room;
  imageUrls: string[] = [];
  roomId!: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private viewPort: ViewportScroller){}
  isHomePageLoaded = false;
  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id')
    this.viewPort.scrollToPosition([0, 0]);

    this.getRoomById();
  }
  getRoomById(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getRoomDetail(id)
      .subscribe(res => {
        console.log(res);
        this.room = res
        const linkArray: string[] = JSON.parse(res.roomPictures);
        const formattedLinks: string[] = linkArray.map((link: string) => `${link}`);
        // this.imageUrls = formattedLinks
        this.imageUrls = formattedLinks
        console.log(this.imageUrls)


      });
  }

  loadPage(){}

}

