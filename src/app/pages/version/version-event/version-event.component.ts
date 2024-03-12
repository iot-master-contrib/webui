import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-version-event',
  standalone: true,
  imports: [],
  templateUrl: './version-event.component.html',
  styleUrl: './version-event.component.scss'
})
export class VersionEventComponent {
  @Input() product_id!: any;
  @Input() version!: any;

}
