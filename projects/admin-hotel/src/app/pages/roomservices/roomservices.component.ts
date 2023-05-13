import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { roomType } from '../../models/room.model';
import { ApiService } from '../../_service/api.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceAttach } from '../../models/serviceAttach.model';

@Component({
  selector: 'app-roomservices',
  templateUrl: './roomservices.component.html',
  styleUrls: ['./roomservices.component.css']
})
export class RoomservicesComponent {


  id!: number;
  roomType!: ServiceAttach[];

  nameTypeForm!: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder, private toast: ToastrService){
    this.nameTypeForm = this.fb.group({
      TypeName : [''],
      // icon
    })
  }
  ngOnInit(): void {
    this.api.getAllService().subscribe(res => {
      this.roomType = res;
      console.log(res);

    })
  }

  getAll(){
    return this.api.getAllService().subscribe(res => {
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
