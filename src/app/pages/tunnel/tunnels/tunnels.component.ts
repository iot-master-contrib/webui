import { Component } from '@angular/core';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {LinkComponent} from "../../link/link/link.component";
import {ClientComponent} from "../../client/client/client.component";
import {SerialComponent} from "../../serial/serial/serial.component";

@Component({
  selector: 'app-tunnels',
  standalone: true,
    imports: [
        NzTabsModule,
        LinkComponent,
        ClientComponent,
        SerialComponent
    ],
  templateUrl: './tunnels.component.html',
  styleUrl: './tunnels.component.scss'
})
export class TunnelsComponent {

}
