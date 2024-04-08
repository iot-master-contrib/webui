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

@Component({
    selector: 'app-servers-edit',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
    ],
    templateUrl: './server-edit.component.html',
    styleUrls: ['./server-edit.component.scss'],
})
export class ServerEditComponent implements OnInit {
    id: any = '';

    @ViewChild('form') form!: SmartEditorComponent

    protocols: SmartSelectOption[] = []

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新服务端'},
        {key: "port", label: "端口", type: "number", min: 1, max: 65535, default: 60000},
        {
            key: "protocol_name", label: "通讯协议", type: "select", options: this.protocols,
            change: (p: any) => this.loadProtocolOptions(p)
        },
        {key: "protocol_options", label: "通讯协议参数", type: "object"},
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
        this.loadProtocols()
    }

    load() {
        this.rs.get(`server/` + this.id).subscribe((res) => {
            this.values = res.data
            this.loadProtocolOptions(this.values.protocol_name)
        });
    }


    loadProtocols() {
        this.rs.get(`protocol/list`).subscribe((res) => {
            this.fields[3].options = res.data.map((p: any) => {
                return {value: p.name, label: p.label}
            })
        });
    }

    loadProtocolOptions(protocol: string) {
        if (protocol)
            this.rs.get(`protocol/${protocol}/option`).subscribe((res) => {
                this.fields[4].children = res.data
                this.form.group.setControl("protocol_options", this.form.build(res.data, this.form.value.protocol_options))
            });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `server/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.router.navigateByUrl('/admin/server/' + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
