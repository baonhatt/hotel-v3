import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit{
  email!: string;
  changpwForm!: FormGroup;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ){
    this.changpwForm = this.fb.group({

    })
  }
  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(res=>{
      console.log(res);
      this.email = res.email

    })
  }

}
