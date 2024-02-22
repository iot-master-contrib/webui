import {Component, Input} from '@angular/core';
import {NzFormModule} from "ng-zorro-antd/form";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {NzColorPickerModule} from "ng-zorro-antd/color-picker";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzTimePickerComponent} from "ng-zorro-antd/time-picker";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzSelectOptionInterface} from "ng-zorro-antd/select/select.types";

export interface FromItem {

}

export interface FromItem {
  key: string
  label: string
  default: any
  type: string
  placeholder?: string
  disabled?: boolean
  max?: number
  min?: number
  step?: number
  time?: boolean
  action?: string
  options?: NzSelectOptionInterface
}

function getValue(val: any, def: any): any {
  if (val === undefined)
    if (def === undefined)
      return ''
    else
      return def
  return val
}

@Component({
  selector: 'app-normal-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberComponent,
    NzSelectComponent,
    NzSwitchComponent,
    NzColorPickerModule,
    NzSliderComponent,
    NzDatePickerComponent,
    NzTimePickerComponent,
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective,
  ],
  templateUrl: './normal-form.component.html',
  styleUrl: './normal-form.component.scss'
})
export class NormalFormComponent {
  group!: FormGroup

  _fields: FromItem[] = []
  _values: any = {}

  empty: any = []

  @Input() set fields(fs: FromItem[]) {
    this._fields = fs
    this.buildForm()
  }

  @Input() set values(vs: any) {
    this._values = vs
    //this.buildForm()
    this.group.patchValue(vs)
  }

  buildForm() {
    let fs: any = {}
    this._fields.forEach(f => {
      fs[f.key] = [getValue(this._values[f.key], f.default), []]
    })
    this.group = this.fb.group(fs)
  }

  patchValues() {

  }

  constructor(private fb: FormBuilder) {
  }


  handleUpload($event: NzUploadChangeParam) {

  }


}
