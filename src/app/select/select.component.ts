import {Component} from '@angular/core';
import {RequestService} from "iot-master-smart";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../user.service";
import {NzListModule} from "ng-zorro-antd/list";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [
        NzListModule,
        NgForOf,
        RouterLink,
        NgIf
    ],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent {

    projects: any = []
    loading = true;

    constructor(private rs: RequestService, private us: UserService, private router: Router) {
        if (us.user.admin) {
            this.router.navigateByUrl('/admin')
            return
        }

        this.rs.get('user/' + us.user.id + '/projects').subscribe(res => {
            this.projects = res.data || [];
            if (this.projects.length === 1) {
                this.router.navigateByUrl('/project/' + this.projects[0].id)
            }
        }).add(() => {
            this.loading = false
        })
    }
}
