import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {Router, RouterLink} from "@angular/router";
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: any[] = [
    {id: 1, icon:"/assets/temp.png", name: "温度计", description: "温度计"},
    {id: 2, icon:"/assets/temp.png", name: "继电器板", description: "4路继电器板"},
    {id: 3, icon:"/assets/temp.png", name: "排污PLC", description: "排污PLC S7 200Smart"},
    {id: 4, icon:"/assets/temp.png", name: "光感", description: "光照强度"},
  ]

  constructor(private route: Router) {
  }

  open(p: any) {
    this.route.navigateByUrl("admin/project/" + p.id)
  }

  edit(p: any) {
    this.route.navigateByUrl("admin/project/" + p.id + "/edit")
  }

  delete(i: number) {

  }
}
