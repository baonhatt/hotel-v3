import { Component, Input, OnInit } from '@angular/core';
import { Room, addRoom } from '../../../models/room.model';
import { ApiService } from '../../../_service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface RoomType {
  id: number;
  typeName: string;
  maxPerson: number;
}
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  isDeleting = false;
  image : any;
  images : any;
  message: any;
  imagePath : any;
  imgURL: any;

  @Input() room: addRoom;
  rooms: any[] = [];
  roomtoDisplay!: addRoom[];
  id!: number;
  typeId!: number;
  roomForm!: FormGroup;
  inputValue: any;
  roomTypes:  RoomType[] = []
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


  uploadFile = (files : any) => {
    if (files.length === 0){
      return;
    }
    if(files.length === 1)
    {
      this.image = files;
      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
  ngOnInit(): void {

    this.api.getRoomTypeId().subscribe((data: any)=>{
      this.roomTypes = data.roomTypes;
      this.typeId = data.roomTypes.id
      });

    this.roomForm = this.fb.group({
      RoomNumber: [''],
      Name: [''],
      IsActive: [''],
      Description: [''],
      CurrentPrice: [''],
      RoomPicture: [''],
      RoomPictures: [''],
      PeopleNumber: [''],
      NumberOfBed: [''],
      RoomTypeId: [''],
      selectedRoomTypeId: ['']
    });
    this.getRooms();
    this.getRoomtype()

  }
  getRoomtype(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.api.getRoomTypeId().subscribe((data: any) => {
        this.roomTypes = data.roomTypes;
        this.typeId = data.roomTypes.id;
        resolve(this.typeId);
      }, reject);
    });
  }
  addRoom(_roomForm: FormGroup){
    let fileToUpload;
    const formData = new FormData();
    if(this.image == null)
    {
      fileToUpload = "";
      formData.append('RoomPicture', fileToUpload);
    }else{
      fileToUpload = <File>this.image[0];
      formData.append('RoomPicture', fileToUpload, fileToUpload.name);
    }
    formData.append('RoomNumber', _roomForm.controls['RoomNumber'].value);
    formData.append('Name', _roomForm.controls['Name'].value);
    formData.append('IsActive', _roomForm.controls['IsActive'].value);
    formData.append('Description', _roomForm.controls['Description'].value);
    formData.append('CurrentPrice', _roomForm.controls['CurrentPrice'].value);
    formData.append('RoomPictures', "");
    formData.append('PeopleNumber', _roomForm.controls['PeopleNumber'].value);
    formData.append('NumberOfBed', _roomForm.controls['NumberOfBed'].value);
    formData.append('RoomTypeId', _roomForm.controls['selectedRoomTypeId'].value);
    this.http.post<any>(`https://webhotel.click/v2/admin/room/create`, formData).subscribe(res => {
      alert("Create an account successfully!");
      this.rooms.unshift(res);
      this.getRooms()
    }, _err => {
      alert(_err);
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
