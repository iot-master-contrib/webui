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

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "admin"},
  {path: "login", component: LoginComponent},
  {
    path: "admin", component: AdminComponent,
    children: [
      {path: "", pathMatch: "full", redirectTo: "project"},
      {path: "project", component: ProjectComponent},
      {path: "project/:id", component: ProjectDetailComponent},
      {path: "project/:id/edit", component: ProjectEditComponent},
      {path: "device", component: DeviceComponent},
      {path: "device/:id", component: DeviceDetailComponent},
      {path: "device/:id/edit", component: DeviceEditComponent},
      {path: "product", component: ProductComponent},
      {path: "product/:id", component: ProductDetailComponent},
      {path: "product/:id/edit", component: ProductEditComponent},
      {path: "plugin", component: PluginComponent},
      {path: "plugin/:id", component: PluginDetailComponent},
      {path: "plugin/:id/edit", component: PluginEditComponent},
      {path: "setting", component: SettingComponent},
    ]
  },
  {path: "**", component: UnknownComponent},
];
