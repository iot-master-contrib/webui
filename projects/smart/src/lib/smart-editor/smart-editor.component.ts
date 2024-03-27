import {Component, Input, ViewContainerRef} from '@angular/core';
import {NzSelectOptionInterface} from "ng-zorro-antd/select/select.types";
import {NzTreeNodeOptions} from "ng-zorro-antd/tree";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {NzTbodyComponent, NzTrDirective} from "ng-zorro-antd/table";
import {CdkDrag} from "@angular/cdk/drag-drop";

export class SmartItem {
    key!: string
    type!: string
    label!: string
    default?: any
    placeholder?: string
    tips?: string

    disabled?: boolean
    hidden?: boolean //隐藏

    array?: boolean //数组
    children?: SmartItem[]

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


    public getDefault(): any {
        if (this.array)
            return []
        switch (this.type) {
            case 'text':
                return ''
            case 'password':
                return ''
            case 'number':
                return 0
            case 'slider':
                return 0
            case 'select':
                return this.options?.[0]?.value
            case 'tags':
                return []
            case 'color':
                return ''
            case 'switch':
                return false
            case 'textarea':
                return ''
            case 'date':
                return new Date()
            case 'time':
                return ''
            case 'file':
                return ''
            case 'image':
                return ''
            case 'images':
                return []
            case 'choose':
                return ''
            case 'choose-number':
                return 0
            case 'object':
                return {}
            case 'table':
                return []
        }
        return ''
    }
}

@Component({
    selector: 'im-smart-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzTbodyComponent,
        CdkDrag,
        NzTrDirective,


    ],
    templateUrl: './smart-editor.component.html',
    styleUrl: './smart-editor.component.scss'
})
export class SmartEditorComponent {
    group!: FormGroup

    _fields: SmartItem[] = []
    _value: any = {}

    empty: any = []


    @Input() set fields(fs: SmartItem[]) {
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
            let validators: any = [];

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

            //默认值
            let value = f.default
            if (this._value.hasOwnProperty(f.key))
                value = this._value[value]
            else
                value = f.getDefault()

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
