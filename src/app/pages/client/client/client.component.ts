import {Component} from '@angular/core';
import {
    ParamSearch,
    SmartTableButton, SmartTableColumn,
    SmartTableComponent, SmartTableOperator
} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    imports: [
        SmartTableComponent
    ],
    standalone: true
})
export class ClientComponent {
    datum: any[] = [];
    total = 0;
    loading = false;

    buttons: SmartTableButton[] = [
        {icon: "plus", label: "创建", link: () => `/admin/client/create`}
    ];

    columns: SmartTableColumn[] = [
        {key: "id", label: "ID", sortable: true, keyword: true, link: (data) => `/admin/client/${data.id}`},
        {key: "name", label: "名称", sortable: true, keyword: true},
        {key: "net", label: "网络", sortable: true, keyword: true},
        {key: "addr", label: "地址", sortable: true, keyword: true},
        {key: "port", label: "端口", sortable: true, keyword: true},
        {key: "created", label: "创建时间", sortable: true, date: true},
    ];

    operators: SmartTableOperator[] = [
        {icon: 'edit', title: '编辑', link: data => `/admin/client/${data.id}/edit`},
        {
            icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
                this.rs.get(`client/${data.id}/delete`).subscribe(res => this.refresh())
            }
        },
    ];

    constructor(private rs: RequestService) {
    }


    query!: ParamSearch

    refresh() {
        this.search(this.query)
    }

    search(query: ParamSearch) {
        //console.log('onQuery', query)
        this.query = query
        this.loading = true
        this.rs.post('client/search', query).subscribe((res) => {
            this.datum = res.data;
            this.total = res.total;
        }).add(() => this.loading = false);
    }

}
