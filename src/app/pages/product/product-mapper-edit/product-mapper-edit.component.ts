import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-mapper-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-mapper-edit.component.html',
  styleUrl: './product-mapper-edit.component.scss'
})
export class ProductMapperEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
