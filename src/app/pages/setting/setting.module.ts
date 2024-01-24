import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingRoutingModule} from "./setting-routing.module";
import {NzModalModule} from "ng-zorro-antd/modal";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NzModalModule
  ]
})
export class SettingModule { }
