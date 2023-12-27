import {Component} from '@angular/core';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {DatePipe, NgForOf} from "@angular/common";
import {PluginsComponent} from "../../plugins/plugins.component";
import {RouterLink} from "@angular/router";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    NzPageHeaderComponent,
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderExtraDirective,
    NzSpaceComponent,
    NzSpaceItemDirective,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    DatePipe,
    PluginsComponent,
    RouterLink,
    NzPopconfirmDirective,
    NgForOf,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzPaginationComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  data: any = {
    id: 1,
    name: '人民医院',
    description: '人民医院智慧大屏项目',
    version: '3',
    keywords: ['医院'],
    icon: '',
    url: 'https://www.baidu.com',
    created: new Date()
  }

  plugins: any[] = [
    {
      id: 'scene',
      name: '智慧场景',
      icon: 'assets/app.png',
      description: '智慧场景，联动控制'
    },
    {
      id: 'screen',
      name: '数据大屏',
      icon: 'assets/app.png',
      description: ''
    },
  ];

  devices: any[] = [
    {id: 1, name: "1号", product: "温度计", alias: 't1', online: new Date()},
    {id: 2, name: "2号", product: "温度计", alias: 't2', online: new Date()},
    {id: 3, name: "3号", product: "温度计", alias: 't3', online: new Date()},
    {id: 4, name: "4号", product: "温度计", alias: 't4', online: new Date()},
  ]


  delete() {

  }

}
