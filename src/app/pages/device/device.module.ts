import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    NzModalModule,
  ]
})
export class DeviceModule { }
