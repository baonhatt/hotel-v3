import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import {  Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit{
  loading = false;
  submitted = false;
  password: any;
  signup!: FormGroup;
  signuser: any;
  userName!: string;
  email!: any;
  get f() {
    return this.signup.controls
  }
  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder, @Inject(DOCUMENT) private document: Document){}
  ngOnInit(): void {
    this.injectScript("assets/js/signup/signup.js");
    this.signup = this.fb.group({
      name: ['',Validators.required, Validators.name],
      Email: ['', [Validators.required ,Validators.email]],
      userName: ['',Validators.required, Validators.name],
      phoneNumber:['', Validators.required, Validators.pattern("[0-9 ]{12}")],
      password: ['',[Validators.required,Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')]],
      confirmPassword: ['',[Validators.required, Validators.pattern(this.password)]]
    })
  }

  signupdata(signup: FormGroup){

    this.http.post<any>(`${environment.BASE_URL_API}/user/register`, this.signup.value)
    .subscribe(res =>{
      alert("Create an account successfully!");

      this.route.navigate(['login'])
    },_err=>{
      alert('Something was wrong');

    })
  }

  onSubmit() {
    // this.submitted = true;
    // this.loading = true;
    // // stop here if form is invalid
    // if (this.signup.invalid) {
    //     return ;
    // }

    this.signupdata(this.signup)
  }
  cfPass(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = this.signup.controls[password];
      const matchingControl = this.signup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['confirmPassword']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
        return { confirmPassword: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  public injectScript(src: string) {
    if(this.document && src?.trim()) {
        const script = this.document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src",src.trim());
        this.document.head?.appendChild(script);
    }
}
}
