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
  selector: 'app-gateway',
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
  templateUrl: './gateway.component.html',
  styleUrl: './gateway.component.scss'
})
export class GatewayComponent {

  gateways: any[] = [
    {id:1,name:"一厂东",username:"test",password:"test",online:new Date()},
    {id:2,name:"一厂西",username:"test",password:"test",online:new Date()},
    {id:3,name:"新安镇",username:"test",password:"test",online:new Date()},
    {id:4,name:"华庄",username:"test",password:"test",online:new Date()},
  ]

}
