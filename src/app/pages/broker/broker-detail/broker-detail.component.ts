import {Component, OnInit} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {RequestService, SmartInfoComponent, SmartInfoItem} from 'iot-master-smart';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {DevicesComponent} from "../../device/devices/devices.component";


@Component({
    selector: 'app-broker-detail',
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
    templateUrl: './broker-detail.component.html',
    styleUrl: './broker-detail.component.scss'
})
export class BrokerDetailComponent implements OnInit {
    id!: any;

    data: any = {};

    loading = false;

    fields: SmartInfoItem[] = [
        {key: 'id', label: 'ID'},
        {key: 'name', label: '名称'},
        {key: 'port', label: '端口'},
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
        this.rs.post('broker/search', {filter: {id: this.id}}).subscribe((res) => {
            this.data = res.data[0];
        }).add(() => this.loading = false);
    }

    delete() {
        this.rs.get(`broker/${this.id}/delete`, {}).subscribe((res) => {
            this.msg.success('删除成功');
            this.router.navigateByUrl(`/admin/broker`);
        });

    }
}
