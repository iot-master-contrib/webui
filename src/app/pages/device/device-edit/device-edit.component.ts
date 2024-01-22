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
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GatewayComponent } from '../../gateway/gateway.component';
import { ProductComponent } from '../../product/product.component';
import { ProjectComponent } from '../../project/project.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [
    NzSelectModule,
    NzAutocompleteModule,
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

  projectOption: any = [];
  productOption: any = [];
  id!: any;
  formGroup!: FormGroup;
  product: any = [];
  gateway: any = [];
  filteredOptions: string[] = [
    'Burns Bay Road',
    'Downing Street',
    'Wall Street',
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute,
    private ms: NzModalService
  ) {}
  onInputChange() {
    console.log(this.formGroup.value.gateway_id);
  }
  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [data.id || '', []],
      name: [data.name || '', []],
      description: [data.description || '', []],
      gateway_id: [data.gateway_id || null, []],
      product_id: [data.product_id || null, []],
      project_id: [data.project_id || null, []],
      keywords: [data.keywords || [], []],
    });
  }
  onChoose(e: Number) {
    switch (e) {
      case 0:
        this.ms
          .create({
            nzTitle: '网关选择',
            nzCentered: true,
            nzMaskClosable: false,
            nzContent: GatewayComponent,
            nzFooter: null,
          })
          .afterClose.subscribe((res) => {
            if (res) {
              this.formGroup.patchValue({ gateway_id: res });
              // this.group.patchValue({ gateway_id: res });
            }
          });
        break;

      case 1:
        this.ms
          .create({
            nzTitle: '产品选择',
            nzCentered: true,
            nzMaskClosable: false,
            nzContent: ProductComponent,
            nzFooter: null,
          })
          .afterClose.subscribe((res) => {
            if (res) {
              console.log(res);

              this.productOption = [
                {
                  label:
                    (res.name || '名称为空') +
                    ' (' +
                    (res.version || '版本号为空') +
                    ')',
                  value: res.id,
                },
              ];
              this.formGroup.patchValue({ product_id: res.id });
            }
          });
        break;

      case 2:
        this.ms
          .create({
            nzTitle: '项目选择',
            nzCentered: true,
            nzMaskClosable: false,
            nzContent: ProjectComponent,
            nzFooter: null,
          })
          .afterClose.subscribe((res) => {
            console.log(res);
            if (res) {
              this.projectOption = [
                { label: res.name || '名称为空', value: res.id },
              ];
              this.formGroup.patchValue({ project_id: res.id });
            }
          });
        break;

      default:
        break;
    }
  }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
    }
    this.loadSelect();
    this.buildFromGroup();
  }
  load() {
    this.rs.get(`device/${this.id}`, {}).subscribe(
      async (res) => {
        if (res.data?.product_id) {
          this.rs
            .get(`product/${res.data.product_id}`)
            .subscribe((mes) => {
              if (mes.data) {
                let data = mes.data;
                this.productOption = [
                  {
                    label:
                      (data.name || '名称为空') +
                      ' (' +
                      (data.version || '版本号为空') +
                      ')',
                    value: data.id,
                  },
                ];
              }
            });
        }
        if (res.data?.project_id) {
          this.rs
            .get(`project/${res.data.project_id}`)
            .subscribe((mes) => {
              if (mes.data) {
                let data = mes.data;
                this.projectOption = [
                  { label: data.name || '名称为空', value: data.id },
                ];
              }
            });
        }
        console.log(3);
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
