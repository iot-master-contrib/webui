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
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
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
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
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
  constructor( private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute) { 
  }
  plugins: any[] = [
    {
      id: 'modbus',
      name: 'Modbus',
      icon: 'assets/app.png',
      description: 'Modbus映射编辑'
    },
  ];
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
     this.load()
    }
 
  }
  load() {
    this.rs.get(`product/${this.id}`, {}).subscribe(
      (res) => {
        this.data= res.data 
       
      },
      (err) => {
        console.log('err:', err);
      }
    );
   
  }
  delete( ) {
    this.rs.get(`product/${this.id}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.router.navigateByUrl('admin/product');
      },
      (err) => {
        console.log('err:', err);
      }
    );
    this.load();
  }
}
