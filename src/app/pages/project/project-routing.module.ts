import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectEditUserComponent} from "./project-edit-user/project-edit-user.component";
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {ProjectDashComponent} from "./project-dash/project-dash.component";
const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'create', component: ProjectEditComponent},
  {path: ':id', component: ProjectDetailComponent},
  {path: ':id/edit', component: ProjectEditComponent},
  {path: ':id/edit/user', component: ProjectEditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
