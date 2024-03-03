import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../../../projects/smart/src/smart-form/smart-form.component";

@Component({
  selector: 'app-setting-broker',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    SmartFormComponent,
  ],
  templateUrl: './setting-broker.component.html',
  styleUrl: './setting-broker.component.scss'
})
export class SettingBrokerComponent implements OnInit {

  @ViewChild('form') form!: SmartFormComponent

  fields: SmartFormItem[] = [
    {key: "enable", label: "启用", type: "switch", default: true},
    {key: "port", label: "端口", type: "number", default: 1843},
  ]

  values: any = {}

  constructor(private msg: NzMessageService, private rs: RequestService,) {
  }

  ngOnInit(): void {
    this.rs.get('setting/broker', {}).subscribe(res => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `setting/broker`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.msg.success('保存成功');
    });
  }
}
