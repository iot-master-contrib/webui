import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzMenuDirective,
    NzMenuDividerDirective,
    NzMenuItemComponent,
    RouterLink,
    NzSubMenuComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
