import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
    SmartEditorComponent,
    SmartField
} from "../../../../../projects/smart/src/lib/smart-editor/smart-editor.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
    selector: 'app-product-mapper-edit',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzCardComponent,
        SmartEditorComponent
    ],
    templateUrl: './product-mapper-edit.component.html',
    styleUrl: './product-mapper-edit.component.scss'
})
export class ProductMapperEditComponent implements OnInit {
    @Input() product_id!: any;
    @Input() version!: any;

    @ViewChild("editor") editor!: SmartEditorComponent;

    values: any = {}
    fields: SmartField[] = [
        {label: '', key: 'mappers', type: 'table', children: []},
    ]


    constructor(private rs: RequestService, private ms: NzNotificationService) {

    }

    ngOnInit(): void {
        this.rs.get(`product/${this.product_id}`).subscribe(res=>{
            let protocol = res.data.protocol
            this.rs.get(`protocol/${protocol}/mapper`).subscribe(res=>{
                this.fields[0].children = res.data
                this.rs.get(`product/${this.product_id}/version/${this.version}/config/mapper`).subscribe(res => {
                    this.values = {mappers: res.data || []}
                })
            })
        })
    }

    onSubmit() {
        let value = this.editor.value
        this.rs.post(`product/${this.product_id}/version/${this.version}/config/mapper`, value.mappers).subscribe(res => {
            this.ms.success("提示", "保存成功")
        })
    }

}
