import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-layoutpage',
  templateUrl: './layoutpage.component.html',
  styleUrls: ['./layoutpage.component.css'],
})

export class LayoutpageComponent implements OnInit {
  sideBarOpen = true;
  constructor(private toast: NgToastService) {}
  ngOnInit(): void {
    if (localStorage.getItem('firstLogin') == '') {
      setTimeout(() => {
        console.log(123);
        this.toast.success({
          detail: 'Welcome you !',
          summary: 'Đăng nhập thành công!',
          duration: 5000,
        });
        localStorage.removeItem('firstLogin');
      }, 500);
    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
