import { Component, OnInit } from '@angular/core';
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
import { CreateComponent } from '../../modals/create/create.component';
import { NzModalRef, NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  projects: any[] = [
    // { id: 1, name: '第一人民医院', description: '放射科室' },
    // { id: 2, name: '中医院', description: '放射科室' },
    // { id: 3, name: '第五人民医院', description: '放射科室' },
    // { id: 4, name: '协和医院', description: '放射科室' },
  ];

  constructor(
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    private ms: NzModalService
  ) {}
  ngOnInit(): void {
    this.load();
  }
  refresh() {
    this.nzPageIndex = 1;
    this.load();
  }
  open(p: any) {
    this.route.navigateByUrl('admin/project/' + p.id);
  }

  edit(p: any) {
    this.route.navigateByUrl('admin/project/' + p.id + '/edit');
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
  nzPageSizeChange(e: any) {
    this.nzPageSize = e;
    this.load();
  }
  nzPageIndexChange(e: any) {
    this.nzPageIndex = e;
    this.load();
  }
  create() {
    const modal: NzModalRef = this.ms.create({
      nzTitle: '创建项目',
      nzContent: CreateComponent,
      nzData: {
        name: 'project',
      },
      nzMaskClosable: false,
      nzFooter: [
        {
          label: '取消',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: '保存',
          type: 'primary',
          onClick: (rs: any) => {
            rs!.submit().then(
              () => {
                modal.destroy();
                this.load();
              },
              () => {}
            );
          },
        },
      ],
    });
  }
  load() {
    let query;

    query = {
      limit: this.nzPageSize,
      skip: (this.nzPageIndex - 1) * this.nzPageSize,
    };

    this.value ? (query = { ...query, filter: { id: this.value } }) : '';
    this.rs.post('project/search', query).subscribe(
      (res) => {
        let projects = res.data;
        this.projects = res.data;
        this.total = res.total;
        projects.filter((item: any, index: any) => {
          this.rs.get(`project/${item.id}/manifest`, {}).subscribe(
            (mes) => {
              if (res.data) {
                projects[index] = { ...projects, ...mes.data };

                console.log(projects[index]);
              }
            },
            (err) => {
              console.log('err:', err);
            }
          );
        });
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
