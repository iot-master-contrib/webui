import { Component, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
// import { ParseTableQuery } from '../../base/table'; 
   import { isIncludeAdmin, tableHeight, onAllChecked, onItemChecked, batchdel, refreshCheckedStatus, readCsv } from '../../../../../public';
// import { UserEditComponent } from "../user-edit/user-edit.component";
import { SearchFormComponent } from '../../../modals/search-form/search-form.component';
import { BatchBtnComponent } from '../../../modals/batch-btn/batch-btn.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@Component({
  selector: 'app-user',
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
    FormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() show: Boolean=false;
  id!:any
  href!: string;
  loading = true;
  uploading: Boolean = false;
  datum: any[] = [];
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  query: any = {};
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  delResData: any = [];
  constructor(
    private modal: NzModalService,
    private router: Router,
    private rs: RequestService,
    private msg: NzMessageService, 
    private route: ActivatedRoute,
  ) {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id=this.route.snapshot.paramMap.get('id') 
      
    }
    //this.load();
  }

  reload() {
    this.datum = [];
    this.load();
  }

  load() {
    this.loading = true;
    this.rs
      .post('user/search', this.query)
      .subscribe((res) => {
        this.datum = res.data || [];
        this.total = res.total;
        this.setOfCheckedId.clear();
        // refreshCheckedStatus(this);
      })
      .add(() => {
        this.loading = false;
      });
  }

  create() {
    let path = '/user/create';
    if (location.pathname.startsWith('/admin')) path = '/admin' + path;
    this.router.navigateByUrl(path);
  }
  submit(id: number, size?: number) {
    this.rs
    .post(`project/${this.id}/user/${id}`, {})
    .subscribe((res) => { 
      this.msg.success('绑定用户'+id);
    })
    .add(() => {
      this.loading = false;
    });
    
   
  }
  delete(id: number, size?: number) {
    this.rs.get(`user/${id}/delete`).subscribe((res) => {
      if (!size) {
        this.msg.success('删除成功');
        this.datum = this.datum.filter((d) => d.id !== id);
      } else if (size) {
        this.delResData.push(res);
        if (size === this.delResData.length) {
          this.msg.success('删除成功');
          this.load();
        }
      }
    });
  }
  handleExport() {
    this.href = `/api/user/export`;
  }
 
  onQuery($event: NzTableQueryParams) {
    // ParseTableQuery($event, this.query);
    this.load();
  }
  pageIndexChange(pageIndex: number) {
    this.query.skip = pageIndex - 1;
  }
  pageSizeChange(pageSize: number) {
    this.query.limit = pageSize;
  }
  search($event: string) {
    this.query.keyword = {
      name: $event,
    };
    this.query.skip = 0;
    this.load();
  }
  handleEdit(id?: string) {
    id?
    this.router.navigateByUrl('admin/user/edit/' +  id):
    this.router.navigateByUrl('admin/user/create'  );
    // const nzTitle = id ? "编辑用户" : "新增用户";
    // const modal: NzModalRef = this.modal.create({
    //   nzTitle,
    //   nzStyle: { top: '20px' },
    //   nzContent: UserEditComponent,
    //   nzMaskClosable: false,
    //   nzComponentParams: { id },
    //   nzFooter: [
    //     {
    //       label: '取消',
    //       onClick: () => {
    //         modal.destroy();
    //       }
    //     },
    //     {
    //       label: '保存',
    //       type: 'primary',
    //       onClick: componentInstance => {
    //         componentInstance!.submit().then(() => {
    //           modal.destroy();
    //           this.load();
    //         }, () => { })
    //       }
    //     }
    //   ]
    // });
  }
  cancel() {
    this.msg.info('取消操作');
  }
  // getTableHeight() {
  //   return tableHeight(this);
  // }
  handleBatchDel() {
     batchdel(this);
  }
  handleAllChecked(id: any) {
      onAllChecked(id, this);
  }
  handleItemChecked(id: number, checked: boolean) {
     onItemChecked(id, checked, this);
  }
  
}
