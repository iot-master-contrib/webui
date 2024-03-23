import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {RequestService} from "../../../../projects/smart/src/lib/request.service";
import {WebViewComponent} from "../web-view/web-view.component";

@Component({
    selector: 'app-plugin-pages',
    standalone: true,
    imports: [
        CommonModule,
        NzTabsModule,
        WebViewComponent,
    ],
    templateUrl: './plugin-pages.component.html',
    styleUrl: './plugin-pages.component.scss'
})
export class PluginPagesComponent implements OnInit {
    @Input() target!: string
    //@Input() select: string[] = []
    @Input() object: {[p:string]:any} = {}

    _params = ''
    @Input() set params(ps: any) {
        this._params = Object.keys(ps)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(ps[key])}`)
            .join('&');
    }


    plugins: any = []

    constructor(private rs: RequestService) {
    }


    ngOnInit(): void {
        this.load()
    }

    load() {
        this.rs.get("plugin/pages/" + this.target).subscribe(res => {
            res.data?.forEach((p: any)=>{
                if (p.select) {
                    p.select.forEach((s:string)=>{


                    })
                } else {
                    this.plugins.push(p)
                }
            })
        })
    }

}
