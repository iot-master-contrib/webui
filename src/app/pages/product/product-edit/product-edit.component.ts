import { filter } from 'rxjs/operators';
import { Component, signal, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
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
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-product-edit',
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
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  data: any = {
    name: '测试产品',
  };
  formGroup!: FormGroup;
  id: any = 0;
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
      id: [this.id, []],
      name: [data.name || '', []],
      description: [data.description || '', []],
      icon: [data.icon || '', []],
      version: [data.version || '', []],
      url: [data.url || '', []],
      keywords: [data.keywords || [], []],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.buildFromGroup();
      this.load();
    }
  }
  load() {
    this.rs.post(`product/search`, { filter:{id:this.id}}).subscribe(
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
      let url =  `product/${this.id}`  ;
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('admin/product');
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
