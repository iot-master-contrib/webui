import {Component, signal} from '@angular/core';
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
import {RouterLink} from "@angular/router";
import {NzFormDirective, NzFormItemComponent, NzFormModule} from "ng-zorro-antd/form";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzSelectComponent} from "ng-zorro-antd/select";

@Component({
  selector: 'app-project-edit',
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
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  data: any = {
    name: "测试项目",
  }
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildFromGroup()
  }

  buildFromGroup(){
    this.formGroup = this.fb.group({
      name: [this.data.name || '', []],
      description: [this.data.description || '', []],
      icon: [this.data.icon || '', []],
      version: [this.data.version || '', []],
      url: [this.data.url || '', []],
      keywords: [this.data.keywords || [], []],
    })
  }

  onSubmit() {

  }


  onIconChange($event: NzUploadChangeParam) {

  }


}
