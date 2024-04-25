import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ProjectsComponent} from "../../pages/project/projects/projects.component";
import {GatewaysComponent} from "../../pages/gateway/gateways/gateways.component";
import {DevicesComponent} from "../../pages/device/devices/devices.component";
import {ProductsComponent} from "../../pages/product/products/products.component";
import {SpacesComponent} from "../../pages/space/spaces/spaces.component";
import {UsersComponent} from "../../pages/users/users/users.component";
import {ProjectUserComponent} from "../../pages/project/project-user/project-user.component";
import {SpaceDeviceComponent} from "../../pages/space/space-device/space-device.component";

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

    @HostListener('window:message', ['$event'])
    onMessage(message: any) {
        let ref: NzModalRef
        const msg = JSON.parse(message)
        switch (msg.type) {
            case 'select_product':
                ref = this.ms.create({nzTitle: "选择产品", nzContent: ProductsComponent, nzData: msg.data,})
                break;
            case 'select_gateway':
                ref = this.ms.create({nzTitle: "选择网关", nzContent: GatewaysComponent, nzData: msg.data,})
                break;
            case 'select_device':
                ref = this.ms.create({nzTitle: "选择设备", nzContent: DevicesComponent, nzData: msg.data,})
                break;
            case 'select_project':
                ref = this.ms.create({nzTitle: "选择项目", nzContent: ProjectsComponent, nzData: msg.data,})
                break;
            case 'select_project_user':
                ref = this.ms.create({nzTitle: "选择项目用户", nzContent: ProjectUserComponent, nzData: msg.data,})
                break;
            case 'select_space':
                ref = this.ms.create({nzTitle: "选择空间", nzContent: SpacesComponent, nzData: msg.data,})
                break;
            case 'select_space_device':
                ref = this.ms.create({nzTitle: "选择空间设备", nzContent: SpaceDeviceComponent, nzData: msg.data,})
                break;
            case 'select_user':
                ref = this.ms.create({nzTitle: "选择用户", nzContent: UsersComponent, nzData: msg.data,})
                break;
            default:
                return
        }
        ref.afterClose.subscribe((res: any) => {
            if (res) {
                let m = JSON.stringify({type: msg.type, data: res})
                this.iframe.nativeElement.postMessage(m)
                //window.parent?.postMessage(m)
            }
        })
    }

    constructor(private ds: DomSanitizer, private route: ActivatedRoute, private ms: NzModalService) {
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
