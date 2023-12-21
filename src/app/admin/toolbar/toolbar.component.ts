import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NZ_ICONS, NZ_ICONS_PATCH, NzIconDirective, NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    NzInputGroupComponent,
    NzButtonComponent,
    NzInputDirective,
    NzIconDirective,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  keyword = ""

  search(){

  }
}
