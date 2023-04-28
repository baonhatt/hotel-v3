import { Component } from '@angular/core';
import { userProfile } from '../../models/userProfile.model';
import { AuthService } from '../../_service/auth.service';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../_service/api.service';
import { UserService } from '../../_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userProfile = new userProfile;
  constructor(private auth: AuthService,private route: Router, private fb: FormBuilder, private apiServe: ApiService, private userService: UserService){}
  ngOnInit(): void {
    if(localStorage.getItem('admin_profile') != ""){
      var result = localStorage.getItem('admin_profile')!;
      this.userProfile = JSON.parse(result) as userProfile;
    }else{
      this.getUserProfile();
    }
  }

  getUserProfile() : any{
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
      localStorage.setItem('admin_profile', JSON.stringify(this.userProfile));
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
    localStorage.removeItem('token_admin');
    this.route.navigate(['/login'])
  }

}
