import { Component, Input, OnInit } from '@angular/core';
import { Room, addRoom } from '../../../models/room.model';
import { ApiService } from '../../../_service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
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
  roomNum!: number;
  selectedRoomId: string | undefined;
  roomData: any;
  typeId!: number;
  isDeleting = false;
  image: any;
  images: any;
  message: any;
  imagePath: any;
  imgURL: any;
  @Input() room: addRoom;
  rooms: any[] = [];
  roomtoDisplay!: addRoom[];
  id!: number;
  roomForm!: FormGroup;
  inputValue: any;
  roomTypes: RoomType[] = []
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
    private http: HttpClient,
    private toast: NgToastService
  ) {
    this.rooms = []
    this.room = {
      NumberOfBed: 0,
      RoomPicture: '',
      RoomPictures: '',
      RoomNumber: '',
      Name: '',
      IsActive: '',
      RoomTypeId: '',
      CurrentPrice: '',
      PeopleNumber: '',
      Description: '',
    }
    this.roomtoDisplay = this.rooms
  }


  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    if (files.length === 1) {
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
    });
    this.getRooms();
    this.getRoomtype();
    this.loadModal(this.roomForm.value);
    this.api.getRoomTypeId().subscribe((data: any) => {
      this.roomTypes = data.roomTypes;
      this.typeId = data.roomTypes.id
    });

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
  loadModal(roomId: string) {


    this.api.getRoomDetail(roomId).subscribe( res =>{
      return this.roomNum = res.roomNumber
   })
    this.roomForm = this.fb.group({
      Name: ['', [Validators.required]],
      RoomNumber: [this.roomNum, [Validators.required]],
      IsActive: [true, [Validators.required]],
      Description: [''],
      CurrentPrice: ['1000000', [Validators.required]],
      RoomPicture: [''],
      NumberOfBed: ['2'],
      RoomPictures: [''],
      discountPrice: ['10'],
      PeopleNumber: ['1', [Validators.required]],
      NumberOfSimpleBed: ['1', [Validators.required]],
      NumberOfDoubleBed: ['1', [Validators.required]],
      RoomTypeId: ['1', [Validators.required]],
    });
    console.log(this.roomForm);
  }
  addRoom(_roomForm: FormGroup) {
    if (this.roomForm.invalid) {
      return;
    }
    let fileToUpload;
    let fileToUploads;
    const formData = new FormData();
    if (this.image == null) {
      fileToUpload = "";
      formData.append('RoomPicture', fileToUpload);
    } else {
      fileToUpload = <File>this.image[0];
      formData.append('RoomPicture', fileToUpload, fileToUpload.name);
    }
    if (this.images == null) {
      fileToUploads = "";
      formData.append('RoomPicture', fileToUploads);
    } else {
      fileToUploads = <File[]>this.images;
      fileToUploads.forEach((file) => {
        formData.append('RoomPictures', file, file.name);
      });
    }
    formData.append('RoomNumber', _roomForm.controls['RoomNumber'].value);
    formData.append('Name', _roomForm.controls['Name'].value);
    formData.append('IsActive', _roomForm.controls['IsActive'].value);
    formData.append('Description', _roomForm.controls['Description'].value);
    formData.append('CurrentPrice', _roomForm.controls['CurrentPrice'].value);
    formData.append('RoomPictures', "");
    formData.append('PeopleNumber', _roomForm.controls['PeopleNumber'].value);
    formData.append('NumberOfSimpleBed', _roomForm.controls['NumberOfSimpleBed'].value);
    formData.append('NumberOfNumberOfDoubleBedBed', _roomForm.controls['NumberOfDoubleBed'].value);
    formData.append('RoomTypeId', _roomForm.controls['RoomTypeId'].value);
    this.http.post<any>(`https://webhotel.click/v2/admin/room/create`, formData).subscribe(res => {


      $('#addRoom').attr('data-bs-dismiss', 'modal');
      this.getRooms();

    this.loadModal(this.roomForm.value);

      alert(res.message);



    }, _err => {
     alert(_err.error.message);

    })

  }



  updateRoom(roomId: string  | undefined, _roomForm2: FormGroup) {


    // Identity roomId
    if (!roomId) {

      return;
    }


    if (this.roomForm.invalid) {
      return;
    }
    this.api.deleteRoom(roomId)

    let fileToUpload: File | undefined;
    let fileToUploads: File[] | undefined;
    const formData = new FormData();

    if (this.image == null) {
      fileToUpload = undefined;
      formData.append('RoomPicture', '');
    } else {
      fileToUpload = this.image[0] as File;
      formData.append('RoomPicture', fileToUpload, fileToUpload.name);
    }

    if (this.images == null) {
      fileToUploads = undefined;
      formData.append('RoomPictures', '');
    } else {
      fileToUploads = this.images as File[];
      fileToUploads.forEach((file) => {
        formData.append('RoomPictures', file, file.name);
      });
    }



    formData.append('RoomNumber', _roomForm2.controls['RoomNumber'].value);
    formData.append('Name', _roomForm2.controls['Name'].value);
    formData.append('IsActive', _roomForm2.controls['IsActive'].value);
    formData.append('Description', _roomForm2.controls['Description'].value);
    formData.append('CurrentPrice', _roomForm2.controls['CurrentPrice'].value);
    formData.append('PeopleNumber', _roomForm2.controls['PeopleNumber'].value);
    formData.append('NumberOfSimpleBed', _roomForm2.controls['NumberOfSimpleBed'].value);
    formData.append('NumberOfNumberOfDoubleBedBed', _roomForm2.controls['NumberOfDoubleBed'].value);
    formData.append('RoomTypeId', _roomForm2.controls['RoomTypeId'].value);

    this.http.post<any>(`https://webhotel.click/v2/admin/room/update?id=${roomId}`, formData).subscribe(
      res => {
        $('#addRoom').attr('data-bs-dismiss', 'modal');
        this.getRooms();
        this.loadModal(this.roomForm.value);

        alert(res.message);
      },
      err => {
        alert(err.error.message);
      }
    );
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

 

  deleteRoom(id: string) {

    if (confirm('Are you want to delete this room?')) {

      this.api.deleteRoom(id).subscribe({
        next: (_res) => {
          alert('Room deleted!');
          this.getRooms();

        },
        error: (err: any)=>{
          alert(err.error.message)
        }
      });
    }
  }



}
