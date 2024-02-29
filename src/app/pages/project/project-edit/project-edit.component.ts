import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NormalFormComponent, NormalFormItem} from "../../../components/normal-form/normal-form.component";

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    NormalFormComponent,
  ],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent implements OnInit {
  id: any = '';

  @ViewChild('form') form!: NormalFormComponent

  fields: NormalFormItem[] = [
    {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
    {key: "name", label: "名称", type: "text", required: true, default: '新项目'},
    {key: "keywords", label: "关键字", type: "tags", default: []},
    {key: "version", label: "版本", type: "text"},
    {key: "url", label: "链接", type: "text"},
    {key: "description", label: "说明", type: "textarea"},
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
    this.rs.get(`project/` + this.id).subscribe((res) => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate())
      return

    let url = `project/${this.id || 'create'}`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.router.navigateByUrl('/admin/project/' + res.data.id);
      this.msg.success('保存成功');
    });
  }
}
