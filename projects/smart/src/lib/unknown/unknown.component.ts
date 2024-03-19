import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzResultNotFoundComponent} from "ng-zorro-antd/result/partial/not-found";
import {NzResultComponent} from "ng-zorro-antd/result";

@Component({
    selector: 'im-unknown',
    standalone: true,
    imports: [
        RouterLink,
        NzEmptyComponent,
        NzButtonComponent,
        NzResultComponent
    ],
    templateUrl: './unknown.component.html',
    styleUrl: './unknown.component.scss'
})
export class UnknownComponent {

}
