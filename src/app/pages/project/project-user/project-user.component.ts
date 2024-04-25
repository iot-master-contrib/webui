import {Component, Inject, Input, Optional} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef, NzModalService,} from 'ng-zorro-antd/modal';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
    ParamSearch,
    RequestService,
    SmartTableButton,
    SmartTableColumn,
    SmartTableComponent,
    SmartTableOperator
} from "iot-master-smart";
import {UsersComponent} from "../../users/users/users.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {GetParentRouteParam, GetParentRouteUrl} from "../../../app.routes";

@Component({
    selector: 'app-project-user',
    standalone: true,
    imports: [
        CommonModule,
        SmartTableComponent,
    ],
    templateUrl: './project-user.component.html',
    styleUrl: './project-user.component.scss',
})
export class ProjectUserComponent {
    base = '/admin'
    @Input() project_id: any = '';


    datum: any[] = [];
    total = 0;
    loading = false;


    buttons: SmartTableButton[] = [
        {icon: 'link', label: '绑定用户', action: () => this.bind()}, //应该只有平台管理员可以操作吧
    ];

    columns: SmartTableColumn[] = [
        {key: 'user_id', sortable: true, label: 'ID', keyword: true},
        {key: 'user', sortable: true, label: '名称', keyword: true},
        {key: 'disabled', sortable: true, label: '状态'},
        {key: 'created', sortable: true, label: '创建时间', date: true},
    ];

    columnsSelect: SmartTableColumn[] = [
        {key: 'user_id', sortable: true, label: 'ID', keyword: true},
        {key: 'user', sortable: true, label: '名称', keyword: true},
        {key: 'disabled', sortable: true, label: '状态'},
    ];

    operators: SmartTableOperator[] = [
        {icon: 'disconnect', label: '解绑', confirm: '确认解绑？', action: (data) => this.unbind(data.user_id)},
    ];

    operatorsSelect: SmartTableOperator[] = [
        {label: '选择', action: (data) => this.ref.close(data)},
    ];

    constructor(private route: ActivatedRoute,
                private rs: RequestService,
                private msg: NzNotificationService,
                private ms: NzModalService,
                @Optional() protected ref: NzModalRef,
                @Optional() @Inject(NZ_MODAL_DATA) protected data: any
    ) {
        this.project_id = data?.project_id;
    }

    ngOnInit(): void {
        this.base = GetParentRouteUrl(this.route)
        this.project_id ||= GetParentRouteParam(this.route, "project")
    }

    query!: ParamSearch

    refresh() {
        this.search(this.query)
    }

    search(query: ParamSearch) {
        //console.log('onQuery', query)
        this.query = query

        if (this.project_id)
            query.filter['project_id'] = this.project_id;

        this.loading = true;
        this.rs.get(`project/${this.project_id}/user/list`).subscribe((res) => {
            this.datum = res.data;
            //this.total = res.data.length
        }).add(() => this.loading = false);
        // this.rs.post('user/search', query).subscribe((res) => {
        //   this.datum = res.data;
        //   this.total = res.total;
        // }).add(() => this.loading = false);
    }

    bind() {
        this.ms.create({
            nzTitle: '绑定用户',
            nzContent: UsersComponent,
        }).afterClose.subscribe(res => {
            if (!res) return
            this.rs.get(`project/${this.project_id}/user/${res.id}/bind`, {}).subscribe((res) => {
                this.msg.success('提示', '绑定成功');
                this.refresh();
            });
        })
    }

    unbind(i: any) {
        this.rs.get(`project/${this.project_id}/user/${i}/unbind`, {}).subscribe((res) => {
            this.msg.success('提示', '解绑成功');
            this.refresh();
        });
    }
}
