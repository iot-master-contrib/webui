import { Component, OnInit } from '@angular/core';
import {NzPageHeaderComponent, NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {PluginsComponent} from "../../plugins/plugins.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {DatePipe, NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequestService  } from '../../../request.service';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzSpaceModule,
    PluginsComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputGroupComponent,
    NzInputDirective,
    NgForOf,
    RouterLink,
    NzPopconfirmDirective,
    DatePipe,
    NzStatisticComponent,
    NzRowDirective,
    NzColDirective,
    NzDividerComponent,
    NzPaginationComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
  ],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss'
})
export class DeviceDetailComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
   
  }
  id!:any
  data: any = {
    id: 1,
    name: '温度计',
    description: '标准485温度计',
    version: '3',
    keywords: ['modbus'],
    icon: '',
    url: 'https://www.baidu.com',
    created: new Date(),
    properties: [
      {name: "temp", label: "温度", unit: '℃'},
      {name: "hum", label: "湿度", unit: '%'},
    ]
  }
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  variables: any = {
    temp: 30,
    hum: 71,
  }


  plugins: any[] = [
    {
      id: 'modbus',
      name: 'Modbus',
      icon: 'assets/app.png',
      description: 'Modbus映射编辑'
    },
    {
      id: 'history',
      name: '历史数据',
      icon: 'assets/app.png',
      description: ''
    },
  ];
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id'); 
      this.load()
      return
    }
   
    
  }
  alarms: any[] = [
    {level: 1, title: '温度过高', message: '温度大于35度', created: new Date()},
    {level: 1, title: '温度过高', message: '温度大于35度', created: new Date()},
    {level: 1, title: '温度过高', message: '温度大于35度', created: new Date()},
    {level: 1, title: '温度过高', message: '温度大于35度', created: new Date()},
    {level: 1, title: '温度过高', message: '温度大于35度', created: new Date()},
  ]
  load(){

    this.rs.get(`device/${this.id}`, {}).subscribe(
      (res) => {
        this.data={...res.data, properties: [
          {name: "temp", label: "温度", unit: '℃'},
          {name: "hum", label: "湿度", unit: '%'},
        ]}
      },
      (err) => {
        console.log('err:', err);
      }
    );
    this.rs
    .get('alarm/list', {})
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
  nzPageSizeChange(e: any) {
    this.nzPageSize = e;
    this.load();
  }
  nzPageIndexChange(e: any) {
    this.nzPageIndex = e;
    this.load();
  }
  delete( ) {
    this.rs.get(`device/${this.id}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.router.navigateByUrl('admin/device');
      },
      (err) => {
        console.log('err:', err);
      }
    );
    
  }

}
