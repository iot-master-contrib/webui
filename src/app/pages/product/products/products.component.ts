import {Component, OnInit, Optional} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {Router, RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormsModule} from '@angular/forms';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NzTableComponent, NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    FormsModule,
    NgForOf,
    NzCardComponent,
    NzCardMetaComponent,
    NzColDirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzMenuDirective,
    NzMenuItemComponent,
    NzPaginationComponent,
    NzRowDirective,
    NzButtonComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzSpaceComponent,
    RouterLink,
    NzSpaceItemDirective,
    NzPopconfirmDirective,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';

  constructor(
    private ms: NzModalService,
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    @Optional() protected ref: NzModalRef
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  refresh() {
    this.pageIndex = 1;
    this.load();
  }

  search() {
    let query

    this.value ? query = {filter: {name: this.value}} : query = {}
    this.rs.post(`product/search`, query).subscribe(
      (res) => {
        this.products = res.data;
        this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  delete(i: any) {
    this.rs.get(`product/${i}/delete`, {}).subscribe(
      (res) => {
        this.msg.success('删除成功');
        this.load();
      },
      (err) => {
        console.log('err:', err);
      }
    );
    this.load();
  }

  pageSizeChange(e: any) {
    this.pageSize = e;
    this.load();
  }

  pageIndexChange(e: any) {
    this.pageIndex = e;
    this.load();
  }

  load() {
    let query;
    query = {
      limit: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
    };

    this.value ? (query = {...query, keyword: {id: this.value, name: this.value}}) : '';

    this.rs.post('product/search', query).subscribe(
      (res) => {

        this.products = res.data;
        this.total = res.total;


      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  select(id: any) {
    this.ref && this.ref.close(id);
  }
}
