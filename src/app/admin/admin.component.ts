import { Component } from '@angular/core';
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
