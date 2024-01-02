import { Component } from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {Router, RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf} from "@angular/common";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    FormsModule ,
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
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  devices: any[] = [
    // {id:1,name:"1号",product:"温度计",online:new Date()},
    // {id:2,name:"2号",product:"温度计",online:new Date()},
    // {id:3,name:"3号",product:"温度计",online:new Date()},
    // {id:4,name:"4号",product:"温度计",online:new Date()},
  ]

  constructor(
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {}
  ngOnInit(): void {
    this.load();
  }
  refresh() {
    this.nzPageIndex = 1;
    this.load();
  }
  open(p: any) {
    this.route.navigateByUrl('admin/device/' + p.id);
  }

  edit(p: any) {
    this.route.navigateByUrl('admin/device/' + p.id + '/edit');
  }
  search() {
    console.log(this.value);
    this.load();
  }
  delete(i: any) {
    this.rs.get(`device/${i}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.load()
      },
      (err) => {
        console.log('err:', err);
      }
    );
    this.load();
  }
  nzPageSizeChange(e: any) {
    this.nzPageSize = e;
    this.load();
  }
  nzPageIndexChange(e: any) {
    this.nzPageIndex = e;
    this.load();
  }
  load() {
    let query; 
    query = {
      limit: this.nzPageSize,
      skip: (this.nzPageIndex - 1) * this.nzPageSize,
    };

    this.value ? (query = { ...query, filter: { name: this.value } }) : '';
   
    this.rs
      .get('device/list', query)
      .subscribe(
        (res) => { 
            this.devices = res.data;
            this.total = res.total; 
        },
        (err) => {
          console.log('err:', err);
        }
      );
  }
}
