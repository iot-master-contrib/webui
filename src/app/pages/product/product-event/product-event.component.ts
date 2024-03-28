import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-product-event',
    standalone: true,
    imports: [],
    templateUrl: './product-event.component.html',
    styleUrl: './product-event.component.scss'
})
export class ProductEventComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
