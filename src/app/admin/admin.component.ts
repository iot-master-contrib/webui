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
import {RequestService} from '../../../projects/smart/src/lib/request.service';
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

    menus: any = [
        {
            name: '控制台', icon: 'dashboard', open: true,
            items: [
                {name: '仪表盘', url: 'dash'}
            ]
        },
        {
            name: '项目管理', icon: 'apartment',
            items: [
                {name: '所有项目', url: 'project'},
                {name: '创建项目', url: 'project/create'},
            ]
        },
        {
            name: '空间管理', icon: 'appstore',
            items: [
                {name: '所有空间', url: 'space'},
                {name: '创建空间', url: 'space/create'},
            ]
        },
        {
            name: '设备管理', icon: 'block',
            items: [
                {name: '所有设备', url: 'device'},
                {name: '创建设备', url: 'device/create'},
            ]
        },
        {
            name: '产品管理', icon: 'profile',
            items: [
                {name: '所有产品', url: 'product'},
                {name: '创建产品', url: 'product/create'},
            ]
        },
        {
            name: '用户管理', icon: 'user',
            items: [
                {name: '所有用户', url: 'user'},
                {name: '创建用户', url: 'user/create'},
            ]
        },
        {
            name: '系统设置', icon: 'setting',
            items: [
                {name: 'Web服务', url: 'setting/web'},
                {name: '数据库', url: 'setting/database'},
                {name: 'MQTT总线', url: 'setting/broker'},
                {name: 'MQTT连接', url: 'setting/mqtt'},
                {name: '系统日志', url: 'setting/log'},
                {name: '附件管理', url: 'setting/attach'},
            ]
        },
    ]
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
