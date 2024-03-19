import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        NzModalModule,
    ]
})
export class ProjectModule {
}
