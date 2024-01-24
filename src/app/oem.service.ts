import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Subject} from "rxjs";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: 'root'
})
export class OemService {

  oem: any = {
    name: '物联大师',
    logo: '/assets/logo.png',
    company: '无锡真格智能科技有限公司',
    copyright: '©2016-2024'
  }

  constructor(private rs: RequestService, private title:Title) {
    //优先从缓存中读取，避免闪烁
    let oem :any= localStorage.getItem("oem");
    if (oem) {
      oem = JSON.parse(oem)
      Object.assign(this.oem, oem)
      this.title.setTitle(oem.title)
    }

    rs.get('oem').subscribe(res => {
      let oem = res.data;
      localStorage.setItem("oem", JSON.stringify(oem));
      Object.assign(this.oem,oem)
      this.title.setTitle(oem.title)
    })
  }

}
