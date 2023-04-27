import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  NgModel,
  Validators,
} from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { TokenModel } from '../_service/token.model';
import { NgToastService } from 'ng-angular-popup';
import { environment } from '../../environments/environment.development';
import { HomepageComponent } from '../homepage/homepage.component';
// import { AuthinterceptorInterceptor } from '../shared/auth/authinterceptor.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  req: HttpRequest<any> | undefined;
  email: any;
  password: any;
  loading = false;
  loginForm!: FormGroup;
  data: any;
  get f() {
    return this.loginForm.controls;
  }
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  routeReset() {
    window.location.href =
      environment.BASE_URL_WEB + `/reset-password?code=reset`;
  }

  login() {
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;
    this.auth.login(email, password).subscribe(
      (response) => {
        console.log(response);
        this.toast.success({
          detail: 'Welcome you !',
          summary: "Login successfull",
          duration: 500000,
        });
        var token = response as TokenModel;
        localStorage.setItem('token', JSON.stringify(token));
        this.route.navigateByUrl('/home');
        this.loading = true;
      },
      (err) => {
        err
        // this.toast.error({
        //   detail: 'Error Message',
        //   summary: err.message,
        //   duration: 5000,
        // });
      }
    );
  }

  getUserData() {
    window.self.close();
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }
}
