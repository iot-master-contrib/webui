import {Component, OnInit, Optional} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
  ParamSearch,
  TableViewButton,
  TableViewColumn,
  TableViewComponent,
  TableViewOperator,
} from '../../../components/table-view/table-view.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    TableViewComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: TableViewButton[] = [
    {icon: 'plus', text: '创建', link: () => `/admin/product/create`},
  ];

  columns: TableViewColumn[] = [
    {
      key: 'id', sortable: true, text: 'ID', keyword: true,
      link: (data) => `/admin/product/${data.id}`,
    },
    {key: 'name', sortable: true, text: '名称', keyword: true},
    {key: 'version', sortable: true, text: '版本', keyword: true},
    {key: 'created', sortable: true, text: '创建时间', date: true},
  ];

  columnsSelect: TableViewColumn[] = [
    {key: 'id', text: 'ID', keyword: true},
    {key: 'name', text: '名称', keyword: true},
  ];

  operators: TableViewOperator[] = [
    {icon: 'edit', title: '编辑', link: (data) => `/admin/product/${data.id}/edit`,},
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`product/${data.id}/delete`).subscribe(res => this.refresh())
      }
    },
  ];

  operatorsSelect: TableViewOperator[] = [
    {text: '选择', action: (data) => this.ref.close(data)},
  ];

  constructor(private rs: RequestService, @Optional() protected ref: NzModalRef) {
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
