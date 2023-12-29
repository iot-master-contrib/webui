import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-setting-broker',
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
    NzOptionComponent,
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzRowDirective,
    NzSelectComponent,
    NzSpaceComponent,
    ReactiveFormsModule,
    NzSpaceItemDirective,
    NgIf
  ],
  templateUrl: './setting-broker.component.html',
  styleUrl: './setting-broker.component.scss'
})
export class SettingBrokerComponent {
  formGroup!: FormGroup;

  data: any = {}

  constructor(private fb: FormBuilder) {
    this.buildFromGroup()
  }

  buildFromGroup() {
    this.formGroup = this.fb.group({
      type: [this.data.type || 'internal', []],
      address: [this.data.address || 'localhost', []],
      port: [this.data.port || 1883, []],
      username: [this.data.username || '', []],
      password: [this.data.password || '', []],
      client_id: [this.data.client_id || 'master', []],
    })
    //console.log(this.formGroup)
  }

  onSubmit() {

  }

}
