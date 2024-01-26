import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {UnknownComponent} from "./unknown/unknown.component";
import {AlarmComponent} from "./pages/alarm/alarm.component";
import {authGuard} from "./auth.guard";
import {WebViewComponent} from "./components/web-view/web-view.component";
import {ProjectComponent} from "./project/project.component";

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "admin"},
  {path: "login", component: LoginComponent},
  {
    canActivate: [authGuard],
    path: "admin",
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    canActivate: [authGuard],
    path: "project/:project",
    component: ProjectComponent,
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
  },
  {path: "**", component: UnknownComponent},
];
