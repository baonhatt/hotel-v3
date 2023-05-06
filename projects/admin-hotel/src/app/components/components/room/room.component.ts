import { Component, Input, OnInit } from '@angular/core';
import { Room, addRoom } from '../../../models/room.model';
import { ApiService } from '../../../_service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
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
  image : any;
  images : any;
  message: any;
  imagePath : any;
  imgURL: any;
  submitted = false;
  modal:any;

  @Input() room: addRoom;
  rooms: Room[];
  id!: number;
  typeId!: number;
  roomForm!: FormGroup;
  inputValue: any;
  roomTypes:  RoomType[] = []
  get f() {
    return this.roomForm.controls;
  }
  constructor(
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.rooms = []
    this.room = {
      roomNumber : '',
      name : '',
      isActive : true,
      description : '',
      roomPicture : '',
      roomPictures : '',
      numberOfSimpleBed : '1',
      numberOfDoubleBed : '1',
      currentPrice : 0,
      roomTypeId : 0,
      peopleNumber : '',
    }
  }
  uploadFileDetail= (files : any) => {
    if (files.length === 0){
      return;
    }
    if(files.length > 0)
    {
      this.images = files;
      // var mimeType = files[0].type;
      // if (mimeType.match(/image\/*/) == null) {
      //   this.message = "Only images are supported.";
      //   return;
      // }
      // var reader = new FileReader();
      // this.imagePath = files;
      // reader.readAsDataURL(files[0]);
      // reader.onload = (_event) => {
      //   this.imgURL = reader.result;
      // }
    }
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
    this.getRooms()
    this.toastr.success('This is a success message', 'Tada');
    this.loadModal();
    this.api.getRoomTypeId().subscribe((data: any)=>{
      this.roomTypes = data.roomTypes;
      this.typeId = data.roomTypes.id
    });
    this.getRooms();
    this.getRoomtype()
    console.log(this.roomForm);
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
    this.submitted = true;
    if (this.roomForm.invalid) {
      return;
    }
    let fileToUpload;
    let fileToUploads;
    const formData = new FormData();
    if(this.image == null)
    {
      fileToUpload = "";
      formData.append('RoomPicture', fileToUpload);
    }else{
      fileToUpload = <File>this.image[0];
      formData.append('RoomPicture', fileToUpload, fileToUpload.name);
    }
    if(this.images == null)
    {
      fileToUploads = "";
      formData.append('RoomPicture', fileToUploads);
    }else{
      fileToUploads = <File[]>this.images;
      fileToUploads.forEach((file)=>
      {
        formData.append('RoomPictures', file,file.name);
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
      // this.toastr.success({
      //   detail: 'Welcome you !',
      //   summary: 'Đăng nhập thành công!',
      //   duration: 5000,
      // });
      $('#addRoom').attr('data-bs-dismiss', 'modal');
      this.getRooms()
      this.loadModal();
    }, _err => {
      alert(_err);
    })

  }
  getRooms() {
    this.api.getRooms().subscribe((res) => {
      this.rooms = res;
    })
  }
  routePage() {
    this.router.navigate(['/room-detail/{{room.id}}']);
  }

  loadModal() {
    this.submitted = false;
    this.roomForm = this.fb.group({
      Name: ['', [Validators.required]],
      RoomNumber: ['', [Validators.required]],
      IsActive: [true, [Validators.required]],
      Description: [''],
      CurrentPrice: ['0', [Validators.required]],
      RoomPicture: [''],
      RoomPictures: [''],
      PeopleNumber: ['1', [Validators.required]],
      NumberOfSimpleBed: ['1', [Validators.required] ],
      NumberOfDoubleBed: ['1', [Validators.required]],
      RoomTypeId: ['1', [Validators.required]],
    });
    console.log(this.roomForm);
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
