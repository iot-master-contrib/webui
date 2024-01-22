import { Component } from '@angular/core';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { Md5 } from "ts-md5";
import {Router} from "@angular/router";
import {RequestService} from "../../request.service";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "ng-zorro-antd/form";

@Component({
  standalone: true,
  selector: 'app-password',
  templateUrl: './password.component.html',
  imports: [
    NzInputDirective,
    NzFormModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  group!: FormGroup;
  id: any = 0

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rs: RequestService,
    private msg: NzMessageService) {
    this.build()
  }


  build() {
    this.group = this.fb.group({
      old: ['', [Validators.required]],
      new: ['', [Validators.required]],
      repeat: ['', [Validators.required]],
    })
  }

  submit() {

    return new Promise((resolve, reject) => {
      if (this.group.valid) {
        const { old, repeat } = this.group.value;
        const newPassword = this.group.value.new;
        if (newPassword !== repeat) {
          this.msg.warning("两次密码输入不一致，请确认");
          return reject();
        }
        const body = {
          old: Md5.hashStr(old),
          new: Md5.hashStr(newPassword),
        }
        this.rs.post("password", body).subscribe(res => {
          //清空session
          this.rs.get("logout").subscribe(res => { })
          this.router.navigateByUrl("/login");
          this.msg.success("保存成功");
          resolve(true);
        })
      } else {
        Object.values(this.group.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
            reject();
          }
        });
      }
    })
  }
}
