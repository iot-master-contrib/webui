import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebViewComponent} from "../components/web-view/web-view.component";
import {AlarmComponent} from "../pages/alarm/alarm.component";
import {UnknownComponent} from "../unknown/unknown.component";
import {DashComponent} from "../pages/dash/dash.component";
import {ProductsComponent} from "../pages/product/products/products.component";
import {ProductEditComponent} from "../pages/product/product-edit/product-edit.component";
import {ProductDetailComponent} from "../pages/product/product-detail/product-detail.component";
import {ProductEditPropertyComponent} from "../pages/product/product-edit-property/product-edit-property.component";
import {ProductEditEventComponent} from "../pages/product/product-edit-event/product-edit-event.component";
import {ProductEditActionComponent} from "../pages/product/product-edit-action/product-edit-action.component";
import {DevicesComponent} from "../pages/device/devices/devices.component";
import {DeviceEditComponent} from "../pages/device/device-edit/device-edit.component";
import {DeviceDetailComponent} from "../pages/device/device-detail/device-detail.component";
import {GatewaysComponent} from "../pages/gateway/gateways/gateways.component";
import {GatewayEditComponent} from "../pages/gateway/gateway-edit/gateway-edit.component";
import {GatewayDetailComponent} from "../pages/gateway/gateway-detail/gateway-detail.component";
import {ProjectsComponent} from "../pages/project/projects/projects.component";
import {ProjectEditComponent} from "../pages/project/project-edit/project-edit.component";
import {ProjectDetailComponent} from "../pages/project/project-detail/project-detail.component";
import {SpacesComponent} from "../pages/space/spaces/spaces.component";
import {SpaceEditComponent} from "../pages/space/space-edit/space-edit.component";
import {SpaceDetailComponent} from "../pages/space/space-detail/space-detail.component";
import {PluginComponent} from "../pages/plugin/plugin.component";
import {PluginEditComponent} from "../pages/plugin/plugin-edit/plugin-edit.component";
import {PluginDetailComponent} from "../pages/plugin/plugin-detail/plugin-detail.component";
import {UsersComponent} from "../pages/users/users/users.component";
import {UserEditComponent} from "../pages/users/user-edit/user-edit.component";
import {UserDetailComponent} from "../pages/users/user-detail/user-detail.component";
import {SettingWebComponent} from "../pages/setting/setting-web/setting-web.component";
import {SettingDatabaseComponent} from "../pages/setting/setting-database/setting-database.component";
import {SettingBrokerComponent} from "../pages/setting/setting-broker/setting-broker.component";
import {SettingMqttComponent} from "../pages/setting/setting-mqtt/setting-mqtt.component";
import {SettingLogComponent} from "../pages/setting/setting-log/setting-log.component";
import {SettingBackupComponent} from "../pages/setting/setting-backup/setting-backup.component";
import {SettingAttachComponent} from "../pages/setting/setting-attach/setting-attach.component";
import {ProjectUserComponent} from "../pages/project/project-user/project-user.component";
import {SpaceDeviceComponent} from "../pages/space/space-device/space-device.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "dash"},
  {path: 'dash', component: DashComponent},

  // {path: 'product', loadChildren: () => import('../pages/product/product.module').then(m => m.ProductModule)},
  // {path: 'device', loadChildren: () => import('../pages/device/device.module').then(m => m.DeviceModule)},
  // {path: 'gateway', loadChildren: () => import('../pages/gateway/gateway.module').then(m => m.GatewayModule)},
  // {path: 'project', loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule)},
  // {path: 'space', loadChildren: () => import('../pages/space/space.module').then(m => m.SpaceModule)},
  // {path: 'plugin', loadChildren: () => import('../pages/plugin/plugin.module').then(m => m.PluginModule)},
  // {path: 'user', loadChildren: () => import('../pages/users/user.module').then(m => m.UserModule)},
  // {path: 'setting', loadChildren: () => import('../pages/setting/setting.module').then(m => m.SettingModule)},

  {path: 'product', component: ProductsComponent},
  {path: 'product/create', component: ProductEditComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'product/:id/edit', component: ProductEditComponent},
  {path: 'product/:id/edit/property', component: ProductEditPropertyComponent},
  {path: 'product/:id/edit/event', component: ProductEditEventComponent},
  {path: 'product/:id/edit/action', component: ProductEditActionComponent},

  {path: 'device', component: DevicesComponent},
  {path: 'device/create', component: DeviceEditComponent},
  {path: 'device/:id', component: DeviceDetailComponent},
  {path: 'device/:id/edit', component: DeviceEditComponent},

  {path: 'gateway', component: GatewaysComponent},
  {path: 'gateway/create', component: GatewayEditComponent},
  {path: 'gateway/:id', component: GatewayDetailComponent},
  {path: 'gateway/:id/edit', component: GatewayEditComponent},

  {path: 'project', component: ProjectsComponent},
  {path: 'project/create', component: ProjectEditComponent},
  {path: 'project/:id', component: ProjectDetailComponent},
  {path: 'project/:id/edit', component: ProjectEditComponent},
  {path: 'project/:id/user', component: ProjectUserComponent},

  {path: 'space', component: SpacesComponent},
  {path: 'space/create', component: SpaceEditComponent},
  {path: 'space/:id', component: SpaceDetailComponent},
  {path: 'space/:id/edit', component: SpaceEditComponent},
  {path: 'space/:id/device', component: SpaceDeviceComponent},

  {path: 'plugin', component: PluginComponent},
  {path: 'plugin/create', component: PluginEditComponent},
  {path: 'plugin/:id', component: PluginDetailComponent},
  {path: 'plugin/:id/edit', component: PluginEditComponent},

  {path: 'user', component: UsersComponent},
  {path: 'user/create', component: UserEditComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'user/:id/edit', component: UserEditComponent},

  {path: "setting/web", component: SettingWebComponent},
  {path: "setting/database", component: SettingDatabaseComponent},
  {path: "setting/broker", component: SettingBrokerComponent},
  {path: "setting/mqtt", component: SettingMqttComponent},
  {path: "setting/log", component: SettingLogComponent},
  {path: "setting/backup", component: SettingBackupComponent},
  {path: "setting/attach", component: SettingAttachComponent},

  {path: "web", component: WebViewComponent},
  {path: "alarm", component: AlarmComponent},
  {path: "**", component: UnknownComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
