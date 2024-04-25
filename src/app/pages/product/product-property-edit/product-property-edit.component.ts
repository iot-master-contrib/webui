import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestService, SmartEditorComponent, SmartField} from "iot-master-smart";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
    selector: 'app-product-property-edit',
    standalone: true,
    imports: [
        SmartEditorComponent,
        NzButtonComponent,
        NzCardComponent,
    ],
    templateUrl: './product-property-edit.component.html',
    styleUrl: './product-property-edit.component.scss'
})
export class ProductPropertyEditComponent implements OnInit {
    @Input() product_id!: any;

    @ViewChild("editor") editor!: SmartEditorComponent;

    data: any = {}
    fields: SmartField[] = [
        {
            label: '', key: 'properties', type: 'table',
            children: [
                {label: '变量', key: 'name', type: 'text'},
                {label: '名称', key: 'label', type: 'text'},
                {
                    label: '类型',
                    key: 'type',
                    type: 'select',
                    default: 'int',
                    options: [
                        {label: '整数', value: 'int'},
                        {label: '浮点数', value: 'float'},
                        {label: '布尔型', value: 'bool'},
                        {label: '字符串', value: 'text'},
                        //{label: '枚举', value: 'enum'},
                        {label: '数组', value: 'array'},
                        {label: '对象', value: 'object'}
                    ]
                },
                {label: '单位', key: 'unit', type: 'text'},
                {
                    label: '模式', key: 'mode', type: 'select', default: 'r',
                    options: [
                        {label: '只读', value: 'r'},
                        {label: '读写', value: 'rw'}
                    ]
                }
            ]
        },
    ]


    constructor(private rs: RequestService, private ms: NzNotificationService) {

    }

    ngOnInit(): void {
        this.rs.get(`product/${this.product_id}/config/property`).subscribe(res => {
            this.data = {properties: res.data || []}
        })
    }

    onSubmit() {
        let value = this.editor.value
        this.rs.post(`product/${this.product_id}/config/property`, value.properties).subscribe(res => {
            this.ms.success("提示", "保存成功")
        })
    }

}
