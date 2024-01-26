import {Component, Optional} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {Router, RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf} from "@angular/common";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormsModule} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSpaceComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    RouterLink,
    NzPaginationComponent,
    NzSpaceItemDirective,
    NzTableModule,
    NgForOf,
    DatePipe,
    NzPopconfirmDirective,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent {
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  devices: any[] = []

  constructor(
    @Optional() protected ref: NzModalRef,
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  select(status: any, id: any) {
    let data = {status: status, id: id}
    this.ref && this.ref.close(data);
  }

  refresh() {
    this.pageIndex = 1;
    this.load();
  }

  search() {
    console.log(this.value);
    this.load();
  }

  delete(i: any) {
    this.rs.get(`device/${i}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.load()
      },
      (err) => {
        console.log('err:', err);
      }
    );
    this.load();
  }

  pageSizeChange(e: any) {
    this.pageSize = e;
    this.load();
  }

  pageIndexChange(e: any) {
    this.pageIndex = e;
    this.load();
  }

  load() {
    let query;
    query = {
      limit: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
    };

    this.value ? (query = {...query, keyword: {id: this.value, name: this.value}}) : '';

    this.rs.post('device/search', query).subscribe((res) => {
      this.devices = res.data;
      this.total = res.total;
    });
  }
}
