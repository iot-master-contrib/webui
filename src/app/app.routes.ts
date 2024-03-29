import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {UnknownComponent} from "../../projects/smart/src/lib/unknown/unknown.component";
import {authGuard} from "./auth.guard";
import {ProjectComponent} from "./project/project.component";
import {SelectComponent} from "./select/select.component";
import {adminGuard} from "./admin.guard";
import {projectResolver} from "./project.resolver";

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
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {breadcrumb: "管理后台"}
    },
    {
        path: "project/:project",
        canActivate: [authGuard],
        component: ProjectComponent,
        resolve: {project: projectResolver},
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
        data: {breadcrumb: "项目后台"}
    },
    {path: "**", component: UnknownComponent},
];
