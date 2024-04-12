import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalService} from "ng-zorro-antd/modal";
import {GatewaysComponent} from "../../pages/gateway/gateways/gateways.component";
import {RequestService} from "iot-master-smart";

@Component({
    selector: 'app-input-gateway',
    standalone: true,
    imports: [
        NzInputDirective,
        NzButtonComponent
    ],
    templateUrl: './input-gateway.component.html',
    styleUrl: './input-gateway.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGatewayComponent),
            multi: true
        }
    ]
})
export class InputGatewayComponent implements OnInit, ControlValueAccessor {
    id = ""
    gateway: any = {}

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
        console.log('load gateway', this.id)
        this.rs.get('gateway/' + this.id).subscribe(res => {
            if (res.data) {
                this.gateway = res.data;
            }
        })
    }

    select() {
        this.ms.create({
            nzTitle: "选择",
            nzContent: GatewaysComponent,
            nzData: this.data,
        }).afterClose.subscribe(res => {
            console.log(res)
            if (res) {
                this.gateway = res
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
