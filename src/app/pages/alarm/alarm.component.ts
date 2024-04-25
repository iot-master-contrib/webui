import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParamSearch, RequestService, SmartTableColumn, SmartTableComponent, SmartTableOperator} from 'iot-master-smart';
import {GetParentRouteParam, GetParentRouteUrl} from "../../app.routes";

@Component({
    selector: 'app-alarm',
    standalone: true,
    imports: [
        SmartTableComponent,
    ],
    templateUrl: './alarm.component.html',
    styleUrl: './alarm.component.scss'
})
export class AlarmComponent implements OnInit {
    base = "/admin"

    @Input() project_id!: any
    @Input() device_id!: any

    total = 0;
    datum: any[] = [];
    loading = false;


    columns: SmartTableColumn[] = [
        {
            key: 'project', sortable: true, label: '项目', keyword: true,
            link: (data) => `${this.base}/project/${data.project_id}`,
        },
        {
            key: 'device', sortable: true, label: '项目', keyword: true,
            link: (data) => `${this.base}/device/${data.device_id}`,
        },
        {key: 'level', sortable: true, label: '等级', keyword: true},
        {key: 'title', sortable: true, label: '标题', keyword: true},
        {key: 'message', sortable: true, label: '内容', keyword: true},
        {key: 'created', sortable: true, label: '创建时间', date: true},
    ];


    operators: SmartTableOperator[] = [
        {
            icon: 'delete', title: '删除', confirm: '确认删除？',
            action: (data) => {
                this.rs.get(`alarm/${data.id}/delete`).subscribe((res) => this.refresh());
            },
        },
    ];


    constructor(private route: ActivatedRoute, private rs: RequestService) {
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
        if (this.project_id) query.filter['project_id'] = this.project_id;
        if (this.device_id) query.filter['tunnel_id'] = this.device_id;

        this.loading = true;
        this.rs.post('alarm/search', query).subscribe((res) => {
            this.datum = res.data;
            this.total = res.total;
        }).add(() => this.loading = false);
    }

}
