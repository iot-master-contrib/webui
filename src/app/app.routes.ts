import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {UnknownComponent} from "../../projects/smart/src/unknown/unknown.component";
import {authGuard} from "./auth.guard";
import {ProjectComponent} from "./project/project.component";
import {SelectComponent} from "./select/select.component";
import {adminGuard} from "./admin.guard";
import {projectGuard} from "./project.guard";

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "admin"},
  {path: "login", component: LoginComponent},
  {
    path: "select",
    canActivate: [authGuard],
    component: SelectComponent,
  },
  {
    path: "admin",
    canActivate: [authGuard, adminGuard],
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: "project/:project",
    canActivate: [authGuard],
    component: ProjectComponent,
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
  },
  {path: "**", component: UnknownComponent},
];
