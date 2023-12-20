import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-unknown',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './unknown.component.html',
  styleUrl: './unknown.component.scss'
})
export class UnknownComponent {

}
