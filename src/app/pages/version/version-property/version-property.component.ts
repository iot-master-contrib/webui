import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-version-property',
  standalone: true,
  imports: [],
  templateUrl: './version-property.component.html',
  styleUrl: './version-property.component.scss'
})
export class VersionPropertyComponent {
  @Input() product_id!: any;
  @Input() version!: any;

}
