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

  discountId!: number;
  id!: number;
  roomType!: Discount[];

  serviceForm!: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder, private toast: ToastrService){
    this.serviceForm = this.fb.group({
      discountCode: [''],
      name: [''],
      discountPercent: [''],
      amountUse: [''],
      startAt: [''],
      endAt: [''],
      isPermanent: [''],
      discountTypeId: [''],
    })
  }
  ngOnInit(): void {
    this.api.getAllDiscount().subscribe(res => {
      this.roomType = res
      console.log(res);

    })

  }


  loadModal(id: number){
    this.getId(id)
    this.api.getDiscountId(this.discountId).subscribe( (res)=>{
      this.serviceForm = this.fb.group({
        discountCode: [res?.discountCode],
        name: [res?.name],
        discountPercent: [res?.discountPercent],
        amountUse: [res?.amountUse],
        startAt: [res?.startAt],
        endAt: [res?.endAt],
        isPermanent: [res?.isPermanent],
        discountTypeId: [res?.discountTypeId],
      })
    })


  }
  getId(id: number){
    this.discountId = id

  }
  getAll(){
    return this.api.getAllDiscount().subscribe(res => {
      this.roomType = res;
    })
  }
  createRoomType(serviceForm: FormGroup){
    // const service = this.serviceForm?.get('service')?.value;
    return this.api.createDiscount(serviceForm.value).subscribe( res=>{
      this.toast.success("Add successfully!");
      this.getAll();
    }, err => {
      this.toast.error(err);
    })
  }
  update(serviceForm: FormGroup){

     this.api.updateDiscount(serviceForm.value, this.discountId).subscribe( res =>{
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
