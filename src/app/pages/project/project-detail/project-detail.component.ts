import {Component, OnInit} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartInfoComponent, SmartInfoItem} from "../../../../../projects/smart/src/lib/smart-info/smart-info.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {SpacesComponent} from "../../space/spaces/spaces.component";
import {DevicesComponent} from "../../device/devices/devices.component";
import {GatewaysComponent} from "../../gateway/gateways/gateways.component";
import {ProjectUserComponent} from "../project-user/project-user.component";

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
        NzTabsModule,
        SpacesComponent,
        DevicesComponent,
        GatewaysComponent,
        ProjectUserComponent
    ],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
    project_id!: any;
    id!: any;

    value = '';

    data: any = {};

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
            this.project_id = this.id = this.route.parent?.snapshot.paramMap.get('project');
        }
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
        }
        this.load();
    }

    load() {
        this.rs.get(`project/${this.id}`).subscribe((res: any) => {
            this.data = res.data;
        });
    }

    delete() {
        this.rs.get(`project/${this.id}/delete`, {}).subscribe((res: any) => {
            this.msg.success('删除成功');
            this.router.navigateByUrl('/project');
        });
    }
}
