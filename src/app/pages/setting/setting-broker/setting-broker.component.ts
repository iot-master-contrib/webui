import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {RequestService} from 'iot-master-smart';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartEditorComponent, SmartField} from "iot-master-smart";

@Component({
    selector: 'app-setting-broker',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
    ],
    templateUrl: './setting-broker.component.html',
    styleUrl: './setting-broker.component.scss'
})
export class SettingBrokerComponent implements OnInit {

    @ViewChild('form') form!: SmartEditorComponent

    fields: SmartField[] = [
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
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `setting/broker`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.msg.success('保存成功');
        });
    }
}
