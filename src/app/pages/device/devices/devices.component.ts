import {Component, inject, InjectFlags, OnInit, Optional} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormsModule} from '@angular/forms';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSpaceComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    RouterLink,
    NzPaginationComponent,
    NzSpaceItemDirective,
    NzTableModule,
    NgForOf,
    DatePipe,
    NzPopconfirmDirective,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent implements OnInit{
  base = '/admin/'

  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  devices: any = [];

  //从Modal中传参过来
  readonly data: any = inject(NZ_MODAL_DATA, {optional:true});
  project_id: any = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rs: RequestService,
    private msg: NzMessageService,
    @Optional() protected ref: NzModalRef,
    //@Optional() protected  data: NZ_MODAL_DATA
  ) {
  }

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
      this.base = '/project/' + this.project_id + '/'
    }
    if (this.data?.project_id) {
      this.project_id = this.data.project_id
    }

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
    this.rs.get(`device/${i}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.load();
      });
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
    let query: any;

    query = {
      limit: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
    };

    if (this.project_id)
      query.filter = {project_id: this.project_id}
    if (this.value)
      query.keyword = {id: this.value, name: this.value}

    this.rs.post('device/search', query).subscribe((res) => {
      this.devices = res.data;
      this.total = res.total;
    });
  }
}
