import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectEditPluginComponent} from "./project-edit-plugin/project-edit-plugin.component";
import {ProjectEditUserComponent} from "./project-edit-user/project-edit-user.component";
import {ProjectComponent} from "./project.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
const routes: Routes = [
  {path: '', component: ProjectComponent},
  {path: ':id', component: ProjectDetailComponent},
  {path: ':id/edit', component: ProjectEditComponent},
  {path: ':id/edit/plugin', component: ProjectEditPluginComponent},
  {path: ':id/edit/user', component: ProjectEditUserComponent},
  {path: 'create', component: ProjectEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
