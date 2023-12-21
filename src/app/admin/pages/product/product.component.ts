import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {ToolbarComponent} from "../../toolbar/toolbar.component";

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
        ToolbarComponent
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: any[] = [{}, {}, {}, {}, {}, {}, {}, {}]

}
