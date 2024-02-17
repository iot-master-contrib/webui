import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {Router, RouterLink} from "@angular/router";
import {RequestService} from '../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-alarm',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzPaginationComponent,
    NzPopconfirmDirective,
    NzSpaceComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    RouterLink,
    NzSpaceItemDirective
  ],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.scss'
})
export class AlarmComponent implements OnInit {
  ngOnInit(): void {
    this.load();
  }

  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';

  constructor(
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {
  }

  load() {
    let query;
    query = {
      limit: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
    };

    this.value ? (query = {...query, filter: {name: this.value}}) : '';

    this.rs
      .get('alarm/list', query)
      .subscribe(
        (res) => {
          this.alarms = res.data;
          this.total = res.total;
        },
        (err) => {
          console.log('err:', err);
        }
      );
  }

  pageSizeChange(e: any) {
    this.pageSize = e;
    this.load();
  }

  pageIndexChange(e: any) {
    this.pageIndex = e;
    this.load();
  }

  alarms: any[] = [
    // {id:1,project:"第一人民医院",device:"1号温度计",level:1,title:"1号温度过高",message:"温度计",created:new Date()},
    // {id:2,project:"第一人民医院",device:"2号温度计",level:1,title:"2号温度过高",message:"温度计",created:new Date()},
    // {id:3,project:"第一人民医院",device:"3号温度计",level:1,title:"3号温度过高",message:"温度计",created:new Date()},
    // {id:4,project:"第一人民医院",device:"4号温度计",level:1,title:"4号温度过高",message:"温度计",created:new Date()},
  ]

}
