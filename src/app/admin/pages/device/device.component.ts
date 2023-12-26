import { Component } from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf} from "@angular/common";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
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
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent {

  devices: any[] = [
    {id:1,name:"1号",product:"温度计",online:new Date()},
    {id:2,name:"2号",product:"温度计",online:new Date()},
    {id:3,name:"3号",product:"温度计",online:new Date()},
    {id:4,name:"4号",product:"温度计",online:new Date()},
  ]

}
