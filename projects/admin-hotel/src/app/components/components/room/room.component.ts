import { Component, Input, OnInit } from '@angular/core';
import { Room, addRoom } from '../../../models/room.model';
import { ApiService } from '../../../_service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  isDeleting = false;

  selectedImage!: File;

  @Input() room: addRoom;
  rooms: any[] = [];
  roomtoDisplay!: addRoom[];
  id!: number;
  roomForm!: FormGroup;
  inputValue: any;
  active = [
    'true',
    'false'
  ]
  roomOption = [
    'Single',
    'Deluxe',
    'Double',
    'Quad',
    'King',
  ];
  Bednums = [
    '1',
    '2',
    '3',
    '4',
  ];

  constructor(private roomService: ApiService,
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.rooms = []
    this.room = {
      NumberOfBed:  0,
      RoomPicture:  '',
      RoomNumber:  '',
      Name:  '',
      IsActive:  '',
      RoomTypeId:  '',
      CurrentPrice:  '',
      PeopleNumber:  '',
      Description:  '',
    }
    this.roomtoDisplay = this.rooms
  }


  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  ngOnInit(): void {
    this.roomForm = this.fb.group({
      NumberOfBed: [''],
      RoomPicture: [''],
      RoomNumber: [''],
      Name: [''],
      IsActive: [''],
      RoomTypeId: [''],
      CurrentPrice: [''],
      PeopleNumber: [''],
      Description: ['']
    });




    this.getRooms();
  }

  addRoom(_roomForm: FormGroup){

    this.http.post<any>(`https://webhotel.click/v2/admin/room/create`, this.roomForm.value).subscribe(res => {
      alert("Create an account successfully!");
      this.rooms.unshift(res);
    }, _err => {
      alert('Something was wrong');

    })

  }
  getRooms() {
    this.roomService.getRooms().subscribe((res: any) => {
      for (let r of res) {
        this.rooms.unshift(r);
      }
      this.rooms = res;
      this.id = res;
      this.roomtoDisplay = this.rooms
    })
  }
  routePage() {
    this.router.navigate(['/room-detail/{{room.id}}']);
  }

  reset() {
    // this.userForm.reset();
  }

  deleteRoom(id: string) {
    if(confirm('Are you want to delete this room?')){
    //   this.rooms.forEach((value, index) =>{
    //     if(value.id == parseInt(id)){
    //       this.api.deleteRoom(id).subscribe((res) =>{
    //         this.rooms.splice(index, 1)
    //       });
    //     }
    //   });
    // }
    this.api.deleteRoom(id).subscribe({
      next: (_res) => {
        alert('Room deleted!');
        this.getRooms();

      },
      error: console.log,
    });
  }
  }
}
