import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';

@Component({
    selector: 'app-rename',
    imports: [NzInputModule, FormsModule],
    standalone: true,
    templateUrl: './rename.component.html',
    styleUrls: ['./rename.component.scss']
})
export class RenameComponent {
    @Input() currentName: string = '';
    name: string = ''
}
