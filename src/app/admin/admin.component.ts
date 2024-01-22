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
import {PasswordComponent} from "./modals/password/password.component";
import {RequestService} from '../request.service';
import {CommonModule} from '@angular/common';

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
    NzSubMenuComponent, NzSiderComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isVisible = false
  admin = false

  constructor(
    private router: Router,
    // private rs: RequestService,
    private ms: NzModalService,
    private us: UserService,
    private rs: RequestService,
    // protected _as: AppService,
    // private msg: NzMessageService,
    protected os: OemService
  ) {

    rs.get('user/me').subscribe(res => {
      res?.data?.admin ? this.admin = true : ''

    }, error => {

    }).add(() => {

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
