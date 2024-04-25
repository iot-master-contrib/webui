import {Component} from '@angular/core';
import {CountComponent} from "../../widgets/count/count.component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent} from "ng-zorro-antd/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SmartEditorComponent} from "iot-master-smart";
import {InputProductComponent} from "../../components/input-product/input-product.component";

@Component({
    selector: 'app-dash',
    standalone: true,
    imports: [
        CountComponent,
        NzRowDirective,
        NzColDirective,
        NzCardComponent,
        FormsModule,
        SmartEditorComponent,
        InputProductComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss'
})
export class DashComponent {

}
