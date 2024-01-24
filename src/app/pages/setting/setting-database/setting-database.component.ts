import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {
  NzPageHeaderComponent,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import { Router } from '@angular/router';
import { RequestService } from '../../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-setting-database',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzOptionComponent,
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzRowDirective,
    NzSelectComponent,
    NzSpaceComponent,
    NzUploadComponent,
    ReactiveFormsModule,
    NzSpaceItemDirective,
    NgForOf
  ],
  templateUrl: './setting-database.component.html',
  styleUrl: './setting-database.component.scss'
})
export class SettingDatabaseComponent {
  formGroup!: FormGroup;

  data: any = {}

  urls: any = {
    sqlite: "master.db",
    mysql: "root:123456@tcp(127.0.0.1)/master?charset=utf8",
    postgres: "postgres://root:123456@127.0.0.1/master?sslmode=verify-full",
    sqlserver: "sqlserver://sa:123456@127.0.0.1?database=master&connection+timeout=30",
    godror: 'user="root" password="123456" connectString="127.0.0.1:1521/master"',
  }

  constructor(private fb: FormBuilder, 
    private route: Router,
    private rs: RequestService,
    private msg: NzMessageService) {
    this.buildFromGroup()
  }
  ngOnInit(): void {
    this.rs.get('setting/database', {}).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
  buildFromGroup() {
    this.formGroup = this.fb.group({
      type: [this.data.type || 'sqlite', []],
      url: [this.data.url || 'master.db', []],
      debug: [this.data.debug || false, []],
    })
    //console.log(this.formGroup)
  }

  onSubmit() {
    this.rs.post('setting/database', this.formGroup.value).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }

  writeExample() {
    this.formGroup.patchValue({url: this.urls[this.formGroup.controls['type'].value]})
  }


}
