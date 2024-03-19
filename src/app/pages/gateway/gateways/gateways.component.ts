import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
    ParamSearch,
    SmartTableButton,
    SmartTableColumn,
    SmartTableComponent,
    SmartTableOperator,
} from '../../../../../projects/smart/src/lib/smart-table/smart-table.component';

@Component({
    selector: 'app-gateways',
    standalone: true,
    imports: [
        CommonModule,
        SmartTableComponent,
    ],
    templateUrl: './gateways.component.html',
    styleUrl: './gateways.component.scss',
})
export class GatewaysComponent implements OnInit {
    //从Modal中传参过来
    //readonly data: any = inject(NZ_MODAL_DATA, {optional:true});
    @Input() project_id: any = '';


    datum: any[] = [];
    total = 0;
    loading = false;


    buttons: SmartTableButton[] = [
        {icon: 'plus', label: '创建', link: () => `/admin/gateway/create`},
    ];

    buttonsProject: SmartTableButton[] = [
        {icon: 'plus', label: '创建', link: () => `/project/${this.project_id}/gateway/create`},
    ];

    columns: SmartTableColumn[] = [
        {key: 'id', sortable: true, label: 'ID', keyword: true, link: (data) => `/admin/gateway/${data.id}`},
        {key: 'name', sortable: true, label: '名称', keyword: true},
        {
            key: 'project',
            sortable: true,
            label: '项目',
            keyword: true,
            link: (data) => `/admin/project/${data.project_id}`
        },
        {key: 'online', sortable: true, label: '上线时间', date: true},
    ];

    columnsProject: SmartTableColumn[] = [
        {
            key: 'id', sortable: true, label: 'ID', keyword: true,
            link: (data) => `/project/${this.project_id}/gateway/${data.id}`
        },
        {key: 'name', sortable: true, label: '名称', keyword: true},
        {key: 'online', sortable: true, label: '上线时间', date: true},
    ];


    columnsSelect: SmartTableColumn[] = [
        {key: 'id', label: 'ID', keyword: true},
        {key: 'name', label: '名称', keyword: true},
    ];

    operators: SmartTableOperator[] = [
        {icon: 'edit', title: '编辑', link: (data) => `/admin/gateway/${data.id}/edit`,},
        {
            icon: 'delete', title: '删除', confirm: '确认删除？',
            action: (data) => {
                this.rs.get(`gateway/${data.id}/delete`).subscribe((res) => this.refresh())
            },
        },
    ];

    operatorsProject: SmartTableOperator[] = [
        {icon: 'edit', title: '编辑', link: (data) => `/project/${this.project_id}/gateway/${data.id}/edit`,},
        {
            icon: 'delete', title: '删除', confirm: '确认删除？',
            action: (data) => {
                this.rs.get(`gateway/${data.id}/delete`).subscribe((res) => this.refresh())
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
        if (this.route.parent?.snapshot.paramMap.has('project')) {
            this.project_id = this.route.parent?.snapshot.paramMap.get('project');
            //console.log("project_id", this.project_id)
        }
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
        this.rs.post('gateway/search', query).subscribe((res) => {
            this.datum = res.data;
            this.total = res.total;
        }).add(() => this.loading = false);
    }
}
