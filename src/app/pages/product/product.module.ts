import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NzModalModule,
  ]
})
export class ProductModule { }
