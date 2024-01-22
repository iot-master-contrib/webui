import {Component} from '@angular/core';
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
import {EditTableComponent, EditTableItem} from "../../../components/edit-table/edit-table.component";

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
    EditTableComponent
  ],
  templateUrl: './product-edit-property.component.html',
  styleUrl: './product-edit-property.component.scss'
})
export class ProductEditPropertyComponent {
  data: any = {
    name: "新产品",
  }
  formGroup!: FormGroup;

  items: EditTableItem[] = [{
    label: '名称(ID)',
    name: 'name'
  }, {
    label: '显示',
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
    }, {
      label: '枚举',
      value: 'enum'
    }, {
      label: '数组',
      value: 'array'
    }, {
      label: '对象',
      value: 'object'
    }]
  }, {
    label: '单位',
    name: 'unit'
  }, {
    label: '模式',
    name: 'mode',
    type: 'select',
    default: 'rw',
    options: [{
      label: '只读',
      value: 'r'
    }, {
      label: '读写',
      value: 'rw'
    }]
  }]

  constructor(private fb: FormBuilder) {
    this.buildFromGroup()
  }

  buildFromGroup() {
    this.formGroup = this.fb.group({
      properties: [[], []]
    })
  }

  onSubmit() {

  }

  onDrop($event: any) {

  }

  onCopy(i: number) {

  }

  onDelete(i: number) {

  }
}
