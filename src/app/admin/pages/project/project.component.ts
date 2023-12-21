import {Component} from '@angular/core';
import {ToolbarComponent} from "../../toolbar/toolbar.component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDropDownDirective, NzDropdownMenuComponent, NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ToolbarComponent,
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzDropdownMenuComponent,
    NzDropDownDirective,
    NzDropDownModule,
    NzMenuDirective,
    NzMenuItemComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  constructor() {
  }

}
