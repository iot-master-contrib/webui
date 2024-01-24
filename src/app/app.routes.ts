import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {UnknownComponent} from "./unknown/unknown.component";
import {AlarmComponent} from "./pages/alarm/alarm.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "admin"},
  {path: "login", component: LoginComponent},
  {
    canActivate: [authGuard],
    path: "admin", component: AdminComponent,
    children: [
      {path: "", pathMatch: "full", redirectTo: "project"},
      {path: 'dash', loadChildren: () => import('./pages/dash/dash.module').then(m => m.DashModule)},
      {path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)},
      {path: 'device', loadChildren: () => import('./pages/device/device.module').then(m => m.DeviceModule)},
      {path: 'gateway', loadChildren: () => import('./pages/gateway/gateway.module').then(m => m.GatewayModule)},
      {path: 'project', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule)},
      {path: 'space', loadChildren: () => import('./pages/space/space.module').then(m => m.SpaceModule)},
      {path: 'plugin', loadChildren: () => import('./pages/plugin/plugin.module').then(m => m.PluginModule)},
      {path: 'user', loadChildren: () => import('./pages/users/user.module').then(m => m.UserModule)},
      {path: 'setting', loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule)},

      {path: "alarm", component: AlarmComponent},
      {path: "**", component: UnknownComponent},
    ]
  },
  {path: "**", component: UnknownComponent},
];
