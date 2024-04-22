import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import {InputProductComponent} from "../../../components/input-product/input-product.component";
import {InputGatewayComponent} from "../../../components/input-gateway/input-gateway.component";
import {InputProjectComponent} from "../../../components/input-project/input-project.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTunnelComponent} from "../../../components/input-tunnel/input-tunnel.component";
import {GetParentRouteParam, GetParentRouteUrl} from "../../../app.routes";

@Component({
    selector: 'app-device-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
        InputProductComponent,
        InputGatewayComponent,
        InputProjectComponent,
        InputTunnelComponent,
    ],
    templateUrl: './device-edit.component.html',
    styleUrl: './device-edit.component.scss',
})
export class DeviceEditComponent implements OnInit, AfterViewInit {
    base = '/admin'

    project_id: any = '';
    tunnel_id: any = '';
    id: any = '';

    data: any = {}

    @ViewChild('form') form!: SmartEditorComponent
    @ViewChild("chooseProduct") chooseProduct!: TemplateRef<any>
    @ViewChild("chooseProject") chooseProject!: TemplateRef<any>
    @ViewChild("chooseTunnel") chooseTunnel!: TemplateRef<any>

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新设备'},
    ]

    build() {
        this.fields = [
            {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
            {key: "name", label: "名称", type: "text", required: true, default: '新设备'},
            {key: "keywords", label: "关键字", type: "tags", default: []},
            {
                key: "product_id", label: "产品", type: "template", template: this.chooseProduct,
                change: () => setTimeout(()=>this.loadProtocolStation())
            },
            {key: "project_id", label: "项目", type: "template", template: this.chooseProject},
            {key: "tunnel_id", label: "通道", type: "template", template: this.chooseTunnel},
            {key: "station", label: "从站", type: "object"},
            {key: "description", label: "说明", type: "textarea"},
        ]
    }

    values: any = {}


    constructor(private router: Router,
                private msg: NzMessageService,
                private rs: RequestService,
                private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.base = GetParentRouteUrl(this.route)
        this.project_id ||= GetParentRouteParam(this.route, "project")

        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.load()
        }
        if (this.route.snapshot.paramMap.has('tunnel_id')) {
            this.tunnel_id = this.route.snapshot.paramMap.get('tunnel_id');
        }
    }

    ngAfterViewInit(): void {
        //this.build()
        setTimeout(()=> {
            this.build()

            if (this.project_id) {
                this.data.project_id = this.project_id
                this.form.patchValue({project_id: this.project_id})
                this.form.group.get('project_id')?.disable()
            }
            if (this.tunnel_id) {
                this.data.tunnel_id = this.tunnel_id
                this.form.patchValue({tunnel_id: this.tunnel_id})
                this.form.group.get('tunnel_id')?.disable()
            }

        }, 100)
    }


    load() {
        this.rs.get(`device/${this.id}`).subscribe(res => {
            this.values = res.data
            this.loadProtocolStation()
        });
    }

    loadProtocolStation() {
        console.log("loadProtocolStation", this.form.value)
        this.values = this.form.value

        let product_id = this.form.value.product_id
        if (product_id) {
            this.rs.get(`product/${product_id}`).subscribe(res => {
                let product = res.data
                this.rs.get(`protocol/${product.protocol}/station`).subscribe(res => {
                    if (res.data) {
                        this.fields[7].children = res.data
                        this.form.ngOnInit()
                    }
                })
            });
        }
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `device/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.router.navigateByUrl(`${this.base}/device/` + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
