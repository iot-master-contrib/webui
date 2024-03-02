import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebViewComponent} from "../components/web-view/web-view.component";
import {AlarmComponent} from "../pages/alarm/alarm.component";
import {UnknownComponent} from "../../../projects/smart/src/unknown/unknown.component";
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
import {ProjectDashComponent} from "../pages/project/project-dash/project-dash.component";
import {ProjectUserComponent} from "../pages/project/project-user/project-user.component";
import {SpaceDeviceComponent} from "../pages/space/space-device/space-device.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "dash"},

  {path: 'dash', component: ProjectDashComponent, title: "项目控制台"},
  {path: 'detail', component: ProjectDetailComponent, title: "项目详情"},

  // {path: 'device', loadChildren: () => import('../pages/device/device.module').then(m => m.DeviceModule)},
  // {path: 'gateway', loadChildren: () => import('../pages/gateway/gateway.module').then(m => m.GatewayModule)},
  // {path: 'project', loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule)},
  // {path: 'space', loadChildren: () => import('../pages/space/space.module').then(m => m.SpaceModule)},
  // {path: 'user', loadChildren: () => import('../pages/users/user.module').then(m => m.UserModule)},


  {path: 'device', component: DevicesComponent, title: "设备列表"},
  {path: 'device/create', component: DeviceEditComponent, title: "创建设备"},
  {path: 'device/:id', component: DeviceDetailComponent, title: "设备详情"},
  {path: 'device/:id/edit', component: DeviceEditComponent, title: "编辑设备"},

  {path: 'gateway', component: GatewaysComponent, title: "网关列表"},
  {path: 'gateway/create', component: GatewayEditComponent, title: "创建网关"},
  {path: 'gateway/:id', component: GatewayDetailComponent, title: "网关详情"},
  {path: 'gateway/:id/edit', component: GatewayEditComponent, title: "编辑网关"},

  {path: 'space', component: SpacesComponent, title: "空间列表"},
  {path: 'space/create', component: SpaceEditComponent, title: "创建空间"},
  {path: 'space/:id', component: SpaceDetailComponent, title: "空间详情"},
  {path: 'space/:id/edit', component: SpaceEditComponent, title: "空间编辑"},
  {path: 'space/:id/device', component: SpaceDeviceComponent, title: "绑定设备"},

  {path: 'user', component: ProjectUserComponent, title: "用户列表"},


  {path: "web", component: WebViewComponent, title: "-"},
  {path: "alarm", component: AlarmComponent, title: "告警日志"},
  {path: "**", component: UnknownComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
