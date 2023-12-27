import { Component } from '@angular/core';
import {NzLayoutComponent, NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective} from "ng-zorro-antd/input";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuDirective,
    NzMenuItemComponent,
    NzIconDirective,
    NzSubMenuComponent,
    NzInputDirective
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {

}
