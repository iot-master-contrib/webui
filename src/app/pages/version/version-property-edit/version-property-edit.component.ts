import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzTableModule} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {NgForOf} from "@angular/common";
import {
    SmartTableEditComponent,
    SmartTableEditItem
} from "../../../../../projects/smart/src/lib/smart-table-edit/smart-table-edit.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
    selector: 'app-version-property-edit',
    standalone: true,
    imports: [
        FormsModule,
        NzButtonComponent,
        NzColDirective,
        NzFormControlComponent,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzIconDirective,
        NzInputDirective,
        NzTableModule,
        NzPageHeaderComponent,
        NzPageHeaderExtraDirective,
        NzPageHeaderSubtitleDirective,
        NzPageHeaderTitleDirective,
        NzRowDirective,
        NzSelectComponent,
        NzSpaceComponent,
        NzTextareaCountComponent,
        NzUploadComponent,
        ReactiveFormsModule,
        NzSpaceItemDirective,
        CdkDropList,
        NgForOf,
        CdkDrag,
        CdkDragHandle,
        SmartTableEditComponent
    ],
    templateUrl: './version-property-edit.component.html',
    styleUrl: './version-property-edit.component.scss'
})
export class VersionPropertyEditComponent implements OnInit {

    properties: any = []

    @Input() product_id!: any;
    @Input() version!: any;

    group!: FormGroup;

    items: SmartTableEditItem[] = [{
        label: '变量',
        key: 'name'
    }, {
        label: '显示名称',
        key: 'label'
    }, {
        label: '类型',
        key: 'type',
        type: 'select',
        default: 'int',
        options: [{
            label: '整数',
            value: 'int'
        }, {
            label: '浮点数',
            value: 'float'
        }, {
            label: '布尔型',
            value: 'bool'
        }, {
            label: '字符串',
            value: 'text'
        },
            //   {
            //   label: '枚举',
            //   value: 'enum'
            // }, {
            //   label: '数组',
            //   value: 'array'
            // }, {
            //   label: '对象',
            //   value: 'object'
            // }
        ]
    }, {
        label: '单位',
        key: 'unit'
    }, {
        label: '模式',
        key: 'mode',
        type: 'select',
        default: 'r',
        options: [{
            label: '只读',
            value: 'r'
        }, {
            label: '读写',
            value: 'rw'
        }]
    }]

    constructor(private fb: FormBuilder, private rs: RequestService, private ms: NzNotificationService) {
        this.build()
    }

    ngOnInit(): void {
        this.rs.get(`product/${this.product_id}/version/${this.version}/config/property`).subscribe(res => {
            //console.log("test", res)
            this.properties = res.data
            this.build()
        })
    }

    build() {
        this.group = this.fb.group({
            properties: [this.properties || [], []]
        })
    }

    onSubmit() {
        let value = this.group.value
        this.rs.post(`product/${this.product_id}/version/${this.version}/config/property`, value.properties).subscribe(res => {
            this.ms.success("提示", "保存成功")
            //this.router.navigateByUrl("/admin/product/" + this.id + "/edit")
        })
    }

}
