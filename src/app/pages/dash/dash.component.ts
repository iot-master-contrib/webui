import { Component } from '@angular/core';
import {CountComponent} from "../../widgets/count/count.component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    CountComponent,
    NzRowDirective,
    NzColDirective,
    NzCardComponent
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent {

}
