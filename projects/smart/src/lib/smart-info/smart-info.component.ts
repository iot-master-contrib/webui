import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {RouterLink} from "@angular/router";
import {NzTagComponent} from "ng-zorro-antd/tag";


export interface SmartInfoItem {
    key: string
    type?: string
    label: string
    span?: number
    options?: { [p: string | number]: any }
    link?: () => string
}

@Component({
    selector: 'im-smart-info',
    standalone: true,
    imports: [
        CommonModule,
        NzDescriptionsModule,
        NzProgressComponent,
        RouterLink,
        NzTagComponent,
    ],
    templateUrl: './smart-info.component.html',
    styleUrl: './smart-info.component.scss'
})
export class SmartInfoComponent {
    @Input() title: string = '';
    @Input() fields: SmartInfoItem[] = []
    @Input() value: any = {}
}
