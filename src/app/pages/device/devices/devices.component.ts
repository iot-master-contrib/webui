import {
  Component,
  Inject,
  inject,
  InjectFlags, Input,
  OnInit,
  Optional,
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule, DatePipe, NgForOf} from '@angular/common';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {
  ParamSearch,
  SmartTableButton,
  SmartTableColumn,
  SmartTableComponent,
  SmartTableOperator,
} from '../../../../../projects/smart/src/lib/smart-table/smart-table.component';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, SmartTableComponent],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnInit {

  //从Modal中传参过来
  //readonly data: any = inject(NZ_MODAL_DATA, {optional:true});
  @Input() project_id: any = '';
  @Input() gateway_id: any = '';
  @Input() product_id: any = '';


  datum: any[] = [];
  total = 0;
  loading = false;


  buttons: SmartTableButton[] = [
    {icon: 'plus', label: '创建', link: () => `/admin/device/create`},
  ];

  buttonsProject: SmartTableButton[] = [
    {icon: 'plus', label: '创建', link: () => `/project/${this.project_id}/device/create`},
  ];

  columns: SmartTableColumn[] = [
    {
      key: 'id', sortable: true, label: 'ID', keyword: true,
      link: (data) => `/admin/device/${data.id}`,
    },
    {key: 'name', sortable: true, label: '名称', keyword: true},
    {
      key: 'gateway', sortable: true, label: '网关', keyword: true,
      link: (data) => `/admin/gateway/${data.gateway_id}`,
    },
    {
      key: 'product', sortable: true, label: '产品', keyword: true,
      link: (data) => `/admin/product/${data.product_id}`,
    },
    {key: 'product_version', sortable: true, label: '版本'},
    {
      key: 'project', sortable: true, label: '项目', keyword: true,
      link: (data) => `/admin/project/${data.project_id}`,
    },
    {key: 'online', sortable: true, label: '上线时间', date: true},
  ];

  columnsProject: SmartTableColumn[] = [
    {
      key: 'id', sortable: true, label: 'ID', keyword: true,
      link: (data) => `/project/${this.project_id}/device/${data.id}`,
    },
    {key: 'name', sortable: true, label: '名称', keyword: true},
    {
      key: 'gateway', sortable: true, label: '网关', keyword: true,
      link: (data) => `/project/${this.project_id}/gateway/${data.gateway_id}`,
    },
    {
      key: 'product', sortable: true, label: '产品', keyword: true,
      link: (data) => `/project/${this.project_id}/product/${data.product_id}`,
    },
    {key: 'product_version', sortable: true, label: '版本'},
    {key: 'online', sortable: true, label: '上线时间', date: true},
  ];


  columnsSelect: SmartTableColumn[] = [
    {key: 'id', label: 'ID', keyword: true},
    {key: 'name', label: '名称', keyword: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'edit', title: '编辑', link: (data) => `/admin/device/${data.id}/edit`,},
    {
      icon: 'delete', title: '删除', confirm: '确认删除？', action: (data) => {
        this.rs.get(`device/${data.id}/delete`).subscribe((res) => this.refresh())
      },
    },
  ];

  operatorsProject: SmartTableOperator[] = [
    {icon: 'edit', title: '编辑', link: (data) => `/project/${this.project_id}/device/${data.id}/edit`,},
    {
      icon: 'delete', title: '删除', confirm: '确认删除？',
      action: (data) => {
        this.rs.get(`device/${data.id}/delete`).subscribe((res) => this.refresh())
      },
    },
  ];

  operatorsSelect: SmartTableOperator[] = [
    {label: '选择', action: (data) => this.ref.close(data)},
  ];


  constructor(
    private route: ActivatedRoute,
    private rs: RequestService,
    @Optional() protected ref: NzModalRef,
    @Optional() @Inject(NZ_MODAL_DATA) protected data: any
  ) {
    this.project_id = data?.project_id;
  }

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
      //this.base = '/project/' + this.project_id + '/';
    }
  }

  query!: ParamSearch

  refresh() {
    this.search(this.query)
  }

  search(query: ParamSearch) {
    //console.log('onQuery', query)
    this.query = query

    if (this.gateway_id)
      query.filter['gateway_id'] = this.gateway_id;
    if (this.product_id)
      query.filter['product_id'] = this.product_id;
    if (this.project_id)
      query.filter['project_id'] = this.project_id;

    this.loading = true;
    this.rs.post('device/search', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }
}
