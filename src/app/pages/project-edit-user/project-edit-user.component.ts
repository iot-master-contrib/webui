import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RequestService } from '../../request.service';
import { UserComponent } from '../users/user.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
@Component({
  selector: 'app-project-edit-user',
  standalone: true,
  imports: [UserComponent,NzPageHeaderModule],
  templateUrl: './project-edit-user.component.html',
  styleUrl: './project-edit-user.component.scss'
})
export class ProjectEditUserComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute,
    private ms: NzModalService
  ) {

  }

}
