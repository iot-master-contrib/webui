import { Component, OnInit, Optional } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { Router, RouterLink } from '@angular/router';
import { RequestService } from '../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-product',
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
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  products: any[] = [
    // {id: 1, icon:"/assets/temp.png", name: "温度计", description: "温度计"},
    // {id: 2, icon:"/assets/temp.png", name: "继电器板", description: "4路继电器板"},
    // {id: 3, icon:"/assets/temp.png", name: "排污PLC", description: "排污PLC S7 200Smart"},
    // {id: 4, icon:"/assets/temp.png", name: "光感", description: "光照强度"},
  ];
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  constructor(
    private ms: NzModalService,
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService,
    @Optional() protected ref: NzModalRef
  ) {}
  ngOnInit(): void {
    this.load();
  }
  refresh() {
    this.nzPageIndex = 1;
    this.load();
  }

  open(p: any) {
    this.route.navigateByUrl('admin/product/' + p.id);
  }

  edit(p: any) {
    this.route.navigateByUrl('admin/product/' + p.id + '/edit');
  }

  create() {

      this.rs.post(`product/create`, {}).subscribe((res) => {
        this.load()
        this.msg.success('保存成功');
      });

    // const modal: NzModalRef = this.ms.create({
    //   nzTitle: '创建产品',
    //   nzContent: CreateComponent,
    //   nzData: {
    //     name: 'product',
    //   },
    //   nzMaskClosable: false,
    //   nzFooter: [
    //     {
    //       label: '取消',
    //       onClick: () => {
    //         modal.destroy();
    //       },
    //     },
    //     {
    //       label: '保存',
    //       type: 'primary',
    //       onClick: (rs: any) => {
    //         rs!.submit().then(
    //           () => {
    //             modal.destroy();
    //             this.load();
    //           },
    //           () => {}
    //         );
    //       },
    //     },
    //   ],
    // });
  }
  search() {
    let query

    this.value?query={filter:{name:this.value}}:query={}
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
  nzPageSizeChange(e: any) {
    this.nzPageSize = e;
    this.load();
  }
  nzPageIndexChange(e: any) {
    this.nzPageIndex = e;
    this.load();
  }
  load() {
    let query;
    query = {
      limit: this.nzPageSize,
      skip: (this.nzPageIndex - 1) * this.nzPageSize,
    };

    this.value ? (query = { ...query, filter: {name: this.value } }) : '';

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