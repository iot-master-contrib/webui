import {Component, Inject, Optional} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef, NzModalService,} from 'ng-zorro-antd/modal';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RequestService} from "../../../../../projects/smart/src/lib/request.service";
import {
  ParamSearch,
  SmartTableButton,
  SmartTableColumn,
  SmartTableComponent,
  SmartTableOperator
} from "../../../../../projects/smart/src/lib/smart-table/smart-table.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DevicesComponent} from "../../device/devices/devices.component";

@Component({
  selector: 'app-space-device',
  standalone: true,
  imports: [
    CommonModule,
    SmartTableComponent,
  ],
  templateUrl: './space-device.component.html',
  styleUrl: './space-device.component.scss'
})
export class SpaceDeviceComponent {
  space_id: any = '';
  project_id: any = '';


  datum: any[] = [];
  total = 0;
  loading = false;


  buttons: SmartTableButton[] = [
    {icon: 'link', text: '绑定设备', action: () => this.bind()}, //应该只有平台管理员可以操作吧
  ];

  columns: SmartTableColumn[] = [
    {key: 'device_id', sortable: true, text: 'ID', keyword: true},
    {key: 'device', sortable: true, text: '名称', keyword: true},
    {key: 'created', sortable: true, text: '创建时间', date: true},
  ];

  columnsSelect: SmartTableColumn[] = [
    {key: 'device_id', sortable: true, text: 'ID', keyword: true},
    {key: 'device', sortable: true, text: '名称', keyword: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'disconnect', text: '解绑', confirm: '确认解绑？', action: (data) => this.unbind(data.device_id)},
  ];

  operatorsSelect: SmartTableOperator[] = [
    {text: '选择', action: (data) => this.ref.close(data)},
  ];

  constructor(private route: ActivatedRoute,
              private rs: RequestService,
              private msg: NzNotificationService,
              private ms: NzModalService,
              @Optional() protected ref: NzModalRef,
              @Optional() @Inject(NZ_MODAL_DATA) protected data: any
  ) {
    this.space_id = data?.space_id;
    this.project_id = data?.project_id;
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.space_id = this.route.snapshot.paramMap.get('id');
      this.rs.get("space/" + this.space_id).subscribe(res => {
        this.project_id = res.data.project_id
      })
    }
  }

  query!: ParamSearch

  refresh() {
    this.search(this.query)
  }

  search(query: ParamSearch) {
    //console.log('onQuery', query)
    this.query = query

    if (this.project_id)
      query.filter['project_id'] = this.project_id;

    this.loading = true;
    this.rs.get(`space/${this.space_id}/device`).subscribe((res) => {
      this.datum = res.data;
      //this.total = res.data.length
    }).add(() => this.loading = false);
    // this.rs.post('space/search', query).subscribe((res) => {
    //   this.datum = res.data;
    //   this.total = res.total;
    // }).add(() => this.loading = false);
  }

  bind() {
    this.ms.create({
      nzTitle: '绑定设备',
      nzContent: DevicesComponent,
      nzData: {project_id: this.project_id},
    }).afterClose.subscribe(res => {
      if (!res) return
      this.rs.get(`space/${this.space_id}/device/${res.id}/bind`, {}).subscribe((res) => {
        this.msg.success('提示', '绑定成功');
        this.refresh();
      });
    })
  }

  unbind(i: any) {
    this.rs.get(`space/${this.space_id}/device/${i}/unbind`, {}).subscribe((res) => {
      this.msg.success('提示', '解绑成功');
      this.refresh();
    });
  }
}
