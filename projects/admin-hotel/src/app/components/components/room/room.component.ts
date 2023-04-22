import { Component, Input, OnInit } from '@angular/core';
import { Room, addRoom } from '../../../models/room.model';
import { ApiService } from '../../../_service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  isDeleting = false;
  @Input() room: addRoom;
  rooms: any[] = [];
  roomtoDisplay!: addRoom[] ;
  id!: number;
  roomForm!: FormGroup;
  inputValue: any;
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
    private fb: FormBuilder
  ) {
    this.roomForm = this.fb.group({ });
    this.rooms = []
    this.room = {
      roomTypeName: '',
      name: '',
      roomPicture: '',
      description:'',
      rating: '',
      currentPrice: 0,
      discountPrice: 0,
      peopleNumber: '',
      numberOfBed: '',
      starAmount: 0,
    }
    this.roomtoDisplay = this.rooms
  }

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      roomTypeName: this.fb.control(''),
      name: this.fb.control(''),
      roomPicture: this.fb.control(''),
      isActive: this.fb.control(''),
      rating: this.fb.control(''),
      currentPrice: this.fb.control(''),
      discountPrice: this.fb.control(''),
      peopleNumber: this.fb.control(''),
      numberOfBed: this.fb.control(''),
      starAmount: this.fb.control(''),
    });


    this.getRooms();
  }

  addRoom(){
    let room: addRoom = {
      roomTypeName: this.roomOption[parseInt(this.RoomTypeName.value)],
      name: this.Name.value,
      roomPicture: this.RoomPicture.value,
      rating: this.Rating.value,
      currentPrice: this.CurrentPrice.value,
      description: this.Description.value,
      discountPrice: this.DiscountPrice.value,
      peopleNumber: this.PeopleNumber.value,
      numberOfBed: this.Bednums[parseInt(this.NumberOfBed.value)],
      starAmount: this.StarAmount.value,
      // img: this.Img.value
    };
    this.api.postRoom(room).subscribe((res) => {
      this.rooms.unshift(res);
    });
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
    this.router.navigate(['/room-detail/{{room.id}}'])
  }

  reset() {
    // this.userForm.reset();
  }

  deleteRoom(id: string) {
    this.api.deleteRoom(id).subscribe({
      next: (res) => {
        alert('Room deleted!');
        this.getRooms();

      },
      error: console.log,
    });
  }

  public get RoomTypeName(): FormControl {
    return this.roomForm.get('roomTypeName') as FormControl;
  }
  public get Name(): FormControl {
    return this.roomForm.get('name') as FormControl;
  }
  public get RoomPicture(): FormControl {
    return this.roomForm.get('roomPicture') as FormControl;
  }
  public get Description(): FormControl {
    return this.roomForm.get('description') as FormControl;
  }
  public get IsActive(): FormControl {
    return this.roomForm.get('isActive') as FormControl;
  }
  public get Rating(): FormControl {
    return this.roomForm.get('rating') as FormControl;
  }
  public get CurrentPrice(): FormControl {
    return this.roomForm.get('currentPrice') as FormControl;
  }
  public get PeopleNumber(): FormControl {
    return this.roomForm.get('peopleNumber') as FormControl;
  }
  public get NumberOfBed(): FormControl {
    return this.roomForm.get('numberOfBed') as FormControl;
  }
  public get StarAmount(): FormControl {
    return this.roomForm.get('starAmount') as FormControl;
  }
  public get DiscountPrice(): FormControl {
    return this.roomForm.get('discountPrice') as FormControl;
  }

}
