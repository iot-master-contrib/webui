import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { batchdel, onAllChecked, onItemChecked } from '../../../../public';
import { RequestService } from '../../../request.service';
import { BatchBtnComponent } from '../../modals/batch-btn/batch-btn.component';
import { SearchFormComponent } from '../../modals/search-form/search-form.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { Location } from '@angular/common'; 
@Component({
  selector: 'app-project-edit-plugin',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzPopconfirmModule,
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
  templateUrl: './project-edit-plugin.component.html',
  styleUrl: './project-edit-plugin.component.scss'
})
export class ProjectEditPluginComponent {
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
  id!:any
  constructor(
    private modal: NzModalService,
    private router: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    
    if (this.route.snapshot.paramMap.has('id')) {
      this.id=this.route.snapshot.paramMap.get('id') 
    }
  }

  reload() {
    this.datum = [];
    this.load();
  }

  load() {
    this.loading = true;
    this.rs
      .post('plugin/search', this.query)
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
    .post(`project/${this.id}/plugin/${id}`, {})
    .subscribe((res) => { 
      this.msg.success('绑定插件'+id);
    })
    .add(() => {
      this.loading = false;
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
