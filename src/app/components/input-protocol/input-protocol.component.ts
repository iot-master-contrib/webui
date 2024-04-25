import {Component, forwardRef, OnInit} from '@angular/core';
import {RequestService} from "iot-master-smart";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-input-protocol',
    standalone: true,
    imports: [
        NzSelectComponent,
        FormsModule
    ],
    templateUrl: './input-protocol.component.html',
    styleUrl: './input-protocol.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputProtocolComponent),
            multi: true
        }
    ]
})
export class InputProtocolComponent implements OnInit, ControlValueAccessor {

    options: any[] = []

    _value: string = ""
    get value() {
        return this._value
    }

    set value(v) {
        this._value = v
        this.onChange(v)
    }

    constructor(private rs: RequestService) {
        this.load()
    }

    ngOnInit(): void {
    }

    load() {
        this.rs.get(`protocol/list`).subscribe((res) => {
            this.options = res.data.map((p: any) => {
                return {value: p.name, label: p.label}
            })
        });
    }

    private onChange!: any;

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        this._value = obj
    }
}
