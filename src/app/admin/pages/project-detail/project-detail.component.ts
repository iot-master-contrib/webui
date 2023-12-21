import { Component } from '@angular/core';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    NzPageHeaderComponent,
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderExtraDirective,
    NzSpaceComponent,
    NzSpaceItemDirective,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

}
