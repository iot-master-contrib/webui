import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NormalFormComponent, NormalFormItem} from "../../../components/normal-form/normal-form.component";

@Component({
  selector: 'app-space-edit',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    NormalFormComponent,
  ],
  templateUrl: './space-edit.component.html',
  styleUrl: './space-edit.component.scss',
})
export class SpaceEditComponent implements OnInit {
  id: any = '';
  project_id: any = '';

  @ViewChild('form') form!: NormalFormComponent

  fields: NormalFormItem[] = [
    {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
    {key: "name", label: "名称", type: "text", required: true, default: '新空间'},
    {key: "project_id", label: "项目", type: "project"},
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

  ngAfterViewInit(): void {
    if (this.route.parent?.snapshot.paramMap.has('project')) {
      this.project_id = this.route.parent?.snapshot.paramMap.get('project');
      this.form.patchValues({project_id: this.project_id})
    }
  }


  load() {
    this.rs.get(`space/${this.id}`).subscribe((res) => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate())
      return

    let url = `space/${this.id || 'create'}`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      if (this.project_id)
        this.router.navigateByUrl('/project/' + this.project_id + '/space/' + res.data.id);
      else
        this.router.navigateByUrl('/admin/space/' + res.data.id);
      this.msg.success('保存成功');
    });
  }
}
