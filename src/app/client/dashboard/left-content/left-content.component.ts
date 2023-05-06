import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-content',
  templateUrl: './left-content.component.html',
  styleUrls: ['./left-content.component.scss']
})
export class LeftContentComponent {
  constructor(private route: Router){}
  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }
  routepage(){
    this.route.navigate(['/paymentdetail'])
  }
}
