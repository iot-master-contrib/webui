import {Component, Optional} from '@angular/core';
import {NzModalRef,} from 'ng-zorro-antd/modal';
import { Router, RouterLink} from '@angular/router';
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

@Component({
  selector: 'app-users',
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
    FormsModule, RouterLink, NzPaginationComponent, NzButtonComponent,
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
    this.load();
  }

  refresh() {
    this.pageIndex = 1;
    this.load();
  }

  open(p: any) {
    this.route.navigateByUrl('admin/user/' + p.id);
  }

  select(id: any) {
    this.ref && this.ref.close(id);
  }

  edit(p: any) {
    this.route.navigateByUrl('admin/user/' + p.id + '/edit');
  }

  search() {
    console.log(this.value);
    this.load();
  }

  delete(i: any) {
    this.rs.get(`user/${i}/delete`, {}).subscribe(
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

    this.value ? (query = {...query, filter: {id: this.value}}) : '';
    this.rs.post('user/search', query).subscribe(
      (res) => {
        this.users = res.data;
        this.total = res.total;

      });
  }
}
