import {Component, Input, ViewContainerRef} from '@angular/core';
import {NzFormModule} from "ng-zorro-antd/form";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {NzTreeNodeOptions} from "ng-zorro-antd/tree";
import {NzTreeSelectComponent} from "ng-zorro-antd/tree-select";


export interface SmartFormItem {
    key: string
    type: string
    label: string
    default?: any
    placeholder?: string
    tips?: string

    disabled?: boolean
    hidden?: boolean //隐藏

    required?: boolean
    max?: number
    min?: number
    step?: number

    options?: NzSelectOptionInterface[]

    tree?: NzTreeNodeOptions[]

    change?: (value: any) => void //监测变化

    time?: boolean //日期控件 显示时间

    upload?: string //文件上传

    choose?: () => void //选择操作
    //data?: any; //控件参数

    pattern?: string | RegExp
    validators?: any[];
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
    selector: 'im-smart-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzInputNumberComponent,
        NzSelectComponent,
        NzSwitchComponent,
        NzSliderComponent,
        NzDatePickerComponent,
        NzTimePickerComponent,
        NzUploadComponent,
        NzButtonComponent,
        NzIconDirective,
        NzColorPickerModule,
        NzTreeSelectComponent,
    ],
    templateUrl: './smart-form.component.html',
    styleUrl: './smart-form.component.scss'
})
export class SmartFormComponent {
    group!: FormGroup

    _fields: SmartFormItem[] = []
    _value: any = {}

    empty: any = []


    @Input() set fields(fs: SmartFormItem[]) {
        this._fields = fs
        this.buildForm()
    }

    get fields() {
        return this._fields
    }

    @Input() set value(v: any) {
        this._value = v
        //this.buildForm()
        this.group.patchValue(v)
    }

    get value() {
        return this._value
    }

    buildForm() {
        let fs: any = {}
        this._fields.forEach(f => {
            let validators = [];

            if (f.required)
                validators.push(Validators.required)

            if (f.min !== undefined) {
                if (f.type === "number")
                    validators.push(Validators.min(f.min))
                else if (f.type === "text" || f.type === "password")
                    validators.push(Validators.minLength(f.min))
            }

            if (f.max !== undefined) {
                if (f.type === "number")
                    validators.push(Validators.max(f.max))
                else if (f.type === "text" || f.type === "password")
                    validators.push(Validators.maxLength(f.max))
            }

            if (f.pattern && f.type === "text")
                validators.push(Validators.pattern(f.pattern))

            //拼接默认校验器
            if (f.validators)
                validators = validators.concat(f.validators)

            let value = getValue(this._value[f.key], f.default)

            fs[f.key] = [{value, disabled: !!f.disabled}, validators]
        })
        this.group = this.fb.group(fs)
    }

    patchValues(value: any) {
        setTimeout(() => {
            this.group.patchValue(value)
        })

    }

    public Validate(): boolean {
        //检查
        for (const i in this.group.controls) {
            this.group.controls[i].markAsDirty();
            this.group.controls[i].updateValueAndValidity();
        }
        return this.group.valid
    }

    public Value(): any {
        // if (!this.Validate()) {
        //   return undefined;
        // }
        return this.group.getRawValue()
        //return this.group.value
    }

    constructor(private fb: FormBuilder, private viewContainerRef: ViewContainerRef) {
    }


    handleUpload(key: string, $event: NzUploadChangeParam) {
        if ($event.type == 'success') {
            this.group.patchValue({[key]: $event.file.response.data[0]})
        }
    }

    handleUploadImages(key: string, $event: NzUploadChangeParam) {
        let paths: any = []
        $event.fileList.forEach(file => {
            if (file.response?.data?.[0])
                paths.push(file.response.data[0])
        })
        this.group.patchValue({[key]: paths})
    }

    onSubmit() {

    }

}
