import {
  Component,
  Inject,
  inject,
  InjectFlags,
  OnInit,
  Optional,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, NgForOf } from '@angular/common';
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  ParamSearch,
  TableViewButton,
  TableViewColumn,
  TableViewComponent,
  TableViewOperator,
} from '../../../components/table-view/table-view.component';
@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, TableViewComponent],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnInit {
  base = '/admin/';

  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  devices: any = [];

  //从Modal中传参过来
  //readonly data: any = inject(NZ_MODAL_DATA, {optional:true});
  project_id: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rs: RequestService,
    private msg: NzMessageService,
    @Optional() protected ref: NzModalRef,
    @Optional() @Inject(NZ_MODAL_DATA) protected data: any
  ) {}

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
      this.base = '/project/' + this.project_id + '/';
    }
    if (this.data?.project_id) {
      this.project_id = this.data.project_id;
    }
  }

  load(query?: any) {
    if (this.project_id) query.filter = { project_id: this.project_id };
     if (this.value)  (query = { ...query, keyword: { id: this.value, name: this.value } })

    this.loading = true;
    this.rs
      .post('device/search', query)
      .subscribe((res) => {
        this.datum = res.data;
        this.total = res.total;
      })
      .add(() => {
        this.loading = false;
      });
  }

  datum: any[] = [];
  loading = false;

  buttons: TableViewButton[] = [
    { icon: 'plus', text: '创建', link: `/admin/device/create` },
  ];

  columns: TableViewColumn[] = [
    {
      key: 'id',
      sortable: true,
      text: 'ID',
      keyword: true,
      link: (data) => `/admin/device/${data.id}`,
    },
    { key: 'name', sortable: true, text: '名称', keyword: true },
    {
      key: 'gateway',
      sortable: true,
      text: '网关',
      keyword: true,
      link: (data) => `/admin/gateway/${data.gateway_id}`,
    },
    {
      key: 'product',
      sortable: true,
      text: '产品',
      keyword: true,
      link: (data) => `/admin/product/${data.product_id}`,
    },
    {
      key: 'project',
      sortable: true,
      text: '项目',
      keyword: true,
      link: (data) => `/admin/project_id/${data.project_id}`,
    },
    { key: 'online', sortable: true, text: '上线时间', date: true },
  ];

  columns2: TableViewColumn[] = [
    { key: 'id', text: 'ID', keyword: true },
    { key: 'name', text: '名称', keyword: true },
  ];

  operators: TableViewOperator[] = [
    {
      icon: 'edit',
      title: '编辑',
      link: (data) => `/admin/device/${data.id}/edit`,
    },
    {
      icon: 'delete',
      title: '删除',
      confirm: '确认删除？',
      action: (data) => {
        this.rs.get(`device/${data.id}/delete`).subscribe((res) => {
          this.load({});
          //refresh
        });
      },
    },
  ];

  operators2: TableViewOperator[] = [
    { text: '选择', action: (data) => this.ref.close(data) },
  ];

  onQuery(query: ParamSearch) {
    console.log('onQuery', query);
    this.load(query);
  }
}
