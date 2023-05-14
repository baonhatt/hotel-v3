import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { roomType } from '../../models/room.model';
import { ApiService } from '../../_service/api.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceAttach } from '../../models/serviceAttach.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Discount } from '../../models/discount.model';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent {


  id!: number;
  roomType!: Discount[];

  serviceForm!: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder, private toast: ToastrService){
    this.serviceForm = this.fb.group({
      id: [''],
      discountCode: [''],
      name: [''],
      discountPercent: [''],
      amountUse: [''],
      startAt: [''],
      endAt: [''],
      isPermanent: [''],
      discountTypeId: [''],
      nameType: [''],
      creatorId: [''],
      email: [''],
      roles: [''],
      // icon
    })
  }
  ngOnInit(): void {
    this.api.getAllDiscount().subscribe(res => {
      this.roomType = res
      console.log(res);

    })
  }

  getAll(){
    return this.api.getAllDiscount().subscribe(res => {
      this.roomType = res;
    })
  }
  createRoomType(serviceForm: FormGroup){
    // const service = this.serviceForm?.get('service')?.value;
    return this.api.createService(serviceForm.value).subscribe( res=>{

      this.toast.success("Add successfully!");
      this.getAll();
    }, err => {
      this.toast.error(err);
    })
  }
  update(serviceForm: FormGroup){
     this.api.updateService(serviceForm.value, this.id).subscribe( res =>{
      this.toast.success("Update successfully!");
      this.getAll();

    }, err => {
      this.toast.error(err);
    })
  }
  deleteDiscount(id: number){

    this.api.deleteDiscount(id).subscribe(res=>{
      this.toast.success("Delete successfully!");
      this.getAll()
    },err =>{
      this.toast.error(err);
    })
  }
}
