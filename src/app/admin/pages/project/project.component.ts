import {Component} from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDropDownDirective, NzDropdownMenuComponent, NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NgForOf} from "@angular/common";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {Router, RouterLink} from "@angular/router";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzAffixComponent} from "ng-zorro-antd/affix";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzDropdownMenuComponent,
    NzDropDownDirective,
    NzDropDownModule,
    NzMenuDirective,
    NzMenuItemComponent,
    NgForOf,
    NzPaginationComponent,
    NzPopconfirmDirective,
    NzSpaceComponent,
    NzButtonComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzSpaceItemDirective,
    NzAffixComponent,
    RouterLink
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  projects: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}]

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
