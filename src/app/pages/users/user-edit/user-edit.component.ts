import {CommonModule, DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective, NzTextareaCountComponent} from 'ng-zorro-antd/input';
import {NzMessageService} from 'ng-zorro-antd/message';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective
} from 'ng-zorro-antd/page-header';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzUploadChangeParam, NzUploadComponent} from 'ng-zorro-antd/upload';
import {RequestService} from '../../../request.service';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    NzSwitchModule,
    CommonModule,
    DatePipe,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzPageHeaderComponent,
    NzPageHeaderContentDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzPopconfirmDirective,
    NzSpaceComponent,
    RouterLink,
    NzSpaceItemDirective,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputDirective,
    NzTextareaCountComponent,
    NzUploadComponent,
    NzIconDirective,
    NzSelectComponent,
    NzCardComponent,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  data: any = {
    name: '新用户',
  };
  formGroup!: FormGroup;
  id: any = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
  }

  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [this.id || '', []],
      name: [data.name || '', []],
      email: [data.email || '', []],
      disabled: [data.disabled || false, []],
      admin: [data.admin || false, []],
      cellphone: [data.cellphone || '', []],
    });
    console.log(this.formGroup.value)
  }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.buildFromGroup();
      this.load()
    } else
      this.buildFromGroup();
  }

  load() {
    this.rs.get(`user/${this.id}`).subscribe(
      (res) => {

        this.buildFromGroup(res.data);
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      let url = this.id ? `user/${this.id}` : `user/create`;
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/user/' + res.data.id);
        this.msg.success('保存成功');
      });

      return;
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
