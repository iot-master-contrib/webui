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
import {ActivatedRoute, RouterLink} from '@angular/router';
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
  Validators,
} from '@angular/forms';
import {
  NzInputDirective,
  NzTextareaCountComponent,
} from 'ng-zorro-antd/input';
import {NzUploadChangeParam, NzUploadComponent} from 'ng-zorro-antd/upload';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent implements OnInit {
  data: any = {
    name: '新项目',
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
    this.buildFromGroup()
  }

  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [this.id || '', []],
      name: [data.name || '', []],
      description: [data.description || '', []],
      icon: [data.icon || '', []],
      version: [data.version || '', []],
      url: [data.url || '', []],
      keywords: [data.keywords || [], []],
    });
    console.log(this.formGroup.value)
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      //this.buildFromGroup();
      this.load()
    }
  }

  load() {
    this.rs.get(`project/` + this.id).subscribe(
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
      let url = `project/${this.id || 'create'}`
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('admin');
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
