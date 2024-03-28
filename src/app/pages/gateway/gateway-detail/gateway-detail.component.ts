import {Component, OnInit} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartInfoComponent, SmartInfoItem} from "../../../../../projects/smart/src/lib/smart-info/smart-info.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {DevicesComponent} from "../../device/devices/devices.component";

@Component({
    selector: 'app-gateway-detail',
    standalone: true,
    imports: [
        CommonModule,
        SmartInfoComponent,
        NzCardComponent,
        NzSpaceComponent,
        NzSpaceItemDirective,
        NzButtonComponent,
        RouterLink,
        NzPopconfirmDirective,
        NzTabsModule,
        DevicesComponent,
    ],
    templateUrl: './gateway-detail.component.html',
    styleUrl: './gateway-detail.component.scss'
})
export class GatewayDetailComponent implements OnInit {
    base = '/admin'
    id!: any;

    data: any = {};

    loading = false;

    fields: SmartInfoItem[] = [
        {key: 'id', label: 'ID'},
        {key: 'name', label: '名称'},
        {
            key: 'project', label: '项目', type: 'link',
            link: () => `${this.base}/project/${this.data.project_id}`,
        },
        {key: 'username', label: '用户名'},
        {key: 'password', label: '密码'},
        {key: 'created', label: '创建时间', type: 'date'},
        {key: 'description', label: '说明', span: 2},
    ];

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
        }
    }

    load() {
        this.loading = true
        this.rs.post('gateway/search', {filter: {id: this.id}}).subscribe((res) => {
            this.data = res.data[0];
        }).add(() => this.loading = false);
    }

    delete() {
        this.rs.get(`gateway/${this.id}/delete`, {}).subscribe((res) => {
            this.msg.success('删除成功');
            this.router.navigateByUrl(`${this.base}/gateway`);
        });

    }
}
