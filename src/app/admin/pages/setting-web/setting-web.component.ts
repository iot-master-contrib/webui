import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-setting-web',
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
  templateUrl: './setting-web.component.html',
  styleUrl: './setting-web.component.scss',
})
export class SettingWebComponent implements OnInit {
  formGroup!: FormGroup;

  data: any = {};

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {
    this.buildFromGroup();
  }
  ngOnInit(): void {
    this.rs.get('setting/web', {}).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  buildFromGroup() {
    this.formGroup = this.fb.group({
      port: [this.data.port || 8080, []],
      https: [this.data.https || '', []],
      cert: [this.data.cert || '', []],
      key: [this.data.key || '', []],
      email: [this.data.email || '', []],
    });
    //console.log(this.formGroup)
  }
  onSubmit() {
    this.rs.post('setting/web',  this.formGroup.value).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  onCertChange($event: NzUploadChangeParam) {}

  onKeyChange($event: NzUploadChangeParam) {}
}
