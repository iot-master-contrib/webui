import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from 'iot-master-smart';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
    ParamSearch,
    SmartTableButton,
    SmartTableColumn,
    SmartTableComponent,
    SmartTableOperator,
} from 'iot-master-smart';


@Component({
    selector: 'app-brokers',
    standalone: true,
    imports: [
        CommonModule,
        SmartTableComponent,
    ],
    templateUrl: './brokers.component.html',
    styleUrl: './brokers.component.scss',
})
export class BrokersComponent implements OnInit {
    datum: any[] = [];
    total = 0;
    loading = false;


    buttons: SmartTableButton[] = [
        {icon: 'plus', label: '创建', link: () => `/admin/broker/create`},
    ];

    columns: SmartTableColumn[] = [
        {key: 'id', sortable: true, label: 'ID', keyword: true, link: (data) => `/admin/broker/${data.id}`},
        {key: 'name', sortable: true, label: '名称', keyword: true},
        {key: 'port', sortable: true, label: '端口', keyword: true,},
        {key: 'created', sortable: true, label: '创建时间', date: true},
    ];

    operators: SmartTableOperator[] = [
        {icon: 'edit', title: '编辑', link: (data) => `/admin/broker/${data.id}/edit`,},
        {
            icon: 'delete', title: '删除', confirm: '确认删除？',
            action: (data) => {
                this.rs.get(`broker/${data.id}/delete`).subscribe((res) => this.refresh())
            },
        },
    ];

    constructor(private route: ActivatedRoute,
                private rs: RequestService,
                @Optional() protected ref: NzModalRef) {
    }

    ngOnInit(): void {
    }

    query!: ParamSearch

    refresh() {
        this.search(this.query)
    }

    search(query: ParamSearch) {
        //console.log('onQuery', query)
        this.query = query

        this.loading = true;
        this.rs.post('broker/search', query).subscribe((res) => {
            this.datum = res.data;
            this.total = res.total;
        }).add(() => this.loading = false);
    }
}
