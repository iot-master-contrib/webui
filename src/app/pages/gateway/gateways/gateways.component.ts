import {Component, Input, OnInit, Optional} from '@angular/core';
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
  selector: 'app-gateways',
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
  templateUrl: './gateways.component.html',
  styleUrl: './gateways.component.scss'
})
export class GatewaysComponent implements OnInit {
  @Input() chooseGateway = false;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';

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

  refresh() {
    this.pageIndex = 1;
    this.load();
  }

  gateways: any[] = []

  select(id: any) {

    this.ref && this.ref.close(id);
  }

  search() {
    console.log(this.value);
    this.load();
  }

  delete(i: any) {
    this.rs.get(`gateway/${i}/delete`, {}).subscribe(
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
    this.rs.post('gateway/search', query).subscribe(
      (res) => {
        this.gateways = res.data;
        this.total = res.total;
      });
  }

}
