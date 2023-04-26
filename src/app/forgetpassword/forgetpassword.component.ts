import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../_service/auth.service'
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  email: any;
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private toast: NgToastService) { }
  forgotPasswordForm!: FormGroup
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.auth.requestChangePassword(this.form.value.email, environment.BASE_URL_WEB + "/reset-password")
      .subscribe((result_resetpasswordstatus) => {
        const message = result_resetpasswordstatus.message
        this.toast.success({
          detail: message
        })

      },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: err.error.message
          })
        })
  }
}
