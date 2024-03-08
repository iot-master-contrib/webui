import {Component, Inject, Input, Optional} from '@angular/core';
import {
  ParamSearch,
  SmartTableButton, SmartTableColumn,
  SmartTableComponent, SmartTableOperator
} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-version',
  standalone: true,
  imports: [
    SmartTableComponent
  ],
  templateUrl: './product-version.component.html',
  styleUrl: './product-version.component.scss'
})
export class ProductVersionComponent {
  @Input() product_id: any = ''

  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: SmartTableButton[] = [
    {
      icon: 'plus', text: '创建', action: () => {
        let ver = prompt("请输入版本号")
        if (ver) {
          this.rs.post(`product/${this.product_id}/version/create`, {name: ver}).subscribe(res => this.refresh())
        }
      }
    },
  ];

  columns: SmartTableColumn[] = [
    {key: 'name', text: '名称'},
    {key: 'created', text: '创建时间', date: true},
  ];

  operators: SmartTableOperator[] = [
    {
      icon: 'edit', title: '编辑', action: data => {

        let ver = prompt("请输入版本号", data.name)
        if (ver) {
          this.rs.post(`product/${this.product_id}/version/${data.name}`, {name: ver}).subscribe(res => this.refresh())
        }
      }
    },
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`product/${this.product_id}/version/${data.name}/delete`).subscribe(res => this.refresh())
      }
    },
  ];

  operatorsSelect: SmartTableOperator[] = [
    {text: '选择', action: (data) => this.ref.close(data)},
  ];

  constructor(private route: ActivatedRoute,
              private rs: RequestService,
              @Optional() protected ref: NzModalRef,
              @Optional() @Inject(NZ_MODAL_DATA) protected data: any
  ) {
    this.product_id = data?.product_id;
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.product_id = this.route.snapshot.paramMap.get('id');
    }
  }


  query!: ParamSearch

  refresh() {
    this.search(this.query)
  }

  search(query: ParamSearch) {
    this.query = query
    this.loading = true
    this.rs.get('product/' + this.product_id + '/version/list', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }

}