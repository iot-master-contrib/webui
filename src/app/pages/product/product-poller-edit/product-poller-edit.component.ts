import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-poller-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-poller-edit.component.html',
  styleUrl: './product-poller-edit.component.scss'
})
export class ProductPollerEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
