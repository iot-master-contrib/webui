import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
} from 'ng-zorro-antd/descriptions';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective,
} from 'ng-zorro-antd/page-header';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  NzFormDirective,
  NzFormItemComponent,
  NzFormModule,
} from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NzInputDirective,
  NzTextareaCountComponent,
} from 'ng-zorro-antd/input';
import { NzUploadChangeParam, NzUploadComponent } from 'ng-zorro-antd/upload';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequestService } from '../../../request.service';

@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.scss',
})
export class DeviceEditComponent {
  data: any = {
    name: '测试设备',
  };
  id!: any;
  formGroup!: FormGroup;
  product: any = [];
  gateway: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
    this.buildFromGroup();
  }

  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [data.id || '', []],
      name: [data.name || '', []],
      description: [data.description || '', []],
      gateway_id: [data.gateway_id || null, []],
      product_id: [data.product_id || null, []],
      keywords: [data.keywords || [], []],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
    }
this.loadSelect()
    this.buildFromGroup();
  }
  load() {
    this.rs.get(`device/${this.id}`, {}).subscribe(
      (res) => {
        this.buildFromGroup(res.data);
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
  loadSelect() {
    //gateway
    this.rs.post(`gateway/search`, { limit: 9999 }).subscribe(
      (res) => {
        let gateway: any = [];
        if (res.data)
          res.data.filter((item: any) => {
            gateway.push({ label: item.name, value: item.id });
          });
        this.gateway = gateway;
        console.log(this.gateway);
      },
      (err) => {
        console.log('err:', err);
      }
    );
    //product
    this.rs.post(`product/search`, { limit: 9999 }).subscribe(
      (res) => {
        let product: any = [];
        if (res.data)
          res.data.filter((item: any) => {
            product.push({ label: item.id, value: item.id });
          });
        this.product = product;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
  onSubmit() {
    if (this.formGroup.valid) {
      let url = this.id ? `device/${this.id}` : `device/create`;
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('admin/device');
        this.msg.success('保存成功');
      });

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

  onIconChange($event: NzUploadChangeParam) {}
}
