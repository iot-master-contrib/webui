import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProductVersionComponent} from "../../pages/product/product-version/product-version.component";

@Component({
  selector: 'app-input-version',
  standalone: true,
  imports: [
        NzInputDirective,
        NzButtonComponent,
    ],
  templateUrl: './input-version.component.html',
  styleUrl: './input-version.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputVersionComponent),
            multi: true
        }
    ]
})
export class InputVersionComponent implements OnInit, ControlValueAccessor {
    id = ""
    version: any = {}

    private onChange!: any;

    @Input() product_id = ''
    @Input() placeholder = ''

    protected disabled = false;

    constructor(private ms: NzModalService) {
    }

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        if (this.id !== obj) {
            this.id = obj
            //TODO 检查是否合法
        }
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled
    }

    select() {
        this.ms.create({
            nzTitle: "选择",
            nzContent: ProductVersionComponent,
            nzData: {
                product_id: this.product_id
            }
        }).afterClose.subscribe(res => {
            console.log(res)
            if (res) {
                this.id = res.name
                this.onChange(this.id)
            }
        })
    }

    change(value: string) {
        console.log('on change', value)
        this.id = value
        this.onChange(value)
    }
}
