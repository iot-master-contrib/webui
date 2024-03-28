import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-mapper',
  standalone: true,
  imports: [],
  templateUrl: './product-mapper.component.html',
  styleUrl: './product-mapper.component.scss'
})
export class ProductMapperComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
