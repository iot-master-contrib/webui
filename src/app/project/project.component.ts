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
export class ProjectComponent implements OnInit{
  id: any = ''
  project:any = {}

  menus: any = [];

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

  loadProject(){
    this.rs.get('project/'+this.id).subscribe(res=>{
      this.project = res.data
    })
  }

  loadMenu() {
    this.rs.get('plugin/menus/project').subscribe(res => {
      this.menus = res.data
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
