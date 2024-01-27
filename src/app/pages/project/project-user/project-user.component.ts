import {Component, Optional, signal} from '@angular/core';
import {NzModalRef, NzModalService,} from 'ng-zorro-antd/modal';
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
    FormsModule, RouterLink, NzPaginationComponent, NzButtonComponent,
  ],
  templateUrl: './project-user.component.html',
  styleUrl: './project-user.component.scss',
})
export class ProjectUserComponent {
  base = '/admin/'

  project_id: any = ''
  users: any = [];

  constructor(
    private route: ActivatedRoute,
    private rs: RequestService,
    private msg: NzMessageService,
    private ms: NzModalService,
  ) {
  }

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
      this.base = '/project/' + this.project_id + '/'
    }
    if (this.route.snapshot.paramMap.has('id')) {
      this.project_id = this.route.snapshot.paramMap.get('id');
      this.base = '/admin/'
    }
    this.load();
  }

  refresh() {
    this.load();
  }

  bind() {
    this.ms.create({
      nzTitle: '绑定用户',
      nzContent: UsersComponent,
    }).afterClose.subscribe(res => {
      if (!res) return
      this.rs.get(`project/${this.project_id}/user/${res.id}/bind`, {}).subscribe((res) => {
        this.msg.success('绑定成功');
        this.load();
      });
    })
  }

  unbind(i: any) {
    this.rs.get(`project/${this.project_id}/user/${i}/unbind`, {}).subscribe((res) => {
      this.msg.success('删除成功');
      this.load();
    });
  }

  load() {
    this.rs.get(`project/${this.project_id}/user`).subscribe((res) => {
      this.users = res.data;
    });
  }
}
