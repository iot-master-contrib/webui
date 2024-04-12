import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestService} from "iot-master-smart";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {
    SmartEditorComponent,
    SmartField
} from "iot-master-smart";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
    selector: 'app-product-event-edit',
    standalone: true,
    imports: [
        SmartEditorComponent,
        NzButtonComponent,
        NzCardComponent,
    ],
    templateUrl: './product-event-edit.component.html',
    styleUrl: './product-event-edit.component.scss'
})
export class ProductEventEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

    @ViewChild("editor") editor!: SmartEditorComponent;

    arguments: SmartField[] = [
        {label: '变量', key: 'name', type: 'text'},
        {label: '名称', key: 'label', type: 'text'},
        {
            label: '类型', key: 'type', type: 'select', default: 'int',
            options: [
                {label: '整数', value: 'int'},
                {label: '浮点数', value: 'float'},
                {label: '布尔型', value: 'bool'},
                {label: '字符串', value: 'text'},
                //{label: '枚举', value: 'enum'},
                {label: '数组', value: 'array'},
                {label: '对象', value: 'object'}
            ]
        }
    ]

    values: any = {}
    fields: SmartField[] = [
        {
            label: '', key: 'events', type: 'list',
            children: [
                {label: '等级', key: 'level', type: 'number'},
                {label: '事件', key: 'name', type: 'text'},
                {label: '名称', key: 'label', type: 'text'},
                {label: '输出', key: 'outputs', type: 'table', children: this.arguments},
            ]
        },
    ]


    constructor(private rs: RequestService, private ms: NzNotificationService) {

    }

    ngOnInit(): void {
        this.rs.get(`product/${this.product_id}/version/${this.version}/config/event`).subscribe(res => {
            this.values = {events: res.data || []}
        })
    }

    onSubmit() {
        let value = this.editor.value
        this.rs.post(`product/${this.product_id}/version/${this.version}/config/event`, value.events).subscribe(res => {
            this.ms.success("提示", "保存成功")
        })
    }

}
