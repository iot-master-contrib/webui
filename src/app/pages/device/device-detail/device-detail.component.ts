import {Component, OnInit} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartInfoComponent, SmartInfoItem} from "../../../../../projects/smart/src/lib/smart-info/smart-info.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {SmartTableColumn} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [
    CommonModule,
    SmartInfoComponent,
    NzDividerComponent,
    NzRowDirective,
    NzColDirective,
    NzStatisticComponent,
    NzCardComponent,
    NzSpaceComponent,
    NzSpaceItemDirective,
    NzButtonComponent,
    RouterLink,
    NzPopconfirmDirective,
    NzTabsModule,
  ],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss',
})
export class DeviceDetailComponent implements OnInit {
  id!: any;


  data: any = {};

  fields: SmartInfoItem[] = [
    {key: 'id', label: 'ID'},
    {key: 'name', label: '名称'},
    {
      key: 'gateway', label: '网关', type: 'link',
      link: () => `/admin/gateway/${this.data.gateway_id}`,
    },
    {
      key: 'product', label: '产品', type: 'link',
      link: () => `/admin/product/${this.data.product_id}`,
    },
    {
      key: 'product_version', label: '版本'},
    {
      key: 'project', label: '项目', type: 'link',
      link: () => `/admin/project/${this.data.project_id}`,
    },
    //{key: 'online',  label: '上线时间', type: 'date'},
    {key: 'created', label: '创建时间', type: 'date'},
    {key: 'description', label: '说明', span: 2},
  ];

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
  }

  product: any = {};

  properties: any = [];

  values: any = {};

  loading = false;

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('project')) {
      //this.id = this.route.snapshot.paramMap.get('project');
    }
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
      this.loadValues();
    }
  }

  load() {
    // this.rs.get(`device/${this.id}`, {}).subscribe((res) => {
    //   this.data = res.data;
    //   this.loadProduct();
    //   this.loadProperties();
    // });
    this.loading = true
    this.rs.post('device/search', {filter:{id:this.id}}).subscribe((res) => {
      this.data = res.data[0];
      this.loadProduct();
      this.loadProperties();
    }).add(() => this.loading = false);
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
    this.rs.get('product/' + this.data.product_id + '/attach/read/property.json').subscribe((res) => {
      console.log('property', res);
      this.properties = res;
    });
  }

  delete() {
    this.rs.get(`device/${this.id}/delete`, {}).subscribe((res) => {
      this.msg.success('删除成功');
      this.router.navigateByUrl('admin/device');
    });
  }
}
