import {Component, OnInit} from '@angular/core';
import {
  NzPageHeaderComponent,
  NzPageHeaderModule,
} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {DatePipe, NgForOf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective,
} from 'ng-zorro-antd/table';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {RequestService} from '../../../request.service';
import { AlarmComponent } from '../../alarm/alarm.component';
@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzSpaceModule,
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
    AlarmComponent
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
  ) {
  }

  id!: any;

  itemId = [
    {label: 'product_id', value: '产品'},
    {label: 'project_id', value: '项目'},
    {label: 'gateway_id', value: '网关'},
  ];

  data: any = {};

  product: any = {};

  properties: any = [];

  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';

  values: any = {
    temp: 30,
    hum: 71,
  };


  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('project')) {
      //this.id = this.route.snapshot.paramMap.get('project');
    }
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
      this.loadValues();
      return;
    }
  }

  alarms: any[] = [];

  load() {
    this.rs.get(`device/${this.id}`, {}).subscribe((res) => {
      this.data = res.data;
      this.loadProduct();
      this.loadProperties();
    });

    this.rs.get('alarm/list', {}).subscribe(
      (res) => {
        this.alarms = res.data;
        this.total = res.total;
      });
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

  pageSizeChange(e: any) {
    this.pageSize = e;
    this.load();
  }

  pageIndexChange(e: any) {
    this.pageIndex = e;
    this.load();
  }

  delete() {
    this.rs.get(`device/${this.id}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.router.navigateByUrl('admin/device');
      });
  }
}
