import {Component, OnInit, signal} from '@angular/core';
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
import {DevicesComponent} from '../../device/devices/devices.component';
import {NzSelectModule} from 'ng-zorro-antd/select';

@Component({
  selector: 'app-space-edit',
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
  templateUrl: './space-edit.component.html',
  styleUrl: './space-edit.component.scss',
})
export class SpaceEditComponent implements OnInit {
  data: any = {
    name: '新设备',
  };

  deviceOption: any = [];

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
  ) {
  }

  onInputChange() {
    console.log(this.formGroup.value.gateway_id);
  }

  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [data.id || null, []],
      project_id: [data.project_id || '', []],
      name: [data.name || '', []],
      description: [data.description || '', []],
    });
  }

  onChoose() {
    this.ms
      .create({
        nzTitle: '设备绑定',
        nzCentered: true,
        nzMaskClosable: false,
        nzContent: DevicesComponent,
        nzFooter: null,
      })
      .afterClose.subscribe((res) => {
      console.log(res);
      let value = this.formGroup.value
      if (res) {
        if (res.status) {
          this.deviceOption = [{label: res.id, value: res.id}]
          this.formGroup.patchValue({devices: res.id});
        } else {
          if (value.devices && value.devices === res.id)
            this.formGroup.patchValue({devices: null})
        }


        // this.group.patchValue({ gateway_id: res });
      }
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
    }


    this.buildFromGroup();

    if (this.route.snapshot.queryParamMap.has('project')) {
      let project = this.route.snapshot.queryParamMap.get('project');
      this.formGroup.patchValue({project_id: project})
    }

  }

  load() {
    this.rs.get(`space/${this.id}`, {}).subscribe(
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
      let url = this.id ? `space/${this.id}` : `space/create`;
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/space/' + res.data.id);
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

  onIconChange($event: NzUploadChangeParam) {
  }
}
