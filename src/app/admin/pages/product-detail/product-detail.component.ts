import { Component } from '@angular/core';
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NzPageHeaderComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

}
