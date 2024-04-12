import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalService} from "ng-zorro-antd/modal";
import {RequestService} from "iot-master-smart";
import {ProjectsComponent} from "../../pages/project/projects/projects.component";

@Component({
    selector: 'app-input-project',
    standalone: true,
    imports: [
        NzInputDirective,
        NzButtonComponent,
    ],
    templateUrl: './input-project.component.html',
    styleUrl: './input-project.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputProjectComponent),
            multi: true
        }
    ]
})
export class InputProjectComponent implements OnInit, ControlValueAccessor {
    id = ""
    project: any = {}

    private onChange!: any;

    @Input() placeholder = ''

    protected disabled = false;

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

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled
    }

    load() {
        console.log('load project', this.id)
        this.rs.get('project/' + this.id).subscribe(res => {
            if (res.data) {
                this.project = res.data;
            }
        })
    }

    select() {
        this.ms.create({
            nzTitle: "选择",
            nzContent: ProjectsComponent
        }).afterClose.subscribe(res => {
            console.log(res)
            if (res) {
                this.project = res
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
