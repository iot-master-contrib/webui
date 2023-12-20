import {Component} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = ''
  password = ''



}
