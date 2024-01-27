import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebViewComponent} from "../components/web-view/web-view.component";
import {AlarmComponent} from "../pages/alarm/alarm.component";
import {UnknownComponent} from "../unknown/unknown.component";
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

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "dash"},

  {path: 'dash', component: ProjectDashComponent},
  {path: 'detail', component: ProjectDetailComponent},

  // {path: 'device', loadChildren: () => import('../pages/device/device.module').then(m => m.DeviceModule)},
  // {path: 'gateway', loadChildren: () => import('../pages/gateway/gateway.module').then(m => m.GatewayModule)},
  // {path: 'project', loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule)},
  // {path: 'space', loadChildren: () => import('../pages/space/space.module').then(m => m.SpaceModule)},
  // {path: 'user', loadChildren: () => import('../pages/users/user.module').then(m => m.UserModule)},

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

  {path: 'user', component: ProjectUserComponent},
  // {path: 'user/create', component: UserEditComponent},
  // {path: 'user/:id', component: UserDetailComponent},
  // {path: 'user/:id/edit', component: UserEditComponent},


  {path: "web", component: WebViewComponent},
  {path: "alarm", component: AlarmComponent},
  {path: "**", component: UnknownComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
