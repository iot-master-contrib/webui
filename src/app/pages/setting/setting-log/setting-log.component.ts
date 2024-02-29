import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NormalFormComponent, NormalFormItem} from "../../../components/normal-form/normal-form.component";

@Component({
  selector: 'app-setting-log',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    NormalFormComponent,
  ],
  templateUrl: './setting-log.component.html',
  styleUrl: './setting-log.component.scss'
})
export class SettingLogComponent implements OnInit {

  @ViewChild('form') form!: NormalFormComponent

  fields: NormalFormItem[] = [
    {key: "caller", label: "显示函数调用", type: "switch"},
    {key: "text", label: "使用文本格式", type: "switch"},
    {
      key: "level", label: "等级", type: "select", default: 'info',
      options: [
        {label: '跟踪 trace', value: 'trace'},
        {label: '调试 debug', value: 'debug'},
        {label: '信息 info', value: 'info'},
        {label: '警告 warn', value: 'warn'},
        {label: '错误 error', value: 'error'},
        {label: '严重 fatal', value: 'fatal'},
      ]
    },
    {
      key: "type", label: "输出方式", type: "select", default: 'stdout',
      options: [
        {label: '文件', value: 'file'},
        {label: '多文件', value: 'files'},
        {label: '标准输出', value: 'stdout'},
      ]
    },
    {key: "filename", label: "日志文件", type: "text", default: 'log.txt'},
    {key: "compress", label: "日志文件压缩", type: "switch"},
    {key: "max_size", label: "最大尺寸 MB", type: "number", default: 10, min: 1},
    {key: "max_backups", label: "保留数量（滚动删除）", type: "number", default: 100, min: 1},
    {key: "max_age", label: "最大保留天数", type: "number", default: 30, min: 1},
  ]

  values: any = {}

  constructor(private msg: NzMessageService, private rs: RequestService,) {
  }

  ngOnInit(): void {
    this.rs.get('setting/log', {}).subscribe(res => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `setting/log`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.msg.success('保存成功');
    });
  }
}
