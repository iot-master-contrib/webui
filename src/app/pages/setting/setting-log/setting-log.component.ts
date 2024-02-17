import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {
  NzPageHeaderComponent,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzSpaceComponent} from "ng-zorro-antd/space";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {Router} from '@angular/router';
import {RequestService} from '../../../request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-setting-log',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzRowDirective,
    NzSelectComponent,
    NzSpaceComponent,
    ReactiveFormsModule,
    NzSwitchComponent,
    NzCardComponent
  ],
  templateUrl: './setting-log.component.html',
  styleUrl: './setting-log.component.scss'
})
export class SettingLogComponent implements OnInit {
  formGroup!: FormGroup;

  data: any = {}

  constructor(private fb: FormBuilder,
              private route: Router,
              private rs: RequestService,
              private msg: NzMessageService) {
    this.buildFromGroup()
  }

  ngOnInit(): void {
    this.rs.get('setting/log', {}).subscribe(res => {
      this.data = res.data
      this.buildFromGroup()
    });
  }

  buildFromGroup() {
    this.formGroup = this.fb.group({
      level: [this.data.level || 'info', []],
      caller: [this.data.caller || true, []],
      text: [this.data.text || true, []],
      output: [this.data.output || "stdout", []],
      filename: [this.data.filename || "log.txt", []],
      max_size: [this.data.max_size || 10, []],  //MB
      max_backups: [this.data.max_backups || 3, []], //保留文件数
      max_age: [this.data.max_age || 30, []],   //天
      compress: [this.data.compress || true, []], //gzip压缩
    })
    //console.log(this.formGroup)
  }

  onSubmit() {
    this.rs.post('setting/log', this.formGroup.value).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
