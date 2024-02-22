import {Component, Optional} from '@angular/core';
import {NzModalRef,} from 'ng-zorro-antd/modal';
import {Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message'; 
import {CommonModule} from '@angular/common'; 
import {RequestService} from "../../../request.service"; 
import {
  ParamSearch,
  TableViewButton,
  TableViewColumn,
  TableViewComponent,
  TableViewOperator,
} from '../../../components/table-view/table-view.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ 
    CommonModule,  TableViewComponent,  
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  users: any = [];

  constructor(
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    @Optional() protected ref: NzModalRef,
  ) {
  }

  ngOnInit(): void {
    
  }

    
  load(query?: any) {  
    if (this.value) query.keyword = { id: this.value, name: this.value };
    this.loading = true;
    this.rs
      .post('user/search', query)
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
    { icon: 'plus', text: '创建', link: `/admin/user/create` },
  ];

  columns: TableViewColumn[] = [
    {
      key: 'id',
      sortable: true,
      text: 'ID',
      keyword: true, 
    },
    { key: 'name', sortable: true, text: '姓名', keyword: true },
    {
      key: 'cellphone',
      sortable: true,
      text: '手机',
      keyword: true, 
    },{
      key: 'email',
      sortable: true,
      text: '邮箱',
      keyword: true, 
    },{
      key: 'disabled',
      sortable: true,
      text: '状态',
      keyword: true, 
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
      link: (data) => `/admin/user/${data.id}/edit`,
    },
    {
      icon: 'delete',
      title: '删除',
      confirm: '确认删除？',
      action: (data) => {
        this.rs.get(`user/${data.id}/delete`).subscribe((res) => {
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
    this.load(query)
  }
 
   

  
 

}
