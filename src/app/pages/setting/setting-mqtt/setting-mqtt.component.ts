import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequestService } from '../../../request.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {
  NzInputDirective,
  NzTextareaCountComponent,
} from 'ng-zorro-antd/input';
import {
  NzPageHeaderComponent,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective,
} from 'ng-zorro-antd/page-header';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import {
  NzUploadChangeParam,
  NzUploadComponent,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setting-mqtt',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzRowDirective,
    NzSelectComponent,
    NzSpaceComponent,
    NzTextareaCountComponent,
    ReactiveFormsModule,
    NzSpaceItemDirective,
    NzSwitchComponent,
    NzOptionComponent,
    NzUploadComponent,
    NzIconDirective,
    NgIf,
  ],
  templateUrl: './setting-mqtt.component.html',
  styleUrl: './setting-mqtt.component.scss'
})
export class SettingMqttComponent implements OnInit{
  formGroup!: FormGroup;
  data: any = {};
constructor(
  private fb: FormBuilder,
  private route: Router,
  private rs: RequestService,
  private msg: NzMessageService
){ this.buildFromGroup();}

buildFromGroup() {
  this.formGroup = this.fb.group({
    ClientId: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Url: ['', [Validators.required]],
      Password: ['', [Validators.required]],
  });
  //console.log(this.formGroup)
}
  ngOnInit(): void {
    this.rs.get('setting/mqtt', {}).subscribe(res => {
      this.data = res.data
      this.buildFromGroup()
    });
  }
  submit(){

    if (this.formGroup.valid) {
      this.rs.post('setting/mqtt', this.formGroup.value).subscribe(
        (res) => {
          // this.projects = res.data;
          // this.total = res.total;
        },
        (err) => {
          console.log('err:', err);
        }
      );

      return;
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }




  }
}
