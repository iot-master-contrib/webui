import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {
    SmartEditorComponent,
    SmartField,
    SmartSelectOption
} from "../../../../../projects/smart/src/lib/smart-editor/smart-editor.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";
import {NzSelectOptionInterface} from "ng-zorro-antd/select/select.types";

@Component({
    selector: 'app-serial-edit',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
    ],
    templateUrl: './serial-edit.component.html',
    styleUrls: ['./serial-edit.component.scss'],
})
export class SerialEditComponent implements OnInit {
    id: any = '';

    @ViewChild('form') form!: SmartEditorComponent

    ports: SmartSelectOption[] = []

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新串口'},
        {key: "port", label: "端口", type: "select", options: this.ports},
        {key: "poller_period", label: "采集周期", type: "number", min: 0},
        {key: "poller_interval", label: "采集间隔", type: "number", min: 0},
        {
            key: "protocol_name", label: "通讯协议", type: "select", options: [
                {label: 'Modbus RTU', value: 'modbus-rtu'},
                {label: 'Modbus TCP', value: 'modbus-tcp'},
            ]
        },
        {key: "retry_timeout", label: "重连超时", type: "number", min: 0},
        {key: "retry_maximum", label: "重连最大次数", type: "number", min: 0},
        {key: "baud_rate", label: "波特率", type: "number"},
        {
            key: "parity_mode", label: "奇偶校验", type: "select", options: [
                {label: '无校验 NONE', value: 0},
                {label: '奇校验 ODD', value: 1},
                {label: '偶校验 EVEN', value: 2},
                {label: '1校验 MARK', value: 3},
                {label: '0校验 SPACE', value: 4},
            ]
        },
        {
            key: "stop_bits", label: "停止位", type: "select", options: [
                {label: '1', value: 1},
                {label: '1.5', value: 1.5, disabled: true},
                {label: '2', value: 2},
            ]
        },
        {
            key: "data_bits", label: "字长", type: "select", options: [
                {label: '5', value: 5},
                {label: '6', value: 6},
                {label: '7', value: 7},
                {label: '8', value: 8},
            ]
        },
        {key: "description", label: "说明", type: "textarea"},
    ]

    values: any = {}


    constructor(private router: Router,
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
        this.loadPorts()
    }

    load() {
        this.rs.get(`serial/` + this.id).subscribe((res) => {
            this.values = res.data
        });
    }

    loadPorts() {
        this.rs.get(`serial/ports`).subscribe((res) => {
            // res.data.forEach((p: any) => {
            //     this.ports.push({value: p, label: p})
            //     //this.ports.push({value: p.name, label: p.label})
            // })
            this.fields[2].options = res.data.map((p:string)=>{return {value: p, label: p}})
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `serial/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.router.navigateByUrl('/admin/serial/' + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
