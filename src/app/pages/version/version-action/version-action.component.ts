import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-version-action',
    standalone: true,
    imports: [],
    templateUrl: './version-action.component.html',
    styleUrl: './version-action.component.scss'
})
export class VersionActionComponent {
    @Input() product_id!: any;
    @Input() version!: any;

}
