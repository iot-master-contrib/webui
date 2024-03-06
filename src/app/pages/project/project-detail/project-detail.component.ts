import {Component, OnInit} from '@angular/core';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective,
} from 'ng-zorro-antd/page-header';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
} from 'ng-zorro-antd/descriptions';
import {CommonModule, DatePipe, NgForOf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective,
} from 'ng-zorro-antd/table';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {SearchFormComponent} from '../../../components/search-form/search-form.component';
import {BatchBtnComponent} from '../../../modals/batch-btn/batch-btn.component';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartInfoComponent, SmartInfoItem} from "../../../../../projects/smart/src/lib/smart-info/smart-info.component";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    SmartInfoComponent,
    NzDividerComponent,
    NzRowDirective,
    NzColDirective,
    NzStatisticComponent,
    NzCardComponent,
    NzSpaceComponent,
    NzButtonComponent,
    NzSpaceItemDirective,
    RouterLink,
    NzPopconfirmDirective,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  id!: any;

  value = '';

  data: any = {};

  spaces: any[] = []

  fields: SmartInfoItem[] = [
    {label: 'ID', key: 'id'},
    {label: '名称', key: 'name'},
    {label: '版本', key: 'version'},
    {label: '创建时间', key: 'created', type: 'date'},
    {label: '说明', key: 'description', span: 2},
  ];

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.id = this.route.parent?.snapshot.paramMap.get('project');
      this.load();
      this.loadSpaces();
      return;
    }
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
      this.loadSpaces()
    }
  }

  load() {
    this.rs.get(`project/${this.id}`).subscribe(
      (res: any) => {
        this.data = res.data;
      },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }

  loadSpaces() {
    this.rs.post(`space/search`, {
      limit: 999999, skip: 0,
      filter: {project_id: this.id}
    }).subscribe(
      (res: any) => {
        if (res.data) {
          this.spaces = res.data;
        }
      });
  }

  delete() {
    this.rs.get(`project/${this.id}/delete`, {}).subscribe(
      (res: any) => {
        this.msg.success('删除成功');
        this.router.navigateByUrl('admin');
      });
    this.load();
  }


  deleteSpace(e: any) {
    this.rs.get(`space/${e}/delete`, {}).subscribe(
      (res: any) => {
        this.msg.success('删除成功');
        this.load();
      });
    this.load();
  }

  open(s: any) {
    this.router.navigateByUrl('/admin/space/' + s.id)
  }
}
