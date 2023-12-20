import {Component} from '@angular/core';
import {ToolbarComponent} from "../../toolbar/toolbar.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  cols = 3

  constructor(bpo: BreakpointObserver) {
    bpo.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(res => {
      console.log("bpo", res)
      if (res.matches) {
        if (res.breakpoints[Breakpoints.XSmall])
          this.cols = 1
        if (res.breakpoints[Breakpoints.Small])
          this.cols = 2
        if (res.breakpoints[Breakpoints.Medium])
          this.cols = 3
        if (res.breakpoints[Breakpoints.Large])
          this.cols = 4
        if (res.breakpoints[Breakpoints.XLarge])
          this.cols = 5
      }
    })
  }

}
