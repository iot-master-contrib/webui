import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzTableModule} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {NzInputDirective, NzInputGroupComponent, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColorPickerModule} from "ng-zorro-antd/color-picker";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {NzTimePickerComponent} from "ng-zorro-antd/time-picker";
import {NzTreeSelectComponent} from "ng-zorro-antd/tree-select";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzSpaceModule} from "ng-zorro-antd/space";


export interface SmartSelectOption {
    label: string
    value: any
    title?: string
    disabled?: boolean
    hide?: boolean
    key?: string | number
}

export interface SmartTreeOption {
    title: string;
    key: string;
    isLeaf?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    expanded?: boolean;
    children?: SmartTreeOption[];

    [key: string]: any;
}

export interface SmartField {
    key: string
    type: string
    label: string
    default?: any
    placeholder?: string
    tips?: string

    disabled?: boolean
    hidden?: boolean //隐藏？？？

    array?: boolean //数组
    children?: SmartField[]

    required?: boolean //必须
    max?: number
    min?: number
    step?: number

    multiple?: boolean //多选

    options?: SmartSelectOption[] //select参数
    tree?: SmartTreeOption[] //树形选择

    change?: (value: any) => void //监测变化

    time?: boolean //日期控件 显示时间

    upload?: string //文件上传

    pattern?: string | RegExp
    validators?: any[];

    template?: TemplateRef<any>
}

function getDefault(field: SmartField): any {
    if (field.array)
        return []
    switch (field.type) {
        case 'text':
            return ''
        case 'password':
            return ''
        case 'number':
            return 0
        case 'slider':
            return 0
        case 'select':
            return field.options?.[0]?.value
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
            return new Date()
        case 'datetime':
            return new Date()
        case 'file':
            return ''
        case 'image':
            return ''
        case 'images':
            return []
        case 'object':
            return {}
        case 'list':
            return []
        case 'table':
            return []
    }
    return ''
}

@Component({
    selector: 'im-smart-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzTableModule,
        CdkDrag,
        NzInputDirective,
        NzButtonComponent,
        NzColorPickerModule,
        NzDatePickerComponent,
        NzInputGroupComponent,
        NzInputNumberComponent,
        NzSelectComponent,
        NzSliderComponent,
        NzSwitchComponent,
        NzTextareaCountComponent,
        NzTimePickerComponent,
        NzTreeSelectComponent,
        NzUploadComponent,
        CdkDragHandle,
        NzIconDirective,
        NzSpaceModule,
        CdkDropList,
    ],
    templateUrl: './smart-editor.component.html',
    styleUrl: './smart-editor.component.scss',
})
export class SmartEditorComponent implements OnInit {
    group!: FormGroup

    _fields: SmartField[] = []
    _values: any = {}

    empty: any = []


    @Input() set fields(fs: SmartField[]) {
        console.log("[SmartEditor] set fields", fs)
        if (fs && fs.length) {
            this._fields = fs
            this.group = this.build(this._fields, this._values)
        }
    }

    get fields() {
        return this._fields
    }


    @Input() set values(values: any) {
        console.log("[SmartEditor] set values", values)
        this._values = values
        if (this._fields && this._fields.length) {
            this.group = this.build(this._fields, this._values)
        }
    }

    get values() {
        return this._values
    }

    build(fields: SmartField[], values: any): FormGroup {
        console.log("[SmartEditor] build", fields, values)
        values = values || {}

        let fs: any = {}
        fields?.forEach(f => {
            if (f.type == 'object' && f.children) {
                fs[f.key] = this.build(f.children, values[f.key])
                if (f.change) fs[f.key].valueChanges.subscribe((res: any) => f.change?.(res))
                return
            }
            if (f.type == 'list' && f.children) {
                fs[f.key] = this.fb.array(values[f.key]?.map((v: any) => {
                    return this.build(f.children || [], v)
                }) || [])
                if (f.change) fs[f.key].valueChanges.subscribe((res: any) => f.change?.(res))
                return
            }
            if (f.type == 'table' && f.children) {
                fs[f.key] = this.fb.array(values[f.key]?.map((v: any) => {
                    return this.build(f.children || [], v)
                }) || [])
                if (f.change) fs[f.key].valueChanges.subscribe((res: any) => f.change?.(res))
                return
            }

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
            let value: any

            if (values.hasOwnProperty(f.key))
                value = values[f.key]
            else if (f.hasOwnProperty('default'))
                value = f.default
            else
                value = getDefault(f)

            fs[f.key] = new FormControl(value, validators)
            if (f.change) fs[f.key].valueChanges.subscribe((res: any) => f.change?.(res))
        })
        return this.fb.group(fs)
    }

    //设置数据
    setValue(value: any) {
        console.log("[SmartEditor] setValue", value)
        //this.group.setValue(value)
        this._values = value
        if (this._fields && this._fields.length)
            this.group = this.build(this._fields, value)
    }

    //补充数据
    patchValue(value: any) {
        console.log("[SmartEditor] patchValue", value)
        //setTimeout(() => this.group.patchValue(value))
        //TODO 数组类型 需要创建control
        this.group.patchValue(value)
    }

    get valid() {
        return this.group.valid
    }

    get value() {
        return this.group.value
    }

    getRawValue() {
        //this.group.updateValueAndValidity()
        return this.group.getRawValue()
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        if (this._fields && this._fields.length)
            this.group = this.build(this._fields, this._values)
    }


    handleUpload(control: FormControl, $event: NzUploadChangeParam) {
        if ($event.type == 'success') {
            //this.group.patchValue({[key]: $event.file.response.data[0]})
            control.setValue($event.file.response.data[0])
        }
    }

    handleUploadImages(control: FormControl, $event: NzUploadChangeParam) {
        let paths: any = []
        $event.fileList.forEach(file => {
            if (file.response?.data?.[0])
                paths.push(file.response.data[0])
        })
        //this.group.patchValue({[key]: paths})
        control.setValue(paths)
    }


    drop(control: FormArray, event: CdkDragDrop<any, any>) {
        moveItemInArray(control.controls, event.previousIndex, event.currentIndex);
    }

    copy(fields: SmartField[], control: FormArray, i: number) {
        let o = control.at(i)
        let n = this.build(fields, o.value)
        control.insert(i, n)
    }

    remove(control: FormArray, i: number) {
        control.removeAt(i);
    }

    add(control: FormArray, fields: SmartField[]) {
        control.push(this.build(fields, {}))
    }

    protected readonly Infinity = Infinity;
}
