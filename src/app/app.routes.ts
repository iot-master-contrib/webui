import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {ProductComponent} from "./pages/product/product.component";
import {DeviceComponent} from "./pages/device/device.component";
import {ProjectComponent} from "./pages/project/project.component";
import {ProjectEditComponent} from "./pages/project-edit/project-edit.component";
import {ProjectDetailComponent} from "./pages/project-detail/project-detail.component";
import {DeviceDetailComponent} from "./pages/device-detail/device-detail.component";
import {DeviceEditComponent} from "./pages/device-edit/device-edit.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {ProductEditComponent} from "./pages/product-edit/product-edit.component";
import {PluginComponent} from "./pages/plugin/plugin.component";
import {PluginDetailComponent} from "./pages/plugin-detail/plugin-detail.component";
import {PluginEditComponent} from "./pages/plugin-edit/plugin-edit.component";
import {UnknownComponent} from "./unknown/unknown.component";
import {AlarmComponent} from "./pages/alarm/alarm.component";
import {GatewayComponent} from "./pages/gateway/gateway.component";
import {GatewayEditComponent} from "./pages/gateway-edit/gateway-edit.component";
import {GatewayBatchComponent} from "./pages/gateway-batch/gateway-batch.component";
import {GatewayDetailComponent} from "./pages/gateway-detail/gateway-detail.component";
import {ProductEditPropertyComponent} from "./pages/product-edit-property/product-edit-property.component";
import {ProjectEditUserComponent} from "./pages/project-edit-user/project-edit-user.component";
import {ProductEditEventComponent} from "./pages/product-edit-event/product-edit-event.component";
import {ProductEditActionComponent} from "./pages/product-edit-action/product-edit-action.component";
import {ProjectEditPluginComponent} from "./pages/project-edit-plugin/project-edit-plugin.component";
import {SpaceEditComponent} from './pages/space-edit/space-edit.component';
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "admin"},
  {path: "login", component: LoginComponent},
  {
    canActivate: [authGuard],
    path: "admin", component: AdminComponent,
    children: [
      {path: "", pathMatch: "full", redirectTo: "project"},
      {path: "project", component: ProjectComponent},
      {path: "project/create", component: ProjectEditComponent},
      {path: "project/:id", component: ProjectDetailComponent},
      {path: "project/:id/edit", component: ProjectEditComponent},
      {path: "project/:id/edit/user", component: ProjectEditUserComponent},
      {path: "project/:id/edit/plugin", component: ProjectEditPluginComponent},
      {path: "space/create", component: SpaceEditComponent},
      {path: "space/:id", component: SpaceEditComponent},
      {path: "device", component: DeviceComponent},
      {path: "device/create", component: DeviceEditComponent},
      {path: "device/:id", component: DeviceDetailComponent},
      {path: "device/:id/edit", component: DeviceEditComponent},
      {path: "gateway", component: GatewayComponent},
      {path: "gateway/create", component: GatewayEditComponent},
      {path: "gateway/batch", component: GatewayBatchComponent},
      {path: "gateway/:id", component: GatewayDetailComponent},
      {path: "gateway/:id/edit", component: GatewayEditComponent},
      {path: "product", component: ProductComponent},
      {path: "product/create", component: ProductEditComponent},
      {path: "product/:id", component: ProductDetailComponent},
      {path: "product/:id/edit", component: ProductEditComponent},
      {path: "product/:id/edit/property", component: ProductEditPropertyComponent},
      {path: "product/:id/edit/event", component: ProductEditEventComponent},
      {path: "product/:id/edit/action", component: ProductEditActionComponent},
      {path: "plugin", component: PluginComponent},
      {path: "plugin/create", component: PluginEditComponent},
      {path: "plugin/:id", component: PluginDetailComponent},
      {path: "plugin/:id/edit", component: PluginEditComponent},
      {
        path: 'setting',
        loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/users/user.module').then(m => m.UserModule)
      },
      {path: "alarm", component: AlarmComponent},
      {path: "**", component: UnknownComponent},
    ]
  },
  {path: "**", component: UnknownComponent},
];
