import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from 'iot-master-smart';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartEditorComponent, SmartField} from "iot-master-smart";

@Component({
    selector: 'app-project-edit',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
    ],
    templateUrl: './project-edit.component.html',
    styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent implements OnInit {
    project_id!: any;
    id: any = '';

    @ViewChild('form') form!: SmartEditorComponent

    fields: SmartField[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新项目'},
        {key: "keywords", label: "关键字", type: "tags", default: []},
        {key: "version", label: "版本", type: "text"},
        {key: "url", label: "链接", type: "text"},
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
            this.project_id = this.id = this.route.parent?.snapshot.paramMap.get('project');
        }
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
        }
        if (this.id) {
            this.load()
        }
    }

    load() {
        this.rs.get(`project/` + this.id).subscribe((res) => {
            this.values = res.data
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `project/${this.id || 'create'}`
        this.rs.post(url, this.form.value).subscribe((res) => {
            if (this.project_id)
                this.router.navigateByUrl(`/project/${this.project_id}/detail`);
            else
                this.router.navigateByUrl(`/admin/project/` + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
