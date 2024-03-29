import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RequestService} from '../../../../../projects/smart/src/lib/request.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartFormComponent, SmartFormItem} from "../../../../../projects/smart/src/lib/smart-form/smart-form.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectsComponent} from "../../project/projects/projects.component";

@Component({
    selector: 'app-space-edit',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartFormComponent,
    ],
    templateUrl: './space-edit.component.html',
    styleUrl: './space-edit.component.scss',
})
export class SpaceEditComponent implements OnInit, AfterViewInit {
    base = '/admin'
    project_id: any = '';
    id: any = '';

    @ViewChild('form') form!: SmartFormComponent

    fields: SmartFormItem[] = [
        {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
        {key: "name", label: "名称", type: "text", required: true, default: '新空间'},
        {
            key: "project_id", label: "项目", type: "choose",
            choose: () => {
                this.ms.create({
                    nzTitle: "选择", nzContent: ProjectsComponent,
                }).afterClose.subscribe(res => {
                    if (res) {
                        this.form.patchValues({project_id: res.id})
                        this.fields[2].tips = res.name
                    }
                })
            },
            change: id => {
                this.rs.get('project/' + id, {field: 'name'}).subscribe(res => {
                    this.fields[2].tips = res.data?.name || ''
                })
            }
        },
        {key: "description", label: "说明", type: "textarea"},
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
        if (this.project_id) {
            this.form.patchValues({project_id: this.project_id})
            this.form.group.get('project_id')?.disable()
            this.fields[2].disabled = true
        }
    }


    load() {
        this.rs.get(`space/${this.id}`).subscribe((res) => {
            this.values = res.data
            if (res.data.project_id)
                this.fields[2].change?.(res.data.project_id)
        });
    }

    onSubmit() {
        if (!this.form.Validate()) {
            this.msg.error('请检查数据')
            return
        }

        let url = `space/${this.id || 'create'}`
        this.rs.post(url, this.form.Value()).subscribe((res) => {
            this.router.navigateByUrl(`${this.base}/space/` + res.data.id);
            this.msg.success('保存成功');
        });
    }
}
