import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartEditorComponent, SmartField} from "../../../../../projects/smart/src/lib/smart-editor/smart-editor.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectsComponent} from "../../project/projects/projects.component";

@Component({
    selector: 'app-gateway-edit',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
    ],
    templateUrl: './gateway-edit.component.html',
    styleUrl: './gateway-edit.component.scss'
})
export class GatewayEditComponent implements OnInit, AfterViewInit {
    base = '/admin'
    id: any = '';

    @ViewChild('form') form!: SmartEditorComponent

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新网关'},
        {key: "keywords", label: "关键字", type: "tags", default: []},
        {key: "description", label: "说明", type: "textarea"},
        {key: "username", label: "MQTT用户名", type: "text"},
        {key: "password", label: "MQTT密码", type: "text"},
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
        this.rs.get(`gateway/${this.id}`).subscribe(res => {
            this.values = res.data
            if (res.data.project_id)
                this.fields[3].change?.(res.data.project_id)
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `gateway/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.router.navigateByUrl(`${this.base}/gateway/` + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
