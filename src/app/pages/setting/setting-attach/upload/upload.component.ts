import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzInputModule} from 'ng-zorro-antd/input';
import {RequestService} from '../../../../../../projects/smart/src/lib/request.service';

// , FileUploadModule
@Component({
    selector: 'app-upload',
    imports: [FormsModule, NzUploadModule, NzInputModule],
    standalone: true,
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})

export class UploadComponent {
    group!: FormGroup;
    name!: '';

    isSuccess: boolean = false

    @Input() set inputValue(value: any) {
        this.name = value || '';
    }

    @Output() load = new EventEmitter<number>();

    constructor(
        private msg: NzMessageService
    ) {

        this.isSuccess = false;

    }

    handleUpload(info: any): void {
        if (info.type === 'error') {
            this.msg.error(`上传失败`);
            return;
        }
        if (info.file && info.file.response) {
            const res = info.file.response;
            if (!res.error) {
                this.msg.success(`上传成功!`);
                // this.onLoad.emit();
            } else {
                this.msg.error(`${res.error}`);
            }
        }
    }


}
