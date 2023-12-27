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
import {NzDividerComponent} from "ng-zorro-antd/divider";

@Component({
  selector: 'app-gateway-detail',
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
    NzTrDirective,
    NzDividerComponent
  ],
  templateUrl: './gateway-detail.component.html',
  styleUrl: './gateway-detail.component.scss'
})
export class GatewayDetailComponent {
  data: any = {
    id: 1,
    name: '一厂东',

    username: 'test',
    password: 'test',
    created: new Date()
  }

  devices: any[] = [
    {id: 1, name: "1号", product: "温度计", online: new Date()},
    {id: 2, name: "2号", product: "温度计", online: new Date()},
    {id: 3, name: "3号", product: "温度计", online: new Date()},
    {id: 4, name: "4号", product: "温度计", online: new Date()},
  ]


  delete() {

  }

}
