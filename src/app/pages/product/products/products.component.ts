import {Component, OnInit, Optional} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
    ParamSearch,
    SmartTableButton,
    SmartTableColumn,
    SmartTableComponent,
    SmartTableOperator,
} from '../../../../../projects/smart/src/lib/smart-table/smart-table.component';
@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        CommonModule,
        SmartTableComponent,
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent {
    datum: any[] = [];
    total = 0;
    loading = false;

    buttons: SmartTableButton[] = [
        {icon: 'plus', label: '创建', link: () => `/admin/product/create`},
    ];

    columns: SmartTableColumn[] = [
        {
            key: 'id', sortable: true, label: 'ID', keyword: true,
            link: (data) => `/admin/product/${data.id}`,
        },
        {key: 'name', sortable: true, label: '名称', keyword: true},
        {key: 'version', sortable: true, label: '版本', keyword: true},
        {key: 'created', sortable: true, label: '创建时间', date: true},
    ];

    columnsSelect: SmartTableColumn[] = [
        {key: 'id', label: 'ID', keyword: true},
        {key: 'name', label: '名称', keyword: true},
    ];

    operators: SmartTableOperator[] = [
        {icon: 'edit', title: '编辑', link: (data) => `/admin/product/${data.id}/edit`,},
        {
            icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
                this.rs.get(`product/${data.id}/delete`).subscribe(res => this.refresh())
            }
        },
    ];

    operatorsSelect: SmartTableOperator[] = [
        {
            label: '选择', action: (data) => {
                this.ref.close(data)
                // this.ms.create({
                //   nzTitle: "选择版本",
                //   nzContent: ProductVersionComponent,
                //   nzData: {product_id: data.id},
                // }).afterClose.subscribe(res => {
                //   if (res) {
                //     this.ref.close(Object.assign({}, data,{version: res.name}))
                //   }
                // })
            }
        },
    ];

    constructor(private rs: RequestService,
                private ms: NzModalService,
                @Optional() protected ref: NzModalRef) {
    }


    query!: ParamSearch

    refresh() {
        this.search(this.query)
    }

    search(query: ParamSearch) {
        //console.log('onQuery', query)
        this.query = query
        this.loading = true
        this.rs.post('product/search', query).subscribe((res) => {
            this.datum = res.data;
            this.total = res.total;
        }).add(() => this.loading = false);
    }

}
