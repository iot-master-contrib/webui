import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {ProductComponent} from "./admin/pages/product/product.component";
import {DeviceComponent} from "./admin/pages/device/device.component";
import {ProjectComponent} from "./admin/pages/project/project.component";
import {ProjectEditComponent} from "./admin/pages/project-edit/project-edit.component";
import {ProjectDetailComponent} from "./admin/pages/project-detail/project-detail.component";
import {DeviceDetailComponent} from "./admin/pages/device-detail/device-detail.component";
import {DeviceEditComponent} from "./admin/pages/device-edit/device-edit.component";
import {ProductDetailComponent} from "./admin/pages/product-detail/product-detail.component";
import {ProductEditComponent} from "./admin/pages/product-edit/product-edit.component";
import {SettingComponent} from "./admin/pages/setting/setting.component";
import {PluginComponent} from "./admin/pages/plugin/plugin.component";
import {PluginDetailComponent} from "./admin/pages/plugin-detail/plugin-detail.component";
import {PluginEditComponent} from "./admin/pages/plugin-edit/plugin-edit.component";
import {UnknownComponent} from "./unknown/unknown.component";
import {AlarmComponent} from "./admin/pages/alarm/alarm.component";
import {GatewayComponent} from "./admin/pages/gateway/gateway.component";
import {GatewayEditComponent} from "./admin/pages/gateway-edit/gateway-edit.component";
import {GatewayBatchComponent} from "./admin/pages/gateway-batch/gateway-batch.component";
import {GatewayDetailComponent} from "./admin/pages/gateway-detail/gateway-detail.component";
import {SettingWebComponent} from "./admin/pages/setting-web/setting-web.component";
import {SettingDatabaseComponent} from "./admin/pages/setting-database/setting-database.component";
import {SettingLogComponent} from "./admin/pages/setting-log/setting-log.component";
import {SettingBrokerComponent} from "./admin/pages/setting-broker/setting-broker.component";
import {SettingBackupComponent} from "./admin/pages/setting-backup/setting-backup.component";
import {ProductEditPropertyComponent} from "./admin/pages/product-edit-property/product-edit-property.component";

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "admin"},
  {path: "login", component: LoginComponent},
  {
    path: "admin", component: AdminComponent,
    children: [
      {path: "", pathMatch: "full", redirectTo: "project"},
      {path: "project", component: ProjectComponent},
      {path: "project/create", component: ProjectEditComponent},
      {path: "project/:id", component: ProjectDetailComponent},
      {path: "project/:id/edit", component: ProjectEditComponent},
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
      {path: "plugin", component: PluginComponent},
      {path: "plugin/create", component: PluginEditComponent},
      {path: "plugin/:id", component: PluginDetailComponent},
      {path: "plugin/:id/edit", component: PluginEditComponent},
      {path: "alarm", component: AlarmComponent},
      {
        path: "setting", component: SettingComponent,
        children: [
          {path: "", pathMatch: "full", redirectTo: "web"},
          {path: "web", component: SettingWebComponent},
          {path: "database", component: SettingDatabaseComponent},
          {path: "log", component: SettingLogComponent},
          {path: "broker", component: SettingBrokerComponent},
          {path: "backup", component: SettingBackupComponent},
        ]
      },
    ]
  },
  {path: "**", component: UnknownComponent},
];
