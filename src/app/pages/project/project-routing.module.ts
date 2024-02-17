import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {ProjectUserComponent} from "./project-user/project-user.component";

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'create', component: ProjectEditComponent},
  {path: ':id', component: ProjectDetailComponent},
  {path: ':id/edit', component: ProjectEditComponent},
  {path: ':id/user', component: ProjectUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
