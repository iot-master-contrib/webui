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
import {NzModalService} from "ng-zorro-antd/modal";
import {InputProjectComponent} from "../../../components/input-project/input-project.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetParentRouteParam, GetParentRouteUrl} from "../../../app.routes";

@Component({
    selector: 'app-space-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
        InputProjectComponent,
    ],
    templateUrl: './space-edit.component.html',
    styleUrl: './space-edit.component.scss',
})
export class SpaceEditComponent implements OnInit, AfterViewInit {
    base = '/admin'
    project_id: any = '';
    id: any = '';

    @ViewChild('form') form!: SmartEditorComponent
    @ViewChild("chooseProject") chooseProject!: TemplateRef<any>

    fields: SmartField[] = []

    build() {
        this.fields = [
            {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
            {key: "name", label: "名称", type: "text", required: true, default: '新空间'},
            {key: "project_id", label: "项目", type: "template", template: this.chooseProject},
            {key: "description", label: "说明", type: "textarea"},
        ]
    }

    data: any = {}

    constructor(private router: Router,
                private ms: NzModalService,
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
    }

    ngAfterViewInit(): void {
        this.build()
        if (this.project_id) {
            this.form.patchValue({project_id: this.project_id})
            this.form.group.get('project_id')?.disable()
        }
    }

    load() {
        this.rs.get(`space/${this.id}`).subscribe((res) => {
            this.data = res.data
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `space/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.router.navigateByUrl(`${this.base}/space/` + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
