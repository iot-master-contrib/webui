import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from '@angular/cdk/drag-drop'

import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzDividerModule} from "ng-zorro-antd/divider";

import {NzUploadModule} from 'ng-zorro-antd/upload';

import {NzTabsModule} from 'ng-zorro-antd/tabs';

import {NzTagModule} from 'ng-zorro-antd/tag';

import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {SearchFormComponent} from '../components/search-form/search-form.component';
import {BatchBtnComponent} from './batch-btn/batch-btn.component';

@NgModule({
  declarations: [],
  exports: [
    SearchFormComponent,
    BatchBtnComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzModalModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzTabsModule,
    NzPaginationModule,
    NzTagModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    DragDropModule,
    NzSelectModule,
    NzTableModule,
    NzIconModule,
    NzSpaceModule,
    NzInputNumberModule,
    NzUploadModule,
    NzDividerModule,
    NzSwitchModule,
    SearchFormComponent,
    BatchBtnComponent
  ],
  providers: []
})
export class BaseModule {
}
