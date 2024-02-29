import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzModalModule, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {FormsModule} from '@angular/forms';
import {OemService} from "../oem.service";
import {UserService} from "../user.service";
import {PasswordComponent} from "../modals/password/password.component";
import {RequestService} from '../request.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-project',
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
    NzSubMenuComponent, NzSiderComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  id: any = ''
  project: any = {}

  menus: any = [
    {
      name: '控制台', icon: 'dashboard', open: true,
      items: [
        {name: '仪表盘', link: 'dash'},
        {name: '项目详情', link: 'detail'}
      ]
    },
    {
      name: '空间管理', icon: 'appstore',
      items: [
        {name: '所有空间', link: 'space'},
        {name: '创建空间', link: 'space/create'},
      ]
    },
    {
      name: '设备管理', icon: 'block',
      items: [
        {name: '所有设备', link: 'device'},
        {name: '创建设备', link: 'device/create'},
      ]
    },
    {
      name: '网关管理', icon: 'link',
      items: [
        {name: '所有网关', link: 'gateway'},
        {name: '创建网关', link: 'gateway/create'},
        //{name: '批量创建', link: 'gateway/batch'},
      ]
    },
    {
      name: '用户管理', icon: 'user',
      items: [
        {name: '项目用户', link: 'user'},
        //{name: '创建用户', link: 'user/create'},
      ]
    },
  ]
  isCollapsed: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ms: NzModalService,
    protected us: UserService,
    private rs: RequestService,
    protected os: OemService
  ) {
    this.loadMenu()
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("project")
    this.loadProject()
  }

  loadProject() {
    this.rs.get('project/' + this.id).subscribe(res => {
      this.project = res.data
    })
  }

  loadMenu() {
    this.rs.get('plugin/menus/project').subscribe((res: any) => {
      //this.menus = res.data
      //this.menus = this.menus.concat(res.data)
      res.data.forEach((m: any) => {
        m.items.forEach((i: any) => i.standalone = true)
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
            rs!.submit().then(
              () => {
                modal.destroy();
              },
              () => {
              }
            );
          },
        },
      ],
    });
  }

  handleExit() {
    this.rs.get("/logout").subscribe(() => {
      this.us.setUser(undefined)
    })
    this.router.navigateByUrl("/login")
  }
}
