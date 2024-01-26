import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebViewComponent} from "../components/web-view/web-view.component";
import {AlarmComponent} from "../pages/alarm/alarm.component";
import {UnknownComponent} from "../unknown/unknown.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "project/dash"},
  {path: 'device', loadChildren: () => import('../pages/device/device.module').then(m => m.DeviceModule)},
  {path: 'gateway', loadChildren: () => import('../pages/gateway/gateway.module').then(m => m.GatewayModule)},
  {path: 'project', loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule)},
  {path: 'space', loadChildren: () => import('../pages/space/space.module').then(m => m.SpaceModule)},
  {path: 'user', loadChildren: () => import('../pages/users/user.module').then(m => m.UserModule)},

  {path: "web", component: WebViewComponent},
  {path: "alarm", component: AlarmComponent},
  {path: "**", component: UnknownComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
