import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {CountComponent} from "../../widgets/count/count.component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent} from "ng-zorro-antd/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SmartEditorComponent, SmartField} from "../../../../projects/smart/src/lib/smart-editor/smart-editor.component";
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
export class DashComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.fields[1].template = this.test
        })

    }

    @ViewChild('test') test!: TemplateRef<any>
    @ViewChild('editor') editor!: SmartEditorComponent

    fields: SmartField[] = [
        {key: 'test', type: 'text', label: 'test'},
        {key: 'zzz', type: 'template', label: 'zzz', template: this.test},
        {
            key: 'abc', type: 'table', label: 'abc', children: [
                {key: 'a', type: 'number', label: 'A'},
                {key: 'b', type: 'number', label: 'B'},
                {
                    key: 'c', type: 'table', label: 'def', children: [
                        {key: 'd', type: 'number', label: 'D'},
                        {key: 'e', type: 'number', label: 'E'},
                    ]
                },
                {
                    key: 'f', type: 'object', label: 'C', children: [
                        {key: 'a', type: 'number', label: 'A'},
                        {key: 'b', type: 'number', label: 'B'},
                    ]
                },
            ]
        },
    ]
    values: any = {
        test: '张杰一',
        abc: [{
            a: 1,
            b: 2,
            f: {a: 2, b: 3}
        }]
    }


}
