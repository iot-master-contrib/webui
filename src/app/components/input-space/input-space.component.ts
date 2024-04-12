import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalService} from "ng-zorro-antd/modal";
import {RequestService} from "iot-master-smart";
import {SpacesComponent} from "../../pages/space/spaces/spaces.component";

@Component({
    selector: 'app-input-space',
    standalone: true,
    imports: [
        NzInputDirective,
        NzButtonComponent
    ],
    templateUrl: './input-space.component.html',
    styleUrl: './input-space.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSpaceComponent),
            multi: true
        }
    ]
})
export class InputSpaceComponent implements OnInit, ControlValueAccessor {
    id = ""
    space: any = {}

    private onChange!: any;

    @Input() data: any
    @Input() placeholder = ''

    constructor(private ms: NzModalService, private rs: RequestService) {
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
            if (this.id)
                this.load()
        }
    }

    load() {
        console.log('load space', this.id)
        this.rs.get('space/' + this.id).subscribe(res => {
            if (res.data) {
                this.space = res.data;
            }
        })
    }

    select() {
        this.ms.create({
            nzTitle: "选择",
            nzContent: SpacesComponent,
            nzData: this.data
        }).afterClose.subscribe(res => {
            console.log(res)
            if (res) {
                this.space = res
                this.id = res.id
                this.onChange(this.id)
            }
        })
    }

    change(value: string) {
        console.log('on change', value)
        this.id = value
        this.onChange(value)
        this.load()
    }
}
