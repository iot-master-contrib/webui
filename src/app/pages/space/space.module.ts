import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpaceRoutingModule,
    NzModalModule,
  ]
})
export class SpaceModule { }
