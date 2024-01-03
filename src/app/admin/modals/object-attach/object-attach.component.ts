import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RequestService  } from '../../../request.service';

@Component({
  selector: 'app-object-attach',
  standalone: true,
  imports: [],
  templateUrl: './object-attach.component.html',
  styleUrl: './object-attach.component.scss'
})
export class ObjectAttachComponent implements OnInit{
  constructor( 
    private rs: RequestService,
    private msg: NzMessageService,
    private ms: NzModalService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  total = 0;
  nzPageIndex = 1;
  nzPageSize = 10;
  value = '';
  item!:any
  @Input() id: string = '';
  @Input() type: string = '';

  load() {
    let query;

    query = {
      limit: this.nzPageSize,
      skip: (this.nzPageIndex - 1) * this.nzPageSize,
    };

    this.value ? (query = { ...query, filter: { id: this.value } }) : '';
    this.rs.post(`${this.type}/${this.id}/attach`, query).subscribe(
      (res) => {
       
        this.item = res.data;
        this.total = res.total;
       
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
