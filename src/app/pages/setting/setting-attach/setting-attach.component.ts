import {Component, ViewContainerRef} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {RequestService} from '../../../../../projects/smart/src/request.service';
import {RenameComponent} from './rename/rename.component';
import {UploadComponent} from './upload/upload.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {FormsModule} from '@angular/forms';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NgModule} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {DatePipe} from '@angular/common';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzImageModule} from 'ng-zorro-antd/image';

@Component({
  selector: 'app-setting-attach',
  standalone: true,
  imports: [NzImageModule, NzPopconfirmModule, NzModalModule, NzButtonModule, CommonModule, NzIconModule, NzSpinModule, NzTableModule, NzUploadModule, NzDividerModule, FormsModule, NzSwitchModule, NzInputModule, NzSpaceModule],
  templateUrl: './setting-attach.component.html',
  styleUrl: './setting-attach.component.scss'
})
export class SettingAttachComponent {
  loading = false;
  inputValue = '';
  queryName = '';
  datum: any[] = []
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  query: any = {}
  fromIframe = true;

  constructor(
    private rs: RequestService,
    private modal: NzModalService,
    private msg: NzMessageService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.load();
  }

  load() {
    this.loading = true
    this.rs.get(`attach/list`, {}).subscribe(res => {
      const {data, total} = res;
      this.datum = data || [];
      this.total = total || 0;
    }).add(() => {
      this.loading = false;
    })
  }

  delete(name: number, size?: number) {
    this.rs.get(`attach/remove/${this.queryName}/${name}`).subscribe(res => {
      this.msg.success("删除成功");
      this.load();
    })
  }

  cancel() {
  }

  search() {
    this.query.keyword = {};
    this.query.skip = 0;
    this.datum = [];
    this.inputValue = this.queryName;
    this.load();
  }

  handleRedictTo(url: string) {
    this.queryName = this.queryName ? `${this.queryName}/${url}` : url;
    this.search();
  }

  handleUpload() {
    this.modal.create({
      nzTitle: '上传文件',
      nzContent: UploadComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        inputValue: this.queryName,
      },
      // nzComponentParams: {
      //   inputValue: this.queryName,
      // },
      nzFooter: null,
      nzOnCancel: ({isSuccess}) => {
        if (isSuccess) {
          this.load();
        }
      }
    });
  }

  handleRename(currentName: string) {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '重命名',
      nzContent: RenameComponent,
      nzData: {
        currentName
      },
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: [
        {
          label: '取消',
          onClick: () => modal.destroy()
        },
        {
          label: '保存',
          type: 'primary',
          onClick: () => {
            const comp = modal.getContentComponent();
            this.rs.post(`attach/rename/${this.queryName ? this.queryName + '/' : ''}${currentName}`, {name: comp.name}).subscribe(res => {
              this.msg.success("保存成功");
              modal.destroy();
              this.load();
            })
          }
        },
      ]
    });
  }

  handleSrc(name: string) {
    const link = this.inputValue ? `${this.inputValue}/` : '';
    return `/attach/${link}${name}`;
  }

  handleOpenLink(name: string) {
    window.open(this.handleSrc(name))
  }

  getMatched(mime: string) {
    const reg = mime.match(/image|video|word|powerpoint|excel|text|zip|pdf|html|flash|exe|xml|psd/g)
    return reg ? reg[0] : 'unknown';
  }

  handleCopy(name: string) {
    const url = this.handleSrc(name);
    // navigator && navigator.clipboard && navigator.clipboard.writeText(url).then(res => {
    //   this.msg.success('复制成功');
    // }).catch(err => { })
    this.msg.success('复制成功');
    const inputEle = document.createElement('input');
    inputEle.value = url;
    inputEle.setAttribute('readonly', '');
    document.body.appendChild(inputEle);
    inputEle.select();
    document.execCommand('copy');
    document.body.removeChild(inputEle);
  }

  handlePre() {
    const arr = this.queryName.split('/');
    arr.pop();
    this.queryName = arr.join('/');
    this.search();
  }

  handleDownLoad(name: string) {
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = name;
    a.href = this.handleSrc(name);
    a.dispatchEvent(event)
  }

  handleSelect(name: string) {
    const url = this.handleSrc(name);
    console.log("🚀 ~ file: attachment.component.ts:145 ~ AttachmentComponent ~ handleSelect ~ url:", url)
    window.top?.postMessage(url);
  }
}
