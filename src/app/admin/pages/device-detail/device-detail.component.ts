import {Component} from '@angular/core';
import {NzPageHeaderComponent, NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {PluginsComponent} from "../../plugins/plugins.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";

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
  ],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss'
})
export class DeviceDetailComponent {
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

  delete() {

  }

}
