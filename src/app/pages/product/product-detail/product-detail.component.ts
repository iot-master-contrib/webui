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
import {DevicesComponent} from "../../device/devices/devices.component";
import {WebViewComponent} from "../../../components/web-view/web-view.component";
import {ProductVersionComponent} from "../product-version/product-version.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    SmartInfoComponent,
    NzCardComponent,
    NzSpaceComponent,
    NzButtonComponent,
    NzSpaceItemDirective,
    RouterLink,
    NzPopconfirmDirective,
    NzTabsModule,
    DevicesComponent,
    WebViewComponent,
    ProductVersionComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  id!: any;

  value = '';

  data: any = {};

  fields: SmartInfoItem[] = [
    {label: 'ID', key: 'id'},
    {label: '名称', key: 'name'},
    {label: '关键字', key: 'keywords', type: 'tags'},
    {label: '创建时间', key: 'created', type: 'date'},
    {label: '说明', key: 'description', span: 2},
  ];

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
  }

  plugins: any[] = [];

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load()
      this.loadPlugins()
    }
  }

  load() {
    this.rs.get(`product/${this.id}`, {}).subscribe((res) => {
        this.data = res.data
      }
    );
  }

  loadPlugins() {
    this.rs.get("plugin/pages/product").subscribe(res => {
      this.plugins = res.data
    })
  }


  delete() {
    this.rs.get(`product/${this.id}/delete`, {}).subscribe((res) => {
      this.msg.success('删除成功');
      this.router.navigateByUrl('admin/product');
    });
    this.load();
  }
}
