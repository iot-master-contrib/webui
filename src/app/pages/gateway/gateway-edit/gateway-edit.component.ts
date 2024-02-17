import {Component, signal, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective, NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from "ng-zorro-antd/page-header";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {NzMessageService} from 'ng-zorro-antd/message';
import {RequestService} from '../../../request.service';
import {InputProjectComponent} from "../../../components/input-project/input-project.component";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-gateway-edit',
  standalone: true,
  imports: [
    DatePipe,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzPageHeaderComponent,
    NzPageHeaderContentDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzPopconfirmDirective,
    NzSpaceComponent,
    RouterLink,
    NzSpaceItemDirective,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputDirective,
    NzTextareaCountComponent,
    NzUploadComponent,
    NzIconDirective,
    NzSelectComponent,
    NgIf,
    InputProjectComponent,
    NzCardComponent,
  ],
  templateUrl: './gateway-edit.component.html',
  styleUrl: './gateway-edit.component.scss'
})
export class GatewayEditComponent implements OnInit {
  data: any = {
    name: "新网关",
  }
  formGroup!: FormGroup;
  id!: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private rs: RequestService,
    private route: ActivatedRoute
  ) {
    this.buildFromGroup();
  }

  buildFromGroup(data?: any) {
    data = data || {}
    this.formGroup = this.fb.group({
      id: [data.id || '', []],
      name: [data.name || '', []],
      project_id: [data.project_id || '', []],
      description: [data.description || '', []],
      username: [data.username || '', []],
      password: [data.password || '', []],
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load();
      return
    }
    this.buildFromGroup();

  }

  load() {
    this.rs.get(`gateway/${this.id}`, {}).subscribe(
      (res) => {
        this.buildFromGroup(res.data);
      },
      (err) => {
        console.log('err:', err);
      }
    );


  }

  onSubmit() {
    if (this.formGroup.valid) {
      let url = this.id ? `gateway/${this.id}` : `gateway/create`;
      this.rs.post(url, this.formGroup.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/gateway/' + res.data.id);
        this.msg.success('保存成功');
      });

      return;
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


  onIconChange($event: NzUploadChangeParam) {

  }


}
