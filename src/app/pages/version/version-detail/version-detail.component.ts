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
import {WebViewComponent} from "../../../components/web-view/web-view.component";
import {VersionPropertyComponent} from "../version-property/version-property.component";
import {VersionEventComponent} from "../version-event/version-event.component";
import {VersionActionComponent} from "../version-action/version-action.component";
import {PluginPagesComponent} from "../../../components/plugin-pages/plugin-pages.component";

@Component({
    selector: 'app-version-detail',
    standalone: true,
    imports: [
        CommonModule,
        SmartInfoComponent,
        NzCardComponent,
        NzSpaceComponent,
        NzButtonComponent,
        NzSpaceItemDirective,
        RouterLink,
        NzPopconfirmDirective,
        NzTabsModule,
        WebViewComponent,
        VersionPropertyComponent,
        VersionEventComponent,
        VersionActionComponent,
        PluginPagesComponent,
    ],
    templateUrl: './version-detail.component.html',
    styleUrl: './version-detail.component.scss'
})
export class VersionDetailComponent implements OnInit {
    base = '/admin'
    project_id!: any;

    id!: any;
    version!: any;

    value = '';

    data: any = {};

    fields: SmartInfoItem[] = [
        {label: 'ID', key: 'id'},
        {label: '名称', key: 'name'},
        {label: '关键字', key: 'keywords', type: 'tags'},
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

    plugins: any[] = [];

    ngOnInit(): void {
        if (this.route.parent?.snapshot.paramMap.has('project')) {
            this.project_id = this.route.parent.snapshot.paramMap.get('project');
            this.base = `/project/${this.project_id}`
        }
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.load()
        }
        if (this.route.snapshot.paramMap.has('version')) {
            this.version = this.route.snapshot.paramMap.get('version');
        }
    }

    load() {
        this.rs.get(`product/${this.id}`, {}).subscribe((res) => {
                this.data = res.data
            }
        );
    }

    delete() {
        this.rs.get(`product/${this.id}/version/${this.version}/delete`, {}).subscribe((res) => {
            this.msg.success('删除成功');
            this.router.navigateByUrl(`admin/product/${this.id}`);
        });
        this.load();
    }
}
