import {Component, Input, ViewChild} from '@angular/core';
import {
    SmartEditorComponent,
    SmartField
} from "iot-master-smart";
import {RequestService} from "iot-master-smart";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-product-poller-edit',
  standalone: true,
    imports: [
        NzButtonComponent,
        NzCardComponent,
        SmartEditorComponent
    ],
  templateUrl: './product-poller-edit.component.html',
  styleUrl: './product-poller-edit.component.scss'
})
export class ProductPollerEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

    @ViewChild("editor") editor!: SmartEditorComponent;

    values: any = {}
    fields: SmartField[] = [
        {label: '', key: 'pollers', type: 'table', children: []},
    ]


    constructor(private rs: RequestService, private ms: NzNotificationService) {

    }

    ngOnInit(): void {
        this.rs.get(`product/${this.product_id}`).subscribe(res=>{
            let protocol = res.data.protocol
            this.rs.get(`protocol/${protocol}/poller`).subscribe(res=>{
                this.fields[0].children = res.data
                this.rs.get(`product/${this.product_id}/version/${this.version}/config/poller`).subscribe(res => {
                    this.values = {pollers: res.data || []}
                })
            })
        })
    }

    onSubmit() {
        let value = this.editor.value
        this.rs.post(`product/${this.product_id}/version/${this.version}/config/poller`, value.pollers).subscribe(res => {
            this.ms.success("提示", "保存成功")
        })
    }


}
