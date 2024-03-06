import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {RouterLink} from "@angular/router";


export interface SmartInfoItem {
  type?: string
  key: string
  label: string
  span?: number
  options?: { [p:string]: any }
  link?: () => string
}

@Component({
  selector: 'im-smart-info',
  standalone: true,
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzProgressComponent,
    RouterLink,
  ],
  templateUrl: './smart-info.component.html',
  styleUrl: './smart-info.component.scss'
})
export class SmartInfoComponent {
  @Input() title: string = '';
  @Input() fields: SmartInfoItem[] = []
  @Input() value: any = {}
}