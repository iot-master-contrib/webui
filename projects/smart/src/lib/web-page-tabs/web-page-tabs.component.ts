import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {WebPageComponent} from "../web-page/web-page.component";

export interface WebPageItem {
    name: string
    url: string
}

@Component({
    selector: 'im-web-page-tabs',
    standalone: true,
    imports: [
        CommonModule,
        NzTabsModule,
        WebPageComponent,
    ],
    templateUrl: './web-page-tabs.component.html',
    styleUrl: './web-page-tabs.component.scss'
})
export class WebPageTabsComponent {
    @Input() plugins!: WebPageItem[]
    @Input() query = ''
}
