import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RequestService} from '../request.service';
import {UserService} from "../user.service";

import {Md5} from 'ts-md5';
import {OemService} from "../oem.service";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzInputGroupComponent,
    NzFormControlComponent,
    NzRowDirective,
    NzColDirective,
    NzCheckboxComponent,
    NzButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NzInputDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  oem: any;

  constructor(private fb: FormBuilder,
              private rs: RequestService,
              private us: UserService,
              private router: Router,
              protected os: OemService
  ) {
    this.oem = os.oem;
  }

  submitForm(): void {
    console.log('submit form');
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }

    const password = Md5.hashStr(this.validateForm.value.password);

    this.rs.post('login', {username: this.validateForm.value.username, password}).subscribe(res => {
      console.log('res:', res);
      //this.us.setUser(res.data);

      //localStorage.setItem('token', res.data.token);

      //更新用户
      this.us.setUser(res.data);

      //TODO 缓存用户喜好
      // let main = localStorage.getItem("main") || "/admin"
      let main = "/admin";
      this.router.navigate([main]).then(r => {
      });

    }, err => {
      console.log('err:', err);
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
  }
}
