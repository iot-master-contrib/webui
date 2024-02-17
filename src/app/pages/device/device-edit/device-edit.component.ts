import {Component, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
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
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
import {NzUploadChangeParam, NzUploadComponent} from 'ng-zorro-antd/upload';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzMessageService} from 'ng-zorro-antd/message';
import {RequestService} from '../../../request.service';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {GatewaysComponent} from '../../gateway/gateways/gateways.component';
import {ProductsComponent} from '../../product/products/products.component';
import {ProjectsComponent} from '../../project/projects/projects.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {InputProductComponent} from "../../../components/input-product/input-product.component";
import {InputGatewayComponent} from "../../../components/input-gateway/input-gateway.component";
import {InputProjectComponent} from "../../../components/input-project/input-project.component";
import {NzCardComponent} from "ng-zorro-antd/card";

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
    InputProductComponent,
    InputGatewayComponent,
    InputProjectComponent,
    NzCardComponent,
  ],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.scss',
})
export class DeviceEditComponent {
  data: any = {
    name: '新设备',
  };


  id!: any;
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute,
    private ms: NzModalService
  ) {
  }

  onInputChange() {
    console.log(this.formGroup.value.gateway_id);
  }

  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [data.id || '', []],
      name: [data.name || '', []],
      description: [data.description || '', []],
      gateway_id: [data.gateway_id || '', []],
      product_id: [data.product_id || '', []],
      project_id: [data.project_id || '', []],
      keywords: [data.keywords || [], []],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
    }
    this.buildFromGroup();
  }

  load() {
    this.rs.get(`device/${this.id}`).subscribe(res => {
      this.buildFromGroup(res.data);
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      let data = this.formGroup.value
      let url = `device/${this.id || 'create'}`;
      this.rs.post(url, data).subscribe((res) => {
        this.router.navigateByUrl('/admin/device/' + res.data.id);
        this.msg.success('保存成功');
      });
      return;
    }

    Object.values(this.formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
    });
  }

  onIconChange($event: NzUploadChangeParam) {
  }
}
