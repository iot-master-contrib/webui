import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { RequestService } from '../../../request.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  @Input() subtitle?: string;
  nzModalData: any = inject(NZ_MODAL_DATA);
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private rs: RequestService,
    private ms: NzModalService
  ) {
    this.buildFromGroup();
  }

  buildFromGroup(data?: any) {
    data = data || {};
    this.formGroup = this.fb.group({
      id: [data.id || '', []],
    });
  }
  submit() {
    let value = this.formGroup.value;

    return new Promise((resolve, reject) => {
      if (this.formGroup.valid) {
        let url = `${this.nzModalData.name}/create`;
        this.rs.post(url, value.id ? value : {}).subscribe((res) => {
          resolve(true);
          this.msg.success('创建成功');
        });
      } else {
        Object.values(this.formGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
            reject();
          }
        });
      }
    });
  }
}
