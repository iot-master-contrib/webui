import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-version-action-edit',
    standalone: true,
    imports: [],
    templateUrl: './version-action-edit.component.html',
    styleUrl: './version-action-edit.component.scss'
})
export class VersionActionEditComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
