import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from 'iot-master-smart';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {
    SmartEditorComponent,
    SmartField
} from "iot-master-smart";
import {NzModalService} from "ng-zorro-antd/modal";


@Component({
    selector: 'app-broker-edit',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
    ],
    templateUrl: './broker-edit.component.html',
    styleUrl: './broker-edit.component.scss'
})
export class BrokerEditComponent implements OnInit, AfterViewInit {
    id: any = '';

    @ViewChild('form') form!: SmartEditorComponent

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新MQTT服务器'},
        {key: "port", label: "端口", type: "number", default: 1883, min: 100, max: 65535},
        {key: "description", label: "说明", type: "textarea"},
        {key: "disabled", label: "禁用", type: "switch"},
    ]

    values: any = {}


    constructor(private router: Router,
                private ms: NzModalService,
                private msg: NzMessageService,
                private rs: RequestService,
                private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.load()
        }
    }

    ngAfterViewInit(): void {
    }


    load() {
        this.rs.get(`broker/${this.id}`).subscribe(res => {
            this.values = res.data
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `broker/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.router.navigateByUrl(`/admin/broker/` + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
