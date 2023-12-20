import { Component } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  keyword = ""

  search(){

  }
}
