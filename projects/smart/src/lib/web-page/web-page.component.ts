import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'im-web-page',
    standalone: true,
    imports: [],
    templateUrl: './web-page.component.html',
    styleUrl: './web-page.component.scss'
})
export class WebPageComponent {

    @ViewChild("iframe") iframe!: ElementRef;

    src!: SafeResourceUrl

    //private tm!: number;

    @Input("url")
    set url(u: string) {
        this.src = this.ds.bypassSecurityTrustResourceUrl(u)
        console.log("iframe url", u)
    }

    constructor(private ds: DomSanitizer, private route: ActivatedRoute) {
        //st.bypassSecurityTrustUrl("")
        //this.src = this.ds.bypassSecurityTrustUrl()
    }

    ngOnInit() {
        //this.url = this.route.snapshot.queryParamMap.get("url") || ''
        //this.tm = setInterval(this.onLoad, 1000)
        this.route.queryParams.subscribe(qs => {
            if (qs.hasOwnProperty('url'))
                this.url = qs['url']
        })
    }

    ngOnDestroy() {
        //clearInterval(this.tm)
    }

    onLoad() {
        try {
            const iframe = this.iframe.nativeElement;
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const body = doc.body;
            const height = body.scrollHeight;
            iframe.height = `${height}px`;

            console.log("web-page iframe onload", iframe.height)
        } catch (e) {
            // 处理跨域问题或其他错误
            console.log("web-page iframe onload", e)
        }
    }

}
