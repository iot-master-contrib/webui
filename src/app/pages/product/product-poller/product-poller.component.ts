import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-poller',
  standalone: true,
  imports: [],
  templateUrl: './product-poller.component.html',
  styleUrl: './product-poller.component.scss'
})
export class ProductPollerComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
