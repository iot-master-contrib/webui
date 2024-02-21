import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {Router, RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTableFilterList, NzTableModule, NzTableQueryParams} from "ng-zorro-antd/table";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {FormsModule} from '@angular/forms';

export interface TableViewColumn {
  key: string
  text: string
  keyword?: boolean
  sortable?: boolean
  filter?: NzTableFilterList
  date?: boolean
  link?: (data: any) => string
}

export interface TableViewOperator {
  link?: (data: any) => string
  action?: (data: any) => void
  icon?: string
  title?: string
  text?: string
  confirm?: string
  external?: boolean
}

export interface TableViewButton {
  link?: string
  action?: () => void
  text: string
  icon?: string
}


export interface TableViewParams {
  buttons?: TableViewButton[];
  columns: TableViewColumn[]
  operators: TableViewOperator[]
}

export interface ParamSearch {
  filter: { [key: string]: any }
  skip?: number
  limit?: number
  sort?: { [key: string]: number }
  keyword?: { [key: string]: string }
}

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSpaceComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    RouterLink,
    NzPaginationComponent,
    NzSpaceItemDirective,
    NzTableModule,
    NgForOf,
    DatePipe,
    NzPopconfirmDirective,
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;

  keyword = '';

  @Input() buttons?: TableViewButton[];
  @Input() columns: TableViewColumn[] = []
  @Input() operators?: TableViewOperator[]

  @Input() datum: any[] = [];
  @Input() total: number = 0;
  @Input() loading = false;

  @Output() query = new EventEmitter<ParamSearch>

  body: ParamSearch = {filter: {}}

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }

  refresh() {
    this.pageIndex = 1;
    //this.load();
    this.query.emit(this.body)
  }

  search() {
    //console.log(this.keyword);
    this.body.keyword = {}

    if (this.keyword) {
      this.columns.forEach(c => {
        if (c.keyword)
          // @ts-ignore
          this.body.keyword[c.key] = this.keyword
      })
    }

    this.query.emit(this.body)
  }

  onQuery(query: NzTableQueryParams) {
    //console.log("table view onQuery", query)
    //过滤器
    query.filter.forEach(f => {
      if (f.value) {
        if (f.value.length > 1)
          this.body.filter[f.key] = f.value;
        else if (f.value.length === 1)
          this.body.filter[f.key] = f.value[0];
      }
    })

    //分页
    this.body.skip = (query.pageIndex - 1) * query.pageSize;
    this.body.limit = query.pageSize;

    //排序
    const sorts = query.sort.filter(s => s.value);
    if (sorts.length) {
      this.body.sort = {};
      sorts.forEach(s => {
        // @ts-ignore
        this.body.sort[s.key] = s.value === 'ascend' ? 1 : -1;
      });
    } else {
      delete this.body.sort;
    }

    this.query.emit(this.body)
  }

}
