import {Component, signal, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective, NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {NzMessageService} from 'ng-zorro-antd/message';
import {RequestService} from '../../../../../projects/smart/src/request.service';

@Component({
  selector: 'app-plugin-edit',
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
  templateUrl: './plugin-edit.component.html',
  styleUrl: './plugin-edit.component.scss'
})
export class PluginEditComponent implements OnInit {

  formGroup!: FormGroup;
  id!: any

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
    console.log(this.formGroup.value)
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
      return
    }
    this.buildFromGroup();

  }

  load() {
    this.rs.get(`plugin/${this.id}`, {}).subscribe(
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
      let url = this.id ? `plugin/${this.id}` : `plugin/create`;
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('admin/plugin');
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
