import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {
    FormBuilder,
    FormArray,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormGroup,
    FormsModule,
    ReactiveFormsModule
} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NzSelectComponent, NzSelectOptionInterface} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzColorPickerModule} from "ng-zorro-antd/color-picker";
import {NzCardComponent} from "ng-zorro-antd/card";


export interface SmartTableEditItem {
    key: string
    type?: string
    label: string
    placeholder?: string
    default?: any
    options?: NzSelectOptionInterface[]
}


@Component({
    selector: 'im-smart-table-edit',
    templateUrl: './smart-table-edit.component.html',
    styleUrls: ['./smart-table-edit.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        NzIconDirective,
        NzTableModule,
        CdkDropList,
        FormsModule,
        ReactiveFormsModule,
        NzSelectComponent,
        NzInputNumberComponent,
        NzSpaceComponent,
        NzSpaceItemDirective,
        CdkDragHandle,
        CdkDrag,
        NzSwitchComponent,
        NzInputDirective,
        NzColorPickerModule,
        NzCardComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SmartTableEditComponent),
            multi: true
        }
    ]
})
export class SmartTableEditComponent implements OnInit, ControlValueAccessor {
    group!: FormGroup
    formArray!: FormArray;

    row: any = {};
    _columns: any = [];

    @Input() title = ""
    @Input() showAdd = true

    onChanged: any = () => {
    }
    onTouched: any = () => {
    }

    @Input()
    set columns(data: SmartTableEditItem[]) {
        //TODO 创建默认group
        const row: any = {};
        data.forEach(item => {
            //if (item.hasOwnProperty("default"))
            row[item.key] = item.default
            //TODO 需要补充缺失的控件

        })
        this.row = row;
        this._columns = data;
    };

    constructor(
        private msg: NzMessageService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.formArray = this.fb.array([]);
        //this.formArray.value
        this.group = this.fb.group({
            array: this.formArray
        })
    }

    writeValue(data: any): void {
        const itemObj = JSON.parse(JSON.stringify(this.row));
        if (data && data.length) {
            data.forEach((item: any) => {
                const newGroup = this.fb.group(Object.assign(itemObj, item));
                this.formArray.push(newGroup);
            });
        }
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    change() {
        const data = this.formArray.controls.map((item) => item.value);
        this.onChanged(data);
    }

    copy(index: number) {
        const old = this.formArray.controls[index].value;
        this.formArray.insert(index, this.fb.group(old));
        this.msg.success("复制成功");
        this.change();
    }

    del(index: number) {
        this.formArray.removeAt(index);
        this.change();
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.formArray.controls, event.previousIndex, event.currentIndex);
        this.change();
    }

    public Add() {
        //this.formArray.insert(0, this.fb.group(this.row));
        this.formArray.push(this.fb.group(this.row))
    }
}
