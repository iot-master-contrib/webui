import {Component, OnInit, Optional} from '@angular/core';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NgForOf} from '@angular/common';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {Router, RouterLink} from '@angular/router';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzAffixComponent} from 'ng-zorro-antd/affix';
import {RequestService} from '../../../request.service';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzModalRef, NzModalService, NzModalModule} from 'ng-zorro-antd/modal';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {
  ParamSearch,
  TableViewButton,
  TableViewColumn,
  TableViewComponent, TableViewOperator
} from "../../../components/table-view/table-view.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzModalModule,
    FormsModule,
    NzInputModule,
    NzPopconfirmModule,
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzDropdownMenuComponent,
    NzDropDownDirective,
    NzDropDownModule,
    NzMenuDirective,
    NzMenuItemComponent,
    NgForOf,
    NzPaginationComponent,
    NzPopconfirmDirective,
    NzSpaceComponent,
    NzButtonComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzSpaceItemDirective,
    NzAffixComponent,
    RouterLink,
    NzEmptyComponent,
    TableViewComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  projects: any[] = [
    // { id: 1, name: '第一人民医院', description: '放射科室' },
    // { id: 2, name: '中医院', description: '放射科室' },
    // { id: 3, name: '第五人民医院', description: '放射科室' },
    // { id: 4, name: '协和医院', description: '放射科室' },
  ];

  buttons: TableViewButton[] = [
    {
      icon: "plus",
      text: "创建"
    }
  ];

  columns: TableViewColumn[] = [
    {key: "id", sortable: true, text: "ID", keyword: true, link: (data) => `/admin/project/${data.id}`},
    {key: "name", sortable: true, text: "名称", keyword: true},
    {key: "created", sortable: true, text: "创建时间", date: true},
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

  onQuery(query: ParamSearch) {
    console.log('onQuery', query)
    this.rs.post('project/search', query).subscribe(
      (res) => {
        this.projects = res.data;
        this.total = res.total;
      });
  }

  constructor(
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    private ms: NzModalService,
    @Optional() protected ref: NzModalRef
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  refresh() {
    this.pageIndex = 1;
    this.load();
  }

  select(id: any) {
    this.ref && this.ref.close(id);
  }

  search() {
    console.log(this.value);
    this.load();
  }

  delete(i: any) {
    this.rs.get(`project/${i}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.load();
      },
      (err) => {
        console.log('err:', err);
      }
    );
    this.load();
  }

  pageSizeChange(e: any) {
    this.pageSize = e;
    this.load();
  }

  pageIndexChange(e: any) {
    this.pageIndex = e;
    this.load();
  }

  load() {
    let query;

    query = {
      limit: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
    };

    this.value ? (query = {...query, keyword: {id: this.value, name: this.value}}) : '';
    this.rs.post('project/search', query).subscribe(
      (res) => {
        this.projects = res.data;
        this.total = res.total;

      });
  }
}
