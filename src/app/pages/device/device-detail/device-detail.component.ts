import { Component, OnInit } from '@angular/core';
import {
  NzPageHeaderComponent,
  NzPageHeaderModule,
} from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { PluginsComponent } from '../../../components/plugins/plugins.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { DatePipe, NgForOf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzStatisticComponent } from 'ng-zorro-antd/statistic';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective,
} from 'ng-zorro-antd/table';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequestService } from '../../../request.service';

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
  styleUrl: './device-detail.component.scss',
})
export class DeviceDetailComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {}

  id!: any;

  itemId = [
    { label: 'product_id', value: '产品' },
    { label: 'project_id', value: '项目' },
    { label: 'gateway_id', value: '网关' },
  ];
  data: any = {};

  product: any = {};

  properties: any = [
    { name: 'temp', label: '温度', unit: '℃' },
    { name: 'hum', label: '湿度', unit: '%' },
  ];

  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';

  values: any = {
    temp: 30,
    hum: 71,
  };
  link: any[] = [
    {
      to: 'product',
      name: '未绑定产品',
      icon: 'assets/app.png',
    },
    {
      to: 'project',
      name: '未绑定项目',
      icon: 'assets/app.png',
    },
    {
      id: 'modbus',
      name: '未绑定网关',
      icon: 'assets/app.png',
    },
  ];

  plugins: any[] = [
    {
      id: 'modbus',
      name: 'Modbus',
      icon: 'assets/app.png',
      description: 'Modbus映射编辑',
    },
    {
      id: 'history',
      name: '历史数据',
      icon: 'assets/app.png',
      description: '',
    },
  ];

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
      this.loadValues();
      return;
    }
  }

  alarms: any[] = [];
  toLink(e: any) {
    let  Id=this.data[ this.itemId[e].label]
    if( Id)
    this.router.navigateByUrl('/admin/'+this.link[e].to+'/'+ Id);
    else{this.msg.error("未绑定")}
  }
  load() {
    this.rs.get(`device/${this.id}`, {}).subscribe((res) => {
      this.data = res.data;
      if (this.data) {
        this.itemId.filter((item, index) => {
          this.link[index].name =
            (this.data?.[item.label] ? '已绑定' : '未绑定') + item.value;
        });
      }
      this.loadProduct();
      this.loadProperties();
    });

    this.rs.get('alarm/list', {}).subscribe(
      (res) => {
        this.alarms = res.data;
        this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  loadValues() {
    this.rs.get('device/' + this.id + '/values').subscribe((res) => {
      this.values = res.data;
    });
  }

  loadProduct() {
    this.rs.get('product/' + this.data.product_id).subscribe((res) => {
      this.product = res.data;
    });
  }

  loadProperties() {
    this.rs
      .get('product/' + this.data.product_id + '/attach/read/property.json')
      .subscribe((res) => {
        console.log('property', res);
        this.properties = res;
      });
  }

  nzPageSizeChange(e: any) {
    this.nzPageSize = e;
    this.load();
  }

  nzPageIndexChange(e: any) {
    this.nzPageIndex = e;
    this.load();
  }

  delete() {
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
