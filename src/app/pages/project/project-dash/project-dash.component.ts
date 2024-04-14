import {Component} from '@angular/core';
import {CountComponent} from "../../../widgets/count/count.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {RequestService} from "iot-master-smart";
import {GetParentRouteParam, GetParentRouteUrl} from "../../../app.routes";

@Component({
    selector: 'app-project-dash',
    standalone: true,
    imports: [
        CountComponent,
        NzCardComponent,
        NzColDirective,
        NzRowDirective
    ],
    templateUrl: './project-dash.component.html',
    styleUrl: './project-dash.component.scss'
})
export class ProjectDashComponent {
    base = '/admin'
    project: any = ''

    constructor(
        private router: Router,
        private msg: NzMessageService,
        private rs: RequestService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.base = GetParentRouteUrl(this.route)
        this.project ||= GetParentRouteParam(this.route, "project")
    }
}
