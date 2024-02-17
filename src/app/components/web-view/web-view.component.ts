import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-web-view',
  standalone: true,
  imports: [],
  templateUrl: './web-view.component.html',
  styleUrl: './web-view.component.scss'
})
export class WebViewComponent implements OnInit, OnDestroy {

  @ViewChild("iframe") iframe!: ElementRef;

  src!: SafeResourceUrl

  private tm!: number;

  @Input("url")
  set url(u: string) {
    //this.src = this.ds.bypassSecurityTrustUrl(u)
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

      console.log("iframe onload", iframe.height)
    } catch (e) {
      // 处理跨域问题或其他错误
      console.log("iframe onload", e)
    }
  }

}
