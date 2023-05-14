import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { roomType } from '../../models/room.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
interface RoomType {
  id: number;
  typeName: string;
}
@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})

export class RoomtypeComponent implements OnInit{
  id!: number;
  roomType!: roomType[];
  roomTypes!: any[];
  nameType!: string;
  nameTypeForm!: FormGroup;
  roomTypeId!: string;
  selectedIds: string[] = [];
  constructor(private api: ApiService, private fb: FormBuilder, private toast: ToastrService){
    this.nameTypeForm = this.fb.group({
      TypeName : ['']
    })
  }
  ngOnInit(): void {
    this.getAll()

  }

  getAll(){
    return this.api.getAllRoomType().subscribe( res => {
      this.roomType = res;
      this.roomTypes = res;
    })
  }
  createRoomType(nameTypeForm: FormGroup){
    // const nameType = this.nameTypeForm?.get('nameType')?.value;
    return this.api.createRoomType(nameTypeForm.value).subscribe( res=>{

      this.toast.success("Add successfully!");
    }, err => {
      this.toast.error(err)
    })
  }
  getRoomTypeIdByNameType(nameType: string): number {
    const roomType = this.roomTypes.find(room => room.nameType === nameType);
    this.nameType = nameType
    return roomType ? roomType.id : null;
  }
  update( nameTypeForm: FormGroup){

      this.api.updateRoomTypeName(this.roomTypeId, nameTypeForm.value)
        .subscribe(
          () => {
            this.toast.success("Add successfully!");
            this.getAll()
          },
          error => {
            console.error('Lỗi khi cập nhật tên loại phòng:', error);
            // Xử lý lỗi nếu có
          }
        );

  }
  toggleSelection(itemId: string) {
    this.roomTypeId = itemId;
  }

  deleteType(id: number){
    this.api.deleteRoomType(id).subscribe(res=>{
      this.toast.success("Delete successfully!");
      this.getAll();
    },err =>{
      this.toast.error(err);
    })
  }
}
