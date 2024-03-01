import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../components/smart-form/smart-form.component";

@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    SmartFormComponent,
  ],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.scss',
})
export class DeviceEditComponent implements OnInit, AfterViewInit {
  id: any = '';
  project_id: any = '';

  data: any = {}

  @ViewChild('form') form!: SmartFormComponent

  fields: SmartFormItem[] = [
    {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
    {key: "name", label: "名称", type: "text", required: true, default: '新设备'},
    {key: "keywords", label: "关键字", type: "tags", default: []},
    {key: "gateway_id", label: "网关", type: "gateway", data: this.data},
    {key: "product_id", label: "产品", type: "product"},
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
      this.data.project_id = this.project_id
      this.form.patchValues({project_id: this.project_id})
      this.form.group.get('project_id')?.disable()
    }
  }


  load() {
    this.rs.get(`device/${this.id}`).subscribe(res => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `device/${this.id || 'create'}`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      if (this.project_id)
        this.router.navigateByUrl('/project/' + this.project_id + '/device/' + res.data.id);
      else
        this.router.navigateByUrl('/admin/device/' + res.data.id);
      this.msg.success('保存成功');
    });
  }
}
