import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../../../projects/smart/src/smart-form/smart-form.component";

@Component({
  selector: 'app-setting-mqtt',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    SmartFormComponent,
  ],
  templateUrl: './setting-mqtt.component.html',
  styleUrl: './setting-mqtt.component.scss'
})
export class SettingMqttComponent implements OnInit {

  @ViewChild('form') form!: SmartFormComponent

  fields: SmartFormItem[] = [
    {key: "url", label: "地址", type: "text", required: true, default: ''},
    {key: "username", label: "用户名", type: "text"},
    {key: "password", label: "密码", type: "text"},
    {key: "client_id", label: "客户端ID", type: "text"},
  ]

  values: any = {}

  constructor(private msg: NzMessageService, private rs: RequestService,) {
  }

  ngOnInit(): void {
    this.rs.get('setting/mqtt', {}).subscribe(res => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `setting/mqtt`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.msg.success('保存成功');
    });
  }
}
