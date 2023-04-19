import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment.development';
import { FormControl } from '@angular/forms';
import { userProfile } from 'src/app/models/userProfile.model';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  updateProfile!: FormGroup;
  loading = false;
  submitted = false;
  userProfile = new userProfile;
  files : any;
  imagePath : any;
  imgURL: any;
  message: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: Router,
    private toast: NgToastService,
    private userService: UserService,
  ){}
  get f() {
    return this.updateProfile.controls
  }
  ngOnInit(): void {
    this.updateProfile = this.fb.group({
      PhoneNumber:[''],
      CMND: [''],
      Address: ['']
    });
    this.getUserProfile();

  }
  uploadFile = (files : any) => {
    this.files = files;
    if (files.length === 0)
      return;

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
  getUserProfile() : void{
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
    })
  }

  updateUserProfile(updateProfile: FormGroup){
    let fileToUpload = <File>this.files[0];
    const formData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('Address', this.updateProfile.controls['Address'].value);
    formData.append('PhoneNumber', this.updateProfile.controls['PhoneNumber'].value);
    formData.append('CMND', this.updateProfile.controls['CMND'].value);
    this.http.post<any>(environment.BASE_URL_API + `/user/user-profile/update`, formData )
    .subscribe((res) =>{
      this.toast.success({
        detail: res
      });
    }, err => {
      this.toast.error({
        detail: err
      });
    });
  }

  OnSubmit(){
    this.loading = true;
    console.log(this.updateProfile);
    console.log("Đã submit");

    this.updateUserProfile(this.updateProfile);
  }

  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }
}
