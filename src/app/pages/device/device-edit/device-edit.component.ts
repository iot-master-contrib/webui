import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../../../projects/smart/src/lib/smart-form/smart-form.component";
import {GatewaysComponent} from "../../gateway/gateways/gateways.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectsComponent} from "../../project/projects/projects.component";
import {ProductsComponent} from "../../product/products/products.component";

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
    {
      key: "gateway_id", label: "网关", type: "choose",
      choose: () => {
        this.ms.create({
          nzTitle: "选择", nzContent: GatewaysComponent, nzData: {project_id: this.project_id},
        }).afterClose.subscribe(res => {
          if (res) {
            this.form.patchValues({gateway_id: res.id})
            this.fields[3].tips = res.name
          }
        })
      },
      change: id => {
        this.rs.get('gateway/' + id, {field: 'name'}).subscribe(res => {
          this.fields[3].tips = res.data?.name || ''
        })
      }
    },
    {
      key: "product_id", label: "产品", type: "choose",
      choose: () => {
        this.ms.create({
          nzTitle: "选择", nzContent: ProductsComponent,
        }).afterClose.subscribe(res => {
          if (res) {
            this.form.patchValues({product_id: res.id})
            this.fields[4].tips = res.name
          }
        })
      },
      change: id => {
        this.rs.get('product/' + id, {field: 'name'}).subscribe(res => {
          this.fields[4].tips = res.data?.name || ''
        })
      }
    },
    {
      key: "project_id", label: "项目", type: "choose",
      choose: () => {
        this.ms.create({
          nzTitle: "选择", nzContent: ProjectsComponent,
        }).afterClose.subscribe(res => {
          if (res) {
            this.form.patchValues({project_id: res.id})
            this.fields[5].tips = res.name
          }
        })
      },
      change: id => {
        this.rs.get('project/' + id, {field: 'name'}).subscribe(res => {
          this.fields[5].tips = res.data?.name || ''
        })
      }
    },
    {key: "description", label: "说明", type: "textarea"},
  ]

  values: any = {}


  constructor(private router: Router,
              private ms: NzModalService,
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
      this.fields[5].disabled = true
    }
  }


  load() {
    this.rs.get(`device/${this.id}`).subscribe(res => {
      this.values = res.data
      if (res.data.gateway_id)
        this.fields[3].change?.(res.data.gateway_id)
      if (res.data.product_id)
        this.fields[4].change?.(res.data.product_id)
      if (res.data.project_id)
        this.fields[5].change?.(res.data.project_id)
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
