import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-version-event-edit',
  standalone: true,
  imports: [],
  templateUrl: './version-event-edit.component.html',
  styleUrl: './version-event-edit.component.scss'
})
export class VersionEventEditComponent {
  @Input() product_id!: any;
  @Input() version!: any;

}
