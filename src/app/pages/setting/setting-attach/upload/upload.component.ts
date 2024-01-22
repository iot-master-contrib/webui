import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent {
  group!: FormGroup;
  name!: '';
  uploader: FileUploader;
  isSuccess: boolean = false
  @Input() set inputValue(value: any){
    this.name = value || '';
  }
  @Output() load = new EventEmitter<number>();

  constructor(
    private msg: NzMessageService
  ) {
    this.uploader = new FileUploader({
      url: `api/attach/upload/`,
      method: "POST",  //上传方式
      autoUpload: true
    });
    this.isSuccess = false;
    this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
    this.uploader.onSuccessItem = this.onSuccessItem.bind(this);
  }
  onAfterAddingFile(fileItem: FileItem): any {
    this.uploader.setOptions({
      url: `api/attach/upload/${this.name || ''}`,
    })
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const res = JSON.parse(response);
    if (res.error) {
      this.msg.error(res.error)
      this.uploader.clearQueue();
    } else {
      this.msg.success('上传成功!');
      this.isSuccess = true;
      this.load.emit();
    }
  }
}
