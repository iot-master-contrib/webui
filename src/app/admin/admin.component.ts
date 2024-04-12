import {Component, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzModalModule, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {FormsModule} from '@angular/forms';
import {OemService} from "../oem.service";
import {UserService} from "../user.service";
import {PasswordComponent} from "../modals/password/password.component";
import {RequestService} from 'iot-master-smart';
import {CommonModule} from '@angular/common';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzBreadCrumbComponent} from "ng-zorro-antd/breadcrumb";

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule,
        FormsModule,
        RouterOutlet,
        NzModalModule,
        NzLayoutComponent,
        NzHeaderComponent,
        NzContentComponent,
        NzDropDownDirective,
        NzDropdownMenuComponent,
        NzIconDirective,
        NzMenuDirective,
        NzMenuDividerDirective,
        NzMenuItemComponent,
        RouterLink,
        NzSubMenuComponent, NzSiderComponent, NzButtonComponent, NzBreadCrumbComponent,
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent {
    isVisible = false
    admin = false

    dash: any = {
        name: '控制台', icon: 'dashboard', open: true,
        items: [
            {name: '仪表盘', url: 'dash'}
        ]
    }

    setting: any = {
        name: '系统设置', icon: 'setting',
        items: []
    }

    menus: any = []

    isCollapsed: boolean = false;

    constructor(
        private router: Router,
        private ms: NzModalService,
        protected us: UserService,
        private rs: RequestService,
        protected os: OemService
    ) {
        this.loadMenu()
    }

    loadMenu() {
        this.rs.get('menu/admin').subscribe((res: any) => {
            //this.menus = res.data
            //this.menus = this.menus.concat(res.data)
            res.data?.forEach((m: any) => {
                //m.items.forEach((i: any) => i.standalone = true)
                //先查找同名，找到就合并
                let has = false
                this.menus.forEach((m2: any) => {
                    if (m.name == m2.name) {
                        m2.items = m2.items.concat(m.items)
                        has = true
                    }
                })
                if (!has) {
                    this.menus.push(m)
                }
            })

            this.menus.sort((m: any, n: any) => (m.name > n.name) ? 1 : -1)

            this.menus.unshift(this.dash)
            this.menus.push(this.setting)
        })

        this.rs.get('setting/modules').subscribe(res => {
            //console.log(res)
            res.data?.forEach((s: any) => {
                this.setting.items.push({
                    name: s.name,
                    url: "setting",
                    query: {module: s.module}
                })
            })

        })
    }


    handlePassword() {
        const modal: NzModalRef = this.ms.create({
            nzTitle: '修改密码',
            nzCentered: true,
            nzMaskClosable: false,
            nzContent: PasswordComponent,
            nzFooter: [
                {
                    label: '取消',
                    onClick: () => {
                        modal.destroy();
                    },
                },
                {
                    label: '保存',
                    type: 'primary',
                    onClick: (rs: any) => {
                        rs!.submit().then(() => {
                            modal.destroy();
                        });
                    },
                },
            ],
        });
    }

    handleExit() {
        this.rs.get("logout").subscribe(() => {
            this.us.setUser(undefined)
        })
        this.router.navigateByUrl("/login")
    }
}
