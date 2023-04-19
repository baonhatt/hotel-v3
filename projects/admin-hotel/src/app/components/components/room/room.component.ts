import { Component, OnInit } from '@angular/core';
import { Room } from '../../../models/room.model';
import { ApiService } from '../../../_service/api.service';
import { Router } from '@angular/router';
import { id } from '@cds/core/internal';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  isDeleting = false;
  rooms: Room[] = [];
  id!: number;
  constructor( private roomService: ApiService,
    private router: Router,
    private api: ApiService
    ){


  }
  ngOnInit(): void {

    this.getRooms();
  }
  getRooms(){
    this.roomService.getRooms().subscribe((res: any)=>{
      this.rooms = res;
      this.id = res;
    })
  }
  routePage(){
    this.router.navigate(['/room-detail/{{room.id}}'])
  }

  reset() {
    // this.userForm.reset();
  }
  removeItem(element: any) {
    this.rooms.forEach((value: any, index: any) => {
      if (value == element) {
        this.rooms.splice(index, 1);
      }
    });
  }
  deleteRoom(id: number) {
    this.api.deleteRoom(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.getRooms();
      },
      error: console.log,
    });
  }
}
