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
import {WebViewComponent} from "../../../components/web-view/web-view.component";
import {ProductPropertyEditComponent} from "../product-property-edit/product-property-edit.component";
import {ProductEventEditComponent} from "../product-event-edit/product-event-edit.component";
import {ProductActionEditComponent} from "../product-action-edit/product-action-edit.component";
import {ProductMapperEditComponent} from "../product-mapper-edit/product-mapper-edit.component";
import {ProductPollerEditComponent} from "../product-poller-edit/product-poller-edit.component";

@Component({
    selector: 'app-version-edit',
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
        ProductPropertyEditComponent,
        ProductEventEditComponent,
        ProductActionEditComponent,
        ProductMapperEditComponent,
        ProductPollerEditComponent,
    ],
    templateUrl: './version-edit.component.html',
    styleUrl: './version-edit.component.scss'
})
export class VersionEditComponent implements OnInit {
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

    ngOnInit(): void {
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
}
