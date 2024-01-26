import { Component, OnInit, Optional } from '@angular/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NgForOf } from '@angular/common';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { Router, RouterLink } from '@angular/router';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzAffixComponent } from 'ng-zorro-antd/affix';
import { RequestService } from '../../../request.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzModalRef, NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import {NzEmptyComponent} from "ng-zorro-antd/empty";
@Component({
  selector: 'app-spaces',
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

  constructor(
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    private ms: NzModalService,
    @Optional() protected ref: NzModalRef
  ) {}
  ngOnInit(): void {
    this.load();
  }
  refresh() {
    this.pageIndex = 1;
    this.load();
  }
  open(p: any) {
    this.route.navigateByUrl('admin/space/' + p.id);
  }
  select(id: any) {
    this.ref && this.ref.close(id);
  }

  edit(p: any) {
    this.route.navigateByUrl('admin/space/' + p.id + '/edit');
  }
  search() {
    console.log(this.value);
    this.load();
  }
  delete(i: any) {
    this.rs.get(`space/${i}/delete`, {}).subscribe(
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
  create() {
    this.rs.post(`space/create`, {}).subscribe((res) => {
      this.load()
      this.msg.success('保存成功');
    });
    // const modal: NzModalRef = this.ms.create({
    //   nzTitle: '创建项目',
    //   nzContent: CreateComponent,
    //   nzData: {
    //     name: 'space',
    //   },
    //   nzMaskClosable: false,
    //   nzFooter: [
    //     {
    //       label: '取消',
    //       onClick: () => {
    //         modal.destroy();
    //       },
    //     },
    //     {
    //       label: '保存',
    //       type: 'primary',
    //       onClick: (rs: any) => {
    //         rs!.submit().then(
    //           () => {
    //             modal.destroy();
    //             this.load();
    //           },
    //           () => {}
    //         );
    //       },
    //     },
    //   ],
    // });
  }
  load() {
    let query;

    query = {
      limit: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
    };

    this.value ? (query = { ...query, filter: { id: this.value } }) : '';
    this.rs.post('space/search', query).subscribe(
      (res) => {
        let spaces = res.data;
        this.spaces = res.data;
        this.total = res.total;

      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
