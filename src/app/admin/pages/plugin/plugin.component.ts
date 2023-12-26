import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzSpaceComponent} from "ng-zorro-antd/space";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-plugin',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzColDirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzPaginationComponent,
    NzPopconfirmDirective,
    NzRowDirective,
    NzSpaceComponent,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './plugin.component.html',
  styleUrl: './plugin.component.scss'
})
export class PluginComponent {
  plugins: any[] = [
    {id: "modbus", name:"Modbus", description:"Modbus协议插件", icon: "/assets/app.png"},
    {id: "influxdb", name:"Influxdb", description:"Influxdb时序数据库", icon: "/assets/app.png"},
    {id: "scada", name:"Scada", description:"Web组态", icon: "/assets/app.png"},
    {id: "sms", name:"SMS", description:"短信推送", icon: "/assets/app.png"},
    {id: "call", name:"Call", description:"电话报警", icon: "/assets/app.png"},
    {id: "web-studio", name:"Web Studio", description:"低代码开发平台", icon: "/assets/app.png"},
    {id: "goview", name:"GoView", description:"大数据屏可视化", icon: "/assets/app.png"},
  ];

}
