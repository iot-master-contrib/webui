import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {
    SmartEditorComponent,
    SmartField
} from "../../../../../projects/smart/src/lib/smart-editor/smart-editor.component";
import {GatewaysComponent} from "../../gateway/gateways/gateways.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectsComponent} from "../../project/projects/projects.component";
import {ProductsComponent} from "../../product/products/products.component";
import {ProductVersionComponent} from "../../product/product-version/product-version.component";
import {InputProductComponent} from "../../../components/input-product/input-product.component";
import {InputGatewayComponent} from "../../../components/input-gateway/input-gateway.component";
import {InputProjectComponent} from "../../../components/input-project/input-project.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputVersionComponent} from "../../../components/input-version/input-version.component";

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
        InputVersionComponent,
    ],
    templateUrl: './device-edit.component.html',
    styleUrl: './device-edit.component.scss',
})
export class DeviceEditComponent implements OnInit, AfterViewInit {
    base = '/admin'
    project_id: any = '';
    id: any = '';

    data: any = {}

    @ViewChild('form') form!: SmartEditorComponent
    @ViewChild("chooseGateway") chooseGateway!: TemplateRef<any>
    @ViewChild("chooseProduct") chooseProduct!: TemplateRef<any>
    @ViewChild("chooseVersion") chooseVersion!: TemplateRef<any>
    @ViewChild("chooseProject") chooseProject!: TemplateRef<any>

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新设备'},
        {key: "keywords", label: "关键字", type: "tags", default: []},
        {key: "gateway_id", label: "网关", type: "template",},
        {key: "product_id", label: "产品", type: "template",},
        {key: "product_version", label: "版本", type: "template",},
        {key: "project_id", label: "项目", type: "template",},
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
        if (this.route.parent?.snapshot.paramMap.has('project')) {
            this.project_id = this.route.parent.snapshot.paramMap.get('project');
            this.base = `/project/${this.project_id}`
        }
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.load()
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.fields[3].template = this.chooseGateway
            this.fields[4].template = this.chooseProduct
            this.fields[5].template = this.chooseVersion
            this.fields[6].template = this.chooseProject

            setTimeout(() => {
                if (this.project_id) {
                    this.data.project_id = this.project_id
                    this.form.patchValue({project_id: this.project_id})
                    this.form.group.get('project_id')?.disable()
                }
            }, 10)
        }, 10)


    }


    load() {
        this.rs.get(`device/${this.id}`).subscribe(res => {
            this.values = res.data
            if (res.data.gateway_id)
                this.fields[3].change?.(res.data.gateway_id)
            if (res.data.product_id)
                this.fields[4].change?.(res.data.product_id)
            if (res.data.project_id)
                this.fields[6].change?.(res.data.project_id)
        });
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
