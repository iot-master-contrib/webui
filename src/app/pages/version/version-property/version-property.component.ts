import {Component, Input} from '@angular/core';
import {
  SmartTableColumn,
  SmartTableComponent
} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";

@Component({
  selector: 'app-version-property',
  standalone: true,
  imports: [
    SmartTableComponent
  ],
  templateUrl: './version-property.component.html',
  styleUrl: './version-property.component.scss'
})
export class VersionPropertyComponent {

  @Input() product_id!: any;
  @Input() version!: any;

  items: SmartTableColumn[] = [{
    text: '变量',
    key: 'name'
  }, {
    text: '显示名称',
    key: 'label'
  }, {
    text: '类型',
    key: 'type',
  }, {
    text: '单位',
    key: 'unit'
  }, {
    text: '模式',
    key: 'mode',
  }]

  properties: any = []

  constructor(private rs: RequestService) {
  }

  ngOnInit(): void {
  }


  load() {
    this.rs.get(`product/${this.product_id}/version/${this.version}/config/property`).subscribe(res => {
      this.properties = res.data
    })
  }
}
