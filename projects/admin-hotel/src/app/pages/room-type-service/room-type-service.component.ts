import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { roomType } from '../../models/room.model';
import { ApiService } from '../../_service/api.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceAttach } from '../../models/serviceAttach.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomTypeService } from '../../models/roomtypeservice.model';

@Component({
    selector: 'app-room-type-service',
    templateUrl: './room-type-service.component.html',
    styleUrls: ['./room-type-service.component.css']
})
export class RoomTypeServiceComponent {

    imagePreviewUrl!: string | ArrayBuffer | null;
    picture!: any
    id!: number;
    roomType!: RoomTypeService[];
    roomTypeResult!: RoomTypeService[];
    searchTerm: string = '';
    serviceForm2!: FormGroup;
    constructor(private api: ApiService, private http: HttpClient, private fb: FormBuilder, private toast: ToastrService) {
        this.serviceForm2 = this.fb.group({
            name: [''],
            picture: [''],
            amount: [''],
            price: [''],
        })
    }
    ngOnInit(): void {
        this.api.getAllRoomTypeService().subscribe(res => {
            this.roomType = res;
            this.roomTypeResult = res;
            console.log(res);

        })
    }

    searchBookings() {
        // Chuyển đổi từ khóa tìm kiếm thành chữ thường
        const searchTerm = this.searchTerm.toLowerCase();
        // Lọc các đặt phòng dựa trên từ khóa tìm kiếm
        this.roomType = this.roomType.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)

        );
        this.searchTerm = ''

    }
    clearSearch() {
        this.roomType = this.roomTypeResult
    }

    getAll() {
        return this.api.getAllRoomTypeService().subscribe(res => {
            this.roomType = res;
        })
    }
    createRoomType(serviceForm2: FormGroup) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const requestData = {
            name: serviceForm2.controls['name'].value,
            price: serviceForm2.controls['price'].value,
            amount: serviceForm2.controls['amount'].value,
            picture: serviceForm2.controls['picture'].value
        };
        this.http.post<any>('https://webhotel.click/v2/admin/service-room/create', requestData, httpOptions)
            .subscribe(
                response => {
                    console.log(response);
                    this.toast.success(" Add successfully!")
                },
                error => {
                    console.error(error);
                    this.toast.error(error.error.message)
                }
            );
    }
    uploadFileDetail = (event: any) => {
        let files = event.target.files;
        if (files.length === 0) {
            return;
        }
        if (files.length > 0) {
            this.picture = files;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreviewUrl = reader.result;
            };
            reader.readAsDataURL(files);
            const serviceImageControl = this.serviceForm2.get('serviceImage');
            if (serviceImageControl) {
                serviceImageControl.updateValueAndValidity();
            }
        }
    };


   

}
