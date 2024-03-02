import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'im-unknown',
  standalone: true,
  imports: [
    RouterLink,
    NzEmptyComponent,
    NzButtonComponent
  ],
  templateUrl: './unknown.component.html',
  styleUrl: './unknown.component.scss'
})
export class UnknownComponent {

}
