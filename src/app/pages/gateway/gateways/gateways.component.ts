import { Component, Input, OnInit, Optional } from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {Router, RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf} from "@angular/common";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
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
export class GatewaysComponent implements OnInit{
  @Input() chooseGateway = false;
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  constructor(
    @Optional() protected ref: NzModalRef,
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {}
  ngOnInit(): void {
    this.load();
  }
  refresh() {
    this.nzPageIndex = 1;
    this.load();
  }

  gateways: any[] = [
    // {id:1,name:"一厂东",username:"test",password:"test",online:new Date()},
    // {id:2,name:"一厂西",username:"test",password:"test",online:new Date()},
    // {id:3,name:"新安镇",username:"test",password:"test",online:new Date()},
    // {id:4,name:"华庄",username:"test",password:"test",online:new Date()},
  ]
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
  nzPageSizeChange(e: any) {
    this.nzPageSize = e;
    this.load();
  }
  nzPageIndexChange(e: any) {
    this.nzPageIndex = e;
    this.load();
  }
  load() {
    let query;
    query = {
      limit: this.nzPageSize,
      skip: (this.nzPageIndex - 1) * this.nzPageSize,
    };

    this.value ? (query = { ...query, keyword: {username: this.value } }) : '';
   if(this.ref){query.limit=9999}
    this.rs
      .post('gateway/search', query)
      .subscribe(
        (res) => {
            this.gateways = res.data;
            this.total = res.total;
        },
        (err) => {
          console.log('err:', err);
        }
      );
  }

}
