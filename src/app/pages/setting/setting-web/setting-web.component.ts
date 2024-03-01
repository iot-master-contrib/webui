import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../components/smart-form/smart-form.component";

@Component({
  selector: 'app-setting-web',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    SmartFormComponent,
  ],
  templateUrl: './setting-web.component.html',
  styleUrl: './setting-web.component.scss',
})
export class SettingWebComponent implements OnInit {

  @ViewChild('form') form!: SmartFormComponent

  fields: SmartFormItem[] = [
    {key: "port", label: "端口", type: "number", required: true, default: 8080, min: 1, max: 65535},
    {key: "debug", label: "调试模式", type: "switch"},
    {key: "cors", label: "跨域请求", type: "switch"},
    {key: "gzip", label: "压缩模式", type: "switch"},
    {
      key: "https", label: "HTTPS", type: "select",
      options: [
        {label: '禁用', value: ''},
        {label: 'TLS', value: 'TLS'},
        {label: 'LetsEncrypt', value: 'LetsEncrypt'},
      ]
    },
    {key: "cert", label: "证书cert", type: "file"},
    {key: "key", label: "证书key", type: "file"},
    {key: "email", label: "E-Mail", type: "text"},
    {key: "hosts", label: "域名", type: "tags", default: []},
    //{key: "id", label: "ID规则", type: "select", default: []},
  ]

  values: any = {}

  constructor(private msg: NzMessageService, private rs: RequestService,) {
  }

  ngOnInit(): void {
    this.rs.get('setting/web', {}).subscribe(res => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `setting/web`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.msg.success('保存成功');
    });
  }
}
