import {Component, OnInit} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {RequestService, SmartInfoComponent, SmartInfoItem} from 'iot-master-smart';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {DevicePropertyComponent} from "../device-property/device-property.component";
import {GetParentRouteUrl} from "../../../app.routes";

@Component({
    selector: 'app-device-detail',
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
        NzSpaceItemDirective,
        NzButtonComponent,
        RouterLink,
        NzPopconfirmDirective,
        NzTabsModule,
        DevicePropertyComponent,
    ],
    templateUrl: './device-detail.component.html',
    styleUrl: './device-detail.component.scss',
})
export class DeviceDetailComponent implements OnInit {
    base = '/admin'

    id!: any;
    data: any = {};

    fields: SmartInfoItem[] = [
        {key: 'id', label: 'ID'},
        {key: 'name', label: '名称'},
        {
            key: 'product', label: '产品', type: 'link',
            link: () => `${this.base}/product/${this.data.product_id}`,
        },
        {
            key: 'project', label: '项目', type: 'link',
            link: () => `${this.base}/project/${this.data.project_id}`,
        },
        //{key: 'online',  label: '上线时间', type: 'date'},
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

    loading = false;

    ngOnInit(): void {
        this.base = GetParentRouteUrl(this.route)

        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.load();
        }
    }

    load() {
        this.loading = true
        this.rs.post('device/search', {filter: {id: this.id}}).subscribe((res) => {
            this.data = res.data[0];
        }).add(() => this.loading = false);
    }

    delete() {
        this.rs.get(`device/${this.id}/delete`, {}).subscribe((res) => {
            this.msg.success('删除成功');
            this.router.navigateByUrl(`${this.base}/device`);
        });
    }
}
