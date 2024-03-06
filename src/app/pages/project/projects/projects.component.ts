import {Component, Optional} from '@angular/core';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
  ParamSearch, SmartTableButton, SmartTableColumn,
  SmartTableComponent, SmartTableOperator
} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    SmartTableComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: SmartTableButton[] = [
    {icon: "plus", text: "创建", link: () => `/admin/project/create`}
  ];

  columns: SmartTableColumn[] = [
    {key: "id", sortable: true, text: "ID", keyword: true, link: (data) => `/admin/project/${data.id}`},
    {key: "name", sortable: true, text: "名称", keyword: true},
    {key: "created", sortable: true, text: "创建时间", date: true},
  ];

  columnsSelect: SmartTableColumn[] = [
    {key: "id", text: "ID", keyword: true},
    {key: "name", text: "名称", keyword: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'export', title: '打开', link: data => `/project/${data.id}`, external: true},
    {icon: 'edit', title: '编辑', link: data => `/admin/project/${data.id}/edit`},
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`project/${data.id}/delete`).subscribe(res => this.refresh())
      }
    },
  ];

  operatorsSelect: SmartTableOperator[] = [
    {text: "选择", action: data => this.ref.close(data)},
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
    this.rs.post('project/search', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }

}
