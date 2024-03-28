import {Component, Input} from '@angular/core';
import {
    SmartTableColumn,
    SmartTableComponent
} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";

@Component({
    selector: 'app-product-property',
    standalone: true,
    imports: [
        SmartTableComponent
    ],
    templateUrl: './product-property.component.html',
    styleUrl: './product-property.component.scss'
})
export class ProductPropertyComponent {

    @Input() product_id!: any;
    @Input() version!: any;

    items: SmartTableColumn[] = [{
        label: '变量',
        key: 'name'
    }, {
        label: '显示名称',
        key: 'label'
    }, {
        label: '类型',
        key: 'type',
    }, {
        label: '单位',
        key: 'unit'
    }, {
        label: '模式',
        key: 'mode',
    }]

    properties: any = []

    constructor(private rs: RequestService) {
    }

    ngOnInit(): void {
    }


    load() {
        this.rs.get(`product/${this.product_id}/version/${this.version}/config/property`).subscribe(res => {
            this.properties = res.data
        })
    }
}
