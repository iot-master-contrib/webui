import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../components/smart-form/smart-form.component";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    SmartFormComponent,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  id: any = '';

  @ViewChild('form') form!: SmartFormComponent

  fields: SmartFormItem[] = [
    {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
    {key: "name", label: "名称", type: "text", required: true},
    {key: "email", label: "邮箱", type: "text"},
    {key: "cellphone", label: "手机号", type: "text"},
    {key: "disabled", label: "禁用", type: "switch"},
    {key: "admin", label: "管理员", type: "switch"},
  ]

  values: any = {}


  constructor(private router: Router,
              private msg: NzMessageService,
              private rs: RequestService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load()
    }
  }

  load() {
    this.rs.get(`user/` + this.id).subscribe((res) => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `user/${this.id || 'create'}`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.router.navigateByUrl('/admin/user/' + res.data.id);
      this.msg.success('保存成功');
    });
  }
}
