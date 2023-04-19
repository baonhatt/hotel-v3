import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  // @Input() room!: Room;
  room!: any;
  roomId!: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService){}
  isHomePageLoaded = false;
  ngOnInit() {

    this.roomId = this.route.snapshot.paramMap.get('id')

    this.getRoomById();

  }
  getRoomById(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getRoomDetail(id)
      .subscribe(res => {
        console.log(res);
        this.room = res

      });
  }

  loadPage(){}


}

