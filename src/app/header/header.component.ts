import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../_service/api.service';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';
import { userProfile } from '../models/userProfile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userProfile = new userProfile;
  constructor(private auth: AuthService, private fb: FormBuilder, private apiServe: ApiService, private userService: UserService){}
  ngOnInit(): void {

    this.getUserProfile()
  }

  getUserProfile() : any{
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
    })
  }

  
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  getUser(){
    return this.apiServe.getUser()
  }
  getLoggedInUser() {
    return this.auth.getLoggedInUser();
  }

  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }

}
