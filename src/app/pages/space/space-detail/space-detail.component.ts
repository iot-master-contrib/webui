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

@Component({
  selector: 'app-space-detail',
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
  ],
  templateUrl: './space-detail.component.html',
  styleUrl: './space-detail.component.scss'
})
export class SpaceDetailComponent implements OnInit {
  isVisible = false;
  id!: any;
  total = 0;
  query: any = {limit: 20, skip: 0};

  pageIndex = 1;
  pageSize = 10;
  value = '';
  data: any = {
    id: 1,
    name: '默认空间',
    description: '',

    created: new Date(),
  };


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
      this.query.filter = {project_id: this.id};
      this.load();
    }
  }

  load() {
    this.rs.get(`space/${this.id}`).subscribe((res: any) => {
      this.data = res.data;
    });
  }

  delete() {
    this.rs.get(`space/${this.id}/delete`, {}).subscribe((res: any) => {
      this.msg.success('删除成功');
      this.router.navigateByUrl('admin');
    });
    this.load();
  }

}
