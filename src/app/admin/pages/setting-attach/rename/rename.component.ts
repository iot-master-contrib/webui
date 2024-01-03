import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rename',
  imports: [FormsModule],
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.scss']
})
export class RenameComponent {
  @Input() currentName: string = '';
  name: string = ''
}
