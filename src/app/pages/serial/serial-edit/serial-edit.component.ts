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
    protocols: SmartSelectOption[] = []

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新串口'},
        {key: "port_name", label: "端口", type: "select", options: this.ports},
        {
            key: "protocol_name", label: "通讯协议", type: "select", options: this.protocols,
            change: () => this.loadProtocolOptions()
        },
        {key: "protocol_options", label: "通讯协议参数", type: "object"},
        {
            key: "baud_rate", label: "波特率", type: "select", default: 9600, options: [
                {label: '150', value: 150},
                {label: '200', value: 200},
                {label: '300', value: 300},
                {label: '600', value: 600},
                {label: '1200', value: 1200},
                {label: '1800', value: 1800},
                {label: '2400', value: 2400},
                {label: '4800', value: 4800},
                {label: '9600', value: 9600},
                {label: '19200', value: 19200},
                {label: '38400', value: 38400},
                {label: '57600', value: 57600},
                {label: '115200', value: 115200},
            ]
        },
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
            ], default: 8
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
        this.loadProtocols()
    }

    load() {
        this.rs.get(`serial/` + this.id).subscribe((res) => {
            this.values = res.data
            this.loadProtocolOptions()
        });
    }

    loadPorts() {
        this.rs.get(`serial/ports`).subscribe((res) => {
            this.fields[2].options = res.data.map((p: string) => {
                return {value: p, label: p}
            })
        });
    }

    loadProtocols() {
        this.rs.get(`protocol/list`).subscribe((res) => {
            //protocols
            this.fields[3].options = res.data.map((p: any) => {
                return {value: p.name, label: p.label}
            })
            //console.log(this.fields[3].options)
        });
    }

    loadProtocolOptions() {
        let protocol = this.values.protocol_name || this.form.value.protocol_name
        //this.values = this.form.value //备份数据
        if (protocol)
            this.rs.get(`protocol/${protocol}/option`).subscribe((res) => {
                this.fields[4].children = res.data
                this.form.ngOnInit()
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
