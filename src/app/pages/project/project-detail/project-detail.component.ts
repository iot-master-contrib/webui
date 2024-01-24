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
import {DatePipe, NgForOf} from '@angular/common';
import {PluginsComponent} from '../../../components/plugins/plugins.component';
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
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {SearchFormComponent} from '../../../components/search-form/search-form.component';
import {BatchBtnComponent} from '../../../modals/batch-btn/batch-btn.component';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    SearchFormComponent,
    BatchBtnComponent,
    NzSelectModule,
    NzPageHeaderComponent,
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderExtraDirective,
    NzSpaceComponent,
    NzSpaceItemDirective,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    DatePipe,
    PluginsComponent,
    RouterLink,
    NzPopconfirmDirective,
    NgForOf,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzPaginationComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    NzDividerComponent,
    NzRowDirective,
    NzColDirective,
    NzStatisticComponent,
    NzListComponent,
    NzListItemComponent,
    NzCardComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  id!: any;

  value = '';

  data: any = {
    id: 1,
    name: '人民医院',
    description: '人民医院智慧大屏项目',
    version: '3',
    keywords: ['医院'],
    icon: '',
    url: 'https://www.baidu.com',
    created: new Date(),
  };

  plugins: any[] = [
    {
      id: 'scene',
      name: '智慧场景',
      icon: 'assets/app.png',
      description: '智慧场景，联动控制',
    },
    {
      id: 'screen',
      name: '数据大屏',
      icon: 'assets/app.png',
      description: '',
    },
  ];

  spaces: any[] = []

  space: any[] = [
    {id: 1, name: '1号', product: '温度计', alias: 't1', online: new Date()},
    {id: 2, name: '2号', product: '温度计', alias: 't2', online: new Date()},
    {id: 3, name: '3号', product: '温度计', alias: 't3', online: new Date()},
    {id: 4, name: '4号', product: '温度计', alias: 't4', online: new Date()},
  ];


  deviceOption!: any;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
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
      },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }

  delete() {
    this.rs.get(`project/${this.id}/delete`, {}).subscribe(
      (res: any) => {
        this.msg.success('删除成功');
        this.router.navigateByUrl('admin');
      },
      (err: any) => {
        console.log('err:', err);
      }
    );
    this.load();
  }


  deleteSpace(e: any) {
    this.rs.get(`space/${e}/delete`, {}).subscribe(
      (res: any) => {
        this.msg.success('删除成功');
        this.load();
      },
      (err: any) => {
        console.log('err:', err);
      }
    );
    this.load();
  }

  open(s: any) {
    this.router.navigateByUrl('/admin/space/' + s.id)
  }
}
