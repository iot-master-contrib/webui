import {Component, Optional} from '@angular/core';
import {NzModalRef,} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {RequestService} from "../../../request.service";
import {
  ParamSearch,
  SmartTableButton,
  SmartTableColumn,
  SmartTableComponent,
  SmartTableOperator,
} from '../../../../../projects/smart/src/smart-table/smart-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, SmartTableComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: SmartTableButton[] = [
    {icon: 'plus', text: '创建', link: () => `/admin/user/create`},
  ];

  columns: SmartTableColumn[] = [
    {key: 'id', sortable: true, text: 'ID', keyword: true,},
    {key: 'name', sortable: true, text: '姓名', keyword: true},
    {key: 'cellphone', sortable: true, text: '手机', keyword: true,},
    {key: 'email', sortable: true, text: '邮箱', keyword: true,},
    {key: 'disabled', sortable: true, text: '状态', keyword: true,},
    {key: 'created', sortable: true, text: '创建时间', date: true},
  ];

  columnsSelect: SmartTableColumn[] = [
    {key: 'id', text: 'ID', keyword: true},
    {key: 'name', text: '名称', keyword: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'edit', title: '编辑', link: (data) => `/admin/user/${data.id}/edit`,},
    {
      icon: 'delete', title: '删除', confirm: '确认删除？', action: (data) => {
        this.rs.get(`user/${data.id}/delete`).subscribe((res) => this.refresh())
      },
    },
  ];

  operatorsSelect: SmartTableOperator[] = [
    {text: '选择', action: (data) => this.ref.close(data)},
  ];

  constructor(private rs: RequestService, @Optional() protected ref: NzModalRef) {
  }


  query!: ParamSearch

  refresh() {
    this.search(this.query)
  }

  search(query: ParamSearch) {
    //console.log('onQuery', query)
    this.query = query
    this.loading = true
    this.rs.post('user/search', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }

}
