import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PluginRoutingModule} from './plugin-routing.module';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PluginRoutingModule,
    NzModalModule,
  ]
})
export class PluginModule {
}
