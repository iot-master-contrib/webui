import {Component, OnInit, Optional} from '@angular/core'; 
import {ActivatedRoute, Router, RouterLink} from '@angular/router'; 
import {RequestService} from '../../../request.service'; 
import {NzMessageService} from 'ng-zorro-antd/message'; 
import {NzModalRef, NzModalService, NzModalModule} from 'ng-zorro-antd/modal'; 
import {CommonModule} from '@angular/common'; 
import {
  ParamSearch,
  TableViewButton,
  TableViewColumn,
  TableViewComponent,
  TableViewOperator,
} from '../../../components/table-view/table-view.component';
@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [
    CommonModule, 
    TableViewComponent, 
  ],
  templateUrl: './spaces.component.html',
  styleUrl: './spaces.component.scss',
})
export class SpacesComponent implements OnInit {
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  spaces: any = [];

  project_id: any = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rs: RequestService,
    private msg: NzMessageService,
    @Optional() protected ref: NzModalRef
  ) {
  }

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
    }
   
  }

  

  load(query?: any) { 
    if (this.project_id)
    query.filter = {project_id: this.project_id}
    if (this.value) query.keyword = { id: this.value, name: this.value };
    this.loading = true;
    this.rs
      .post('space/search', query)
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
    { icon: 'plus', text: '创建', link: `/admin/space/create` },
  ];

  columns: TableViewColumn[] = [
    {
      key: 'id',
      sortable: true,
      text: 'ID',
      keyword: true,
      link: (data) => `/admin/space/${data.id}`,
    },
    { key: 'name', sortable: true, text: '名称', keyword: true },
    {
      key: 'project_id',
      sortable: true,
      text: '项目',
      keyword: true,
      link: (data) => `/admin/project/${data.project_id}`,
    },
    { key: 'created', sortable: true, text: '创建时间', date: true },
  ];

  columns2: TableViewColumn[] = [
    { key: 'id', text: 'ID', keyword: true },
    { key: 'name', text: '名称', keyword: true },
  ];

  operators: TableViewOperator[] = [
    {
      icon: 'edit',
      title: '编辑',
      link: (data) => `/admin/space/${data.id}/edit`,
    },
    {
      icon: 'delete',
      title: '删除',
      confirm: '确认删除？',
      action: (data) => {
        this.rs.get(`space/${data.id}/delete`).subscribe((res) => { 
          this.load({})
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
    this.load(query)
  }
}
