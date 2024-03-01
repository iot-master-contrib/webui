import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {
  NzPageHeaderComponent,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzTableModule} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {NgForOf} from "@angular/common";
import {SmartTableEditComponent, SmartTableEditItem} from "../../../components/smart-table-edit/smart-table-edit.component";
import {RequestService} from "../../../request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-product-edit-property',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzTableModule,
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzRowDirective,
    NzSelectComponent,
    NzSpaceComponent,
    NzTextareaCountComponent,
    NzUploadComponent,
    ReactiveFormsModule,
    NzSpaceItemDirective,
    CdkDropList,
    NgForOf,
    CdkDrag,
    CdkDragHandle,
    SmartTableEditComponent
  ],
  templateUrl: './product-edit-property.component.html',
  styleUrl: './product-edit-property.component.scss'
})
export class ProductEditPropertyComponent implements OnInit {
  data: any = {
    name: "新产品",
  }
  formGroup!: FormGroup;

  items: SmartTableEditItem[] = [{
    label: '变量',
    name: 'name'
  }, {
    label: '显示名称',
    name: 'label'
  }, {
    label: '类型',
    name: 'type',
    type: 'select',
    default: 'int',
    options: [{
      label: '整数',
      value: 'int'
    }, {
      label: '浮点数',
      value: 'float'
    }, {
      label: '布尔型',
      value: 'bool'
    }, {
      label: '文本',
      value: 'text'
    },
      //   {
      //   label: '枚举',
      //   value: 'enum'
      // }, {
      //   label: '数组',
      //   value: 'array'
      // }, {
      //   label: '对象',
      //   value: 'object'
      // }
    ]
  }, {
    label: '单位',
    name: 'unit'
  }, {
    label: '模式',
    name: 'mode',
    type: 'select',
    default: 'r',
    options: [{
      label: '只读',
      value: 'r'
    }, {
      label: '读写',
      value: 'rw'
    }]
  }]

  id: any = ''
  properties: any = []

  constructor(private fb: FormBuilder,
              private rs: RequestService,
              private ms: NzNotificationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.buildFromGroup()
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rs.get(`product/${this.id}/attach/read/property.json`).subscribe(res => {

      //console.log("test", res)
      this.properties = res
      this.buildFromGroup()
    })
  }

  buildFromGroup() {
    this.formGroup = this.fb.group({
      properties: [this.properties || [], []]
    })
  }

  onSubmit() {
    let value = this.formGroup.value
    this.rs.post(`product/${this.id}/attach/write/property.json`, value.properties).subscribe(res => {
      this.ms.success("提示", "保存成功")
      this.router.navigateByUrl("/admin/product/" + this.id + "/edit")
    })
  }

}
