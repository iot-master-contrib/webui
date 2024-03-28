import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-product-event-edit',
    standalone: true,
    imports: [],
    templateUrl: './product-event-edit.component.html',
    styleUrl: './product-event-edit.component.scss'
})
export class ProductEventEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
