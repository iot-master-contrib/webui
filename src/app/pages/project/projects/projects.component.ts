import {Component, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
  ParamSearch, TableViewButton, TableViewColumn,
  TableViewComponent, TableViewOperator
} from "../../../components/table-view/table-view.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    TableViewComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: TableViewButton[] = [
    {icon: "plus", text: "创建", link: `/admin/project/create`}
  ];

  columns: TableViewColumn[] = [
    {key: "id", sortable: true, text: "ID", keyword: true, link: (data) => `/admin/project/${data.id}`},
    {key: "name", sortable: true, text: "名称", keyword: true},
    {key: "created", sortable: true, text: "创建时间", date: true},
  ];

  columns2: TableViewColumn[] = [
    {key: "id", text: "ID", keyword: true},
    {key: "name", text: "名称", keyword: true},
  ];

  operators: TableViewOperator[] = [
    {icon: 'export', title: '打开', link: data => `/project/${data.id}`, external: true},
    {icon: 'edit', title: '编辑', link: data => `/admin/project/${data.id}/edit`},
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`project/${data.id}/delete`).subscribe(res => {
          //refresh
        })
      }
    },
  ];

  operators2: TableViewOperator[] = [
    {text: "选择", action: data => this.ref.close(data)},
  ];

  constructor(
    private route: Router,
    private rs: RequestService,
    @Optional() protected ref: NzModalRef
  ) {
  }

  onQuery(query: ParamSearch) {
    console.log('onQuery', query)
    this.loading = true
    this.rs.post('project/search', query).subscribe(
      (res) => {
        this.datum = res.data;
        this.total = res.total;
      }).add(() => {
      this.loading = false
    });
  }

}
