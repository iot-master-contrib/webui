import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
@Component({
  selector: 'app-batch-btn',
  standalone: true,
  imports: [
    CommonModule,
    NzSpaceModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzUploadModule,
  ],
  templateUrl: './batch-btn.component.html',
  styleUrls: ['./batch-btn.component.scss'],
})
export class BatchBtnComponent {
  @Input() uploadApi: string = '';
  @Input() downloadApi: string = '';
  @Input() showAddBtn: Boolean = true;
  @Input() showExportBtn: Boolean = true;
  @Input() showImportBtn: Boolean = true;
  @Input() showDelBtn: Boolean = true;
  @Output() onLoad = new EventEmitter<string>();
  @Output() add = new EventEmitter<string>();
  @Output() batchDel = new EventEmitter<string>();
  constructor(private msg: NzMessageService) {}
  handleUpload(info: any): void {
    if (info.type === 'error') {
      this.msg.error(`上传失败`);
      return;
    }
    if (info.file && info.file.response) {
      const res = info.file.response;
      if (!res.error) {
        this.msg.success(`导入成功!`);
        this.onLoad.emit();
      } else {
        this.msg.error(`${res.error}`);
      }
    }
  }
}
