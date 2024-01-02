import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
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
    NzSubMenuComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isVisible=false
  constructor(
    // private router: Router,
    // private rs: RequestService,
      private ms: NzModalService,
    // private us: UserService,
    // protected _as: AppService,
    // private msg: NzMessageService,
    // protected os: OemService
) {}
  handlePassword() {
    // const modal: NzModalRef = this.ms.create({
    //     nzTitle: '修改密码',
    //     nzCentered: true,
    //     nzMaskClosable: false,
    //     nzContent: PasswordComponent,
    //     nzFooter: [
    //         {
    //             label: '取消',
    //             onClick: () => {
    //                 modal.destroy();
    //             },
    //         },
    //         {
    //             label: '保存',
    //             type: 'primary',
    //             onClick: (componentInstance: any) => {
    //                 componentInstance!.submit().then(
    //                     () => {
    //                         modal.destroy();
    //                     },
    //                     () => {}
    //                 );
    //             },
    //         },
    //     ],
    // });
}
}
