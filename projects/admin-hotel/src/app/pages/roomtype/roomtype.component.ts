import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { roomType } from '../../models/room.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent implements OnInit{
  id!: number;
  roomType!: roomType[];

  nameTypeForm!: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder, private toast: ToastrService){
    this.nameTypeForm = this.fb.group({
      TypeName : ['']
    })
  }
  ngOnInit(): void {
    this.api.getAllRoomType().subscribe(res => {
      this.roomType = res;
      console.log(res);

    })
  }

  getAll(){
    return this.api.getAllRoomType().subscribe(res => {
      this.roomType = res;
    })
  }
  createRoomType(nameTypeForm: FormGroup){
    // const nameType = this.nameTypeForm?.get('nameType')?.value;
    return this.api.createRoomType(nameTypeForm.value).subscribe( res=>{

      this.toast.success("Add successfully!");
      this.getAll();
    }, err => {
      this.toast.error(err)
    })
  }
  update(nameTypeForm: FormGroup){
     this.api.updateRoomType(nameTypeForm.value, this.id = 5).subscribe( res =>{
      this.toast.success("Update successfully!");
      this.getAll();

    }, err => {
      this.toast.error(err)
    })
  }
  deleteType(id: number){
    this.api.deleteRoomType(id).subscribe(res=>{
      this.toast.success("Delete successfully!");
    },err =>{
      this.toast.error(err);
    })
  }
}
