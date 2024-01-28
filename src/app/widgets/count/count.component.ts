import {Component, Input, OnInit} from '@angular/core';
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {RequestService} from "../../request.service";

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [
    NzStatisticComponent
  ],
  templateUrl: './count.component.html',
  styleUrl: './count.component.scss'
})
export class CountComponent implements OnInit {

  @Input() model = 'device'
  @Input() title = '设备总数'

  count = 0;

  constructor(private rs: RequestService) {
  }

  ngOnInit(): void {
    this.rs.post(this.model + '/count', {}).subscribe(res => {
      this.count = res.data
    })
  }


}
