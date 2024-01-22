import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { UserRoutingModule } from './user-routing.module';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
@NgModule({
  declarations: [
    // UserComponent   SearchFormComponent

  ],
  imports: [

    SearchFormComponent,
    UserRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTagModule,
    NzPopconfirmModule,
    NzSwitchModule ,
    NzButtonModule,
    NzCardModule,
    NzModalModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSpaceModule,
    NzTableModule,
    NzDividerModule
  ]
})
export class UserModule { }
