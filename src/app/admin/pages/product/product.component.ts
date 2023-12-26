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
import {RouterLink} from "@angular/router";
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
  products: any[] = [{}, {}, {}, {}, {}, {}, {}, {}]

}
