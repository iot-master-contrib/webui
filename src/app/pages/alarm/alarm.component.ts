import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
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
import {
  ParamSearch,
  SmartTableButton,
  SmartTableColumn,
  SmartTableComponent,
  SmartTableOperator,
} from '../../../../projects/smart/src/smart-table/smart-table.component';

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
    NzSpaceItemDirective,
    CommonModule,
    SmartTableComponent,
  ],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.scss'
})
export class AlarmComponent implements OnInit {
  ngOnInit(): void {
    this.load();
  }

  @Input() device_id? = '';
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


  load(query?: any) {

    this.device_id ? (query = {...query, filter: {device_id: this.device_id}}) : '';
    this.loading = true;
    this.rs
      .get('alarm/list', query)
      .subscribe((res) => {
        this.datum = res.data;
        this.total = res.total;
      })
      .add(() => {
        this.loading = false;
      });
  }

  datum: any[] = [];
  loading = false;


  columns: SmartTableColumn[] = [
    {
      key: 'project_id',
      sortable: true,
      text: '项目',
      keyword: true,
    },
    {key: 'device_id', sortable: true, text: '设备', keyword: true},
    {key: 'level', sortable: true, text: '等级', keyword: true},
    {key: 'title', sortable: true, text: '标题', keyword: true},
    {key: 'message', sortable: true, text: '内容', keyword: true},

    {key: 'created', sortable: true, text: '创建时间', date: true},
  ];


  operators: SmartTableOperator[] = [
    {
      icon: 'delete',
      title: '解绑',
      confirm: '确认解绑？',
      action: (data) => {
        this.rs.get(`alarm/${data.id}/delete`).subscribe((res) => {
          this.load({})
          //refresh
        });
      },
    },
  ];


  onQuery(query: ParamSearch) {
    console.log('onQuery', query);
    this.load(query)
  }

}
