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
import {DevicesComponent} from "../../device/devices/devices.component";
import {SpaceDeviceComponent} from "../space-device/space-device.component";

@Component({
    selector: 'app-space-detail',
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
        DevicesComponent,
        SpaceDeviceComponent,
    ],
    templateUrl: './space-detail.component.html',
    styleUrl: './space-detail.component.scss'
})
export class SpaceDetailComponent implements OnInit {
    base = '/admin'
    project_id!: any;

    id!: any;

    value = '';

    data: any = {};

    spaces: any[] = []

    fields: SmartInfoItem[] = [
        {label: 'ID', key: 'id'},
        {label: '名称', key: 'name'},
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
            this.project_id = this.route.parent.snapshot.paramMap.get('project');
            this.base = `/project/${this.project_id}`
        }
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            //this.query.filter = {project_id: this.id};
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
            this.router.navigateByUrl(`${this.base}/space`);
        });
    }
}
