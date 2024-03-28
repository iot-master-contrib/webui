import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-product-action',
    standalone: true,
    imports: [],
    templateUrl: './product-action.component.html',
    styleUrl: './product-action.component.scss'
})
export class ProductActionComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
