import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-product-action-edit',
    standalone: true,
    imports: [],
    templateUrl: './product-action-edit.component.html',
    styleUrl: './product-action-edit.component.scss'
})
export class ProductActionEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
