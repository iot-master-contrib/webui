import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    ParamSearch,
    RequestService,
    SmartTableButton,
    SmartTableColumn,
    SmartTableComponent,
    SmartTableOperator
} from 'iot-master-smart';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {GetParentRouteParam, GetParentRouteUrl} from "../../../app.routes";

@Component({
    selector: 'app-spaces',
    standalone: true,
    imports: [
        CommonModule,
        SmartTableComponent,
    ],
    templateUrl: './spaces.component.html',
    styleUrl: './spaces.component.scss',
})
export class SpacesComponent implements OnInit {
    base = '/admin'
    @Input() project_id: any = '';


    datum: any[] = [];
    total = 0;
    loading = false;


    buttons: SmartTableButton[] = [
        {icon: 'plus', label: '创建', link: () => `${this.base}/space/create`},
    ];

    columns: SmartTableColumn[] = [
        {
            key: 'id', sortable: true, label: 'ID', keyword: true,
            link: (data) => `${this.base}/space/${data.id}`,
        },
        {key: 'name', sortable: true, label: '名称', keyword: true},
        {
            key: 'project', sortable: true, label: '项目', keyword: true,
            link: (data) => `${this.base}/project/${data.project_id}`,
        },
        {key: 'created', sortable: true, label: '创建时间', date: true},
    ];

    columnsSelect: SmartTableColumn[] = [
        {key: 'id', label: 'ID', keyword: true},
        {key: 'name', label: '名称', keyword: true},
    ];

    operators: SmartTableOperator[] = [
        {icon: 'edit', title: '编辑', link: (data) => `${this.base}/space/${data.id}/edit`,},
        {
            icon: 'delete', title: '删除', confirm: '确认删除？',
            action: (data) => {
                this.rs.get(`space/${data.id}/delete`).subscribe((res) => this.refresh())
            },
        },
    ];

    operatorsSelect: SmartTableOperator[] = [
        {label: '选择', action: (data) => this.ref.close(data)},
    ];

    constructor(private route: ActivatedRoute,
                private rs: RequestService,
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
        this.rs.post('space/search', query).subscribe((res) => {
            this.datum = res.data;
            this.total = res.total;
        }).add(() => this.loading = false);
    }
}
