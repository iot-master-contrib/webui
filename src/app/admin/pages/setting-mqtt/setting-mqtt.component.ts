import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequestService } from '../../../request.service';

@Component({
  selector: 'app-setting-mqtt',
  standalone: true,
  imports: [],
  templateUrl: './setting-mqtt.component.html',
  styleUrl: './setting-mqtt.component.scss'
})
export class SettingMqttComponent implements OnInit{

constructor( 
  private route: Router,
  private rs: RequestService,
  private msg: NzMessageService
){}


  ngOnInit(): void {
    this.rs.get('setting/mqtt', {}).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
  submit(){
    this.rs.post('setting/mqtt',{}).subscribe(
      (res) => {
        // this.projects = res.data;
        // this.total = res.total;
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
