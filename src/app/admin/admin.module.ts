import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NzModalModule,
    ]
})
export class AdminModule {
}
