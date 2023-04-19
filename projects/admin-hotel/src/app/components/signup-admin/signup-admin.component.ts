import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/_service/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  signupForm!: FormGroup;



  constructor( private fb: FormBuilder, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName : [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  signupdata(signup: FormGroup){
     this.http.post<any>('https://webhotel.click/admin/register',this.signupForm.value).subscribe(res =>{
      console.log(res);
      this.toast.success({
        detail: 'Your account is register successfully!'
      })
     },err =>{
      console.log(err);
      this.toast.error({
        detail: 'Something was wrong!'
      })
     })
  }
  OnSubmit(){
    this.signupdata(this.signupForm)
  }

}
