import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.scss'
})
export class PluginsComponent {
  @Input() plugins: any[] = []



}
