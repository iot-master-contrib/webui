import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {NzUploadChangeParam, NzUploadComponent, NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgIf} from "@angular/common";

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
  styleUrl: './setting-web.component.scss'
})
export class SettingWebComponent {
  formGroup!: FormGroup;

  data: any = {}

  constructor(private fb: FormBuilder) {
    this.buildFromGroup()
  }

  buildFromGroup(){
    this.formGroup = this.fb.group({
      port: [this.data.port || 8080, []],
      https: [this.data.https || '', []],
      cert: [this.data.cert || '', []],
      key: [this.data.key || '', []],
      email: [this.data.email || '', []],
    })
    //console.log(this.formGroup)
  }
  onSubmit(){

  }

  onCertChange($event: NzUploadChangeParam) {

  }

  onKeyChange($event: NzUploadChangeParam) {

  }
}
