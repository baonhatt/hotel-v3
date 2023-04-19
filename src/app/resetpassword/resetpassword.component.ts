import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../_service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  //tạo 1 cái form lấy hết dữ liệu bên html về
  //nhớ tên phải là newPassword và confirmNewPassword
  form!: FormGroup;
  loading = false;
  submitted = false;
  newPassword: any;
  confirmNewPassword: any;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required
    ]
    });
  }
  // get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    var token =this.route.snapshot.queryParams['token'];
    var email = this.route.snapshot.queryParams['email'];

    this.auth.confirmChangePasswordViaEmail(token, this.form.value.newPassword, this.form.value.confirmNewPassword, email)
      .subscribe((res) => {
        if (res.statusCode == 1) {
          //thêm toasrt res.message
          this.toast.success({
            detail:" Successfully changed password!"
          })
          this.router.navigate(['login'])
        }
        else {
          this.toast.error({
            detail:" Make sure your password match!"
          })
        }
      },
        (err) => {
          console.log(err);
        })
  }
}
