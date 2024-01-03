import { Component, OnInit } from '@angular/core';
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
import {Router, RouterLink} from "@angular/router";
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CreateComponent } from '../../modals/create/create.component';

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
export class PluginComponent implements OnInit{
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  constructor( private ms: NzModalService, 
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {}
  ngOnInit(): void {
    this.load();
  }
  plugins: any[] = [
    {id: "modbus", name:"Modbus", description:"Modbus协议插件", icon: "/assets/app.png"},
    {id: "influxdb", name:"Influxdb", description:"Influxdb时序数据库", icon: "/assets/app.png"},
    {id: "scada", name:"Scada", description:"Web组态", icon: "/assets/app.png"},
    {id: "sms", name:"SMS", description:"短信推送", icon: "/assets/app.png"},
    {id: "call", name:"Call", description:"电话报警", icon: "/assets/app.png"},
    {id: "web-studio", name:"Web Studio", description:"低代码开发平台", icon: "/assets/app.png"},
    {id: "goview", name:"GoView", description:"大数据屏可视化", icon: "/assets/app.png"},
  ];
  load() {
    let query; 
    query = {
      limit: this.nzPageSize,
      skip: (this.nzPageIndex - 1) * this.nzPageSize,
    };

    this.value ? (query = { ...query, filter: {username: this.value } }) : '';
   
    this.rs
      .post('plugin/search', query)
      .subscribe(
        (res) => { 
            // this.gateways = res.data;
            // this.total = res.total; 
        },
        (err) => {
          console.log('err:', err);
        }
      );
  }
  create(){
 
    const modal: NzModalRef = this.ms.create({
      nzTitle: '创建插件',   
      nzContent: CreateComponent, 
      nzData: {
        name: 'product', 
      },
      nzMaskClosable: false,
      nzFooter: [
                {
                    label: '取消',
                    onClick: () => {
                        modal.destroy();
                    },
                },
               {
                    label: '保存',
                    type: 'primary',
                    onClick: (rs: any) => {
                        rs!.submit().then(
                            () => {
                                modal.destroy();
                                this.load()
                            },
                            () => {}
                        );
                    },
                },
              
            ],
    });
  
    }
}
