import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective} from "ng-zorro-antd/input";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {RequestService} from "iot-master-smart";
import {TunnelsComponent} from "../../pages/tunnel/tunnels/tunnels.component";

@Component({
    selector: 'app-input-tunnel',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzInputDirective
    ],
    templateUrl: './input-tunnel.component.html',
    styleUrl: './input-tunnel.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputTunnelComponent),
            multi: true
        }
    ]
})
export class InputTunnelComponent implements OnInit, ControlValueAccessor {
    id = ""
    tunnel: any = {}

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
        }
    }

    select() {
        this.ms.create({
            nzTitle: "选择", nzContent: TunnelsComponent, nzData: this.data
        }).afterClose.subscribe(res => {
            console.log(res)
            if (res) {
                this.tunnel = res
                this.id = res.id
                this.onChange(this.id)
            }
        })
    }

    change(value: string) {
        this.id = value
        this.onChange(value)
    }
}
