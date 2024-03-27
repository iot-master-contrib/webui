import {Component, forwardRef, Input, OnInit, ViewContainerRef} from '@angular/core';
import {NzSelectOptionInterface} from "ng-zorro-antd/select/select.types";
import {NzTreeNodeOptions} from "ng-zorro-antd/tree";
import {CommonModule} from "@angular/common";
import {
    ControlValueAccessor, FormArray,
    FormBuilder, FormControl,
    FormGroup,
    FormsModule,
    NG_VALUE_ACCESSOR,
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

export interface SmartItem {
    key: string
    type: string
    label: string
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


}

function getDefault(si: SmartItem): any {
    if (si.array)
        return []
    switch (si.type) {
        case 'text':
            return ''
        case 'password':
            return ''
        case 'number':
            return 0
        case 'slider':
            return 0
        case 'select':
            return si.options?.[0]?.value
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
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SmartEditorComponent),
            multi: true
        }
    ]
})
export class SmartEditorComponent implements OnInit, ControlValueAccessor {
    group!: FormGroup

    _fields: SmartItem[] = []
    //_values: any = {}

    empty: any = []


    @Input() set fields(fs: SmartItem[]) {
        this._fields = fs
        //this.group = this.buildGroup(this._fields, this._values)
        console.log("set fields", fs)
    }

    get fields() {
        return this._fields
    }

    buildGroup(fields: SmartItem[], values: any): FormGroup {
        values = values || {}

        let fs: any = {}
        fields.forEach(f => {
            if (f.type == 'object' && f.children) {
                fs[f.key] = this.buildGroup(f.children, values[f.key])
                return
            }
            if (f.type == 'table' && f.children) {
                fs[f.key] = this.fb.array(values[f.key]?.map((v: any) => {
                    return this.buildGroup(f.children || [], v)
                }) || [])
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

            fs[f.key] = [{value, disabled: !!f.disabled}, validators]
        })
        return this.fb.group(fs)
    }


    PatchValue(value: any) {
        setTimeout(() => this.group.patchValue(value))
    }

    constructor(private fb: FormBuilder) {
    }

    writeValue(obj: any): void {
        //console.log("write", this._fields, obj)
        if (obj) {
            this.group = this.buildGroup(this._fields, obj)
            this.group.valueChanges.subscribe(res=>{
                this.onChanged(this.group.value)
            })
        }
    }

    onChanged: any = () => {
    }
    onTouched: any = () => {
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        //throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        //throw new Error('Method not implemented.');
        this.group = this.buildGroup(this._fields, {})
        this.group.valueChanges.subscribe(res => {
            this.onChanged(this.group.value)
        })
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


    change() {
        this.onChanged(this.group.value);
    }


    onSubmit() {

    }

    drop(control: FormArray, event: CdkDragDrop<any, any>) {
        moveItemInArray(control.controls, event.previousIndex, event.currentIndex);
        this.change();
    }

    copy(control: FormArray, i: number) {
        let group = control.at(i)
        let values = group.value
        control.insert(i, this.fb.group(values))
        this.change()
    }

    remove(control: FormArray, i: number) {
        control.removeAt(i);
        this.change();
    }

    add(control: FormArray, fields: SmartItem[]) {
        control.push(this.buildGroup(fields, {}))
    }
}
