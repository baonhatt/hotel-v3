import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../pages/modal/modal/modal.component';
import { FormGroup } from '@angular/forms';
MatDialog
@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  imgUrl!: string;
  id!: any;
  rateForm!: FormGroup;
  room!: Room;
  imageUrls: string[] = [];
  roomId!: any;
  showModal = false;
  rating = 0;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private viewPort: ViewportScroller, private dialogref: MatDialog){

    
  }
  isHomePageLoaded = false;
  ngOnInit() {

    window.scrollTo(0, 0);
    this.roomId = this.route.snapshot.paramMap.get('id')
    this.viewPort.scrollToPosition([0, 0]);
    this.getRoomById();


    const dataToSave = JSON.stringify(this.roomId);
    localStorage.setItem('star', dataToSave);
  }

  openDialog(){
    this.dialogref.open(ModalComponent)
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

