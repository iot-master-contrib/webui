import {Component, Inject, Optional, signal} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef, NzModalService,} from 'ng-zorro-antd/modal';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';

import {SearchFormComponent} from '../../../components/search-form/search-form.component';
import {BatchBtnComponent} from '../../../modals/batch-btn/batch-btn.component';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {RequestService} from "../../../request.service";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {UsersComponent} from "../../users/users/users.component";
import {
  ParamSearch,
  TableViewButton,
  TableViewColumn,
  TableViewComponent,
  TableViewOperator
} from "../../../components/table-view/table-view.component";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-project-user',
  standalone: true,
  imports: [NzPopconfirmModule,
    NzIconModule,
    CommonModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    BatchBtnComponent,
    SearchFormComponent,
    NzSpaceModule,
    NzUploadModule,
    NzInputModule,
    FormsModule, RouterLink, NzPaginationComponent, NzButtonComponent, TableViewComponent,
  ],
  templateUrl: './project-user.component.html',
  styleUrl: './project-user.component.scss',
})
export class ProjectUserComponent {
  //从Modal中传参过来
  //readonly data: any = inject(NZ_MODAL_DATA, {optional:true});
  project_id: any = '';


  datum: any[] = [];
  total = 0;
  loading = false;


  buttons: TableViewButton[] = [
    {icon: 'link', text: '绑定用户', action: () => this.bind()}, //应该只有平台管理员可以操作吧
  ];

  columns: TableViewColumn[] = [
    {key: 'user_id', sortable: true, text: 'ID', keyword: true},
    {key: 'user', sortable: true, text: '名称', keyword: true},
    {key: 'disabled', sortable: true, text: '状态'},
    {key: 'created', sortable: true, text: '创建时间', date: true},
  ];

  columnsSelect: TableViewColumn[] = [
    {key: 'user_id', sortable: true, text: 'ID', keyword: true},
    {key: 'user', sortable: true, text: '名称', keyword: true},
    {key: 'disabled', sortable: true, text: '状态'},
  ];

  operators: TableViewOperator[] = [
    {icon: 'disconnect', text: '解绑', confirm: '确认解绑？', action: (data) => this.unbind(data.user_id)},
  ];

  operatorsSelect: TableViewOperator[] = [
    {text: '选择', action: (data) => this.ref.close(data)},
  ];

  constructor(private route: ActivatedRoute,
              private rs: RequestService,
              private msg: NzNotificationService,
              private ms: NzModalService,
              @Optional() protected ref: NzModalRef,
              @Optional() @Inject(NZ_MODAL_DATA) protected data: any
  ) {
    this.project_id = data?.project_id;
  }

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
      //console.log("project_id", this.project_id)
    }
  }

  query!: ParamSearch

  refresh() {
    this.search(this.query)
  }

  search(query: ParamSearch) {
    //console.log('onQuery', query)
    this.query = query

    if (this.project_id)
      query.filter['project_id'] = this.project_id;

    this.loading = true;
    this.rs.get(`project/${this.project_id}/user`).subscribe((res) => {
      this.datum = res.data;
      //this.total = res.data.length
    }).add(() => this.loading = false);
    // this.rs.post('gateway/search', query).subscribe((res) => {
    //   this.datum = res.data;
    //   this.total = res.total;
    // }).add(() => this.loading = false);
  }

  bind() {
    this.ms.create({
      nzTitle: '绑定用户',
      nzContent: UsersComponent,
    }).afterClose.subscribe(res => {
      if (!res) return
      this.rs.get(`project/${this.project_id}/user/${res.id}/bind`, {}).subscribe((res) => {
        this.msg.success('提示', '绑定成功');
        this.refresh();
      });
    })
  }

  unbind(i: any) {
    this.rs.get(`project/${this.project_id}/user/${i}/unbind`, {}).subscribe((res) => {
      this.msg.success('提示', '解绑成功');
      this.refresh();
    });
  }
}
