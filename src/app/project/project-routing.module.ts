import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebViewComponent} from "../components/web-view/web-view.component";
import {AlarmComponent} from "../pages/alarm/alarm.component";
import {UnknownComponent} from "iot-master-smart";
import {DevicesComponent} from "../pages/device/devices/devices.component";
import {DeviceEditComponent} from "../pages/device/device-edit/device-edit.component";
import {DeviceDetailComponent} from "../pages/device/device-detail/device-detail.component";
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

    {path: 'dash', component: ProjectDashComponent, title: "控制台", data: {breadcrumb: "控制台"}},
    {path: 'detail', component: ProjectDetailComponent, title: "项目详情", data: {breadcrumb: "项目详情"}},
    {path: 'edit', component: ProjectEditComponent, title: "项目编辑", data: {breadcrumb: "项目编辑"}},

    {path: 'product/:id', component: ProductDetailComponent, title: "产品详情", data: {breadcrumb: "产品详情"}},

    {path: 'device', component: DevicesComponent, title: "设备列表", data: {breadcrumb: "设备列表"}},
    {path: 'device/create', component: DeviceEditComponent, title: "创建设备", data: {breadcrumb: "创建设备"}},
    {path: 'device/:id', component: DeviceDetailComponent, title: "设备详情", data: {breadcrumb: "设备详情"}},
    {path: 'device/:id/edit', component: DeviceEditComponent, title: "编辑设备", data: {breadcrumb: "编辑设备"}},

    {path: 'space', component: SpacesComponent, title: "空间列表", data: {breadcrumb: "空间列表"}},
    {path: 'space/create', component: SpaceEditComponent, title: "创建空间", data: {breadcrumb: "创建空间"}},
    {path: 'space/:id', component: SpaceDetailComponent, title: "空间详情", data: {breadcrumb: "空间详情"}},
    {path: 'space/:id/edit', component: SpaceEditComponent, title: "空间编辑", data: {breadcrumb: "空间编辑"}},
    {path: 'space/:id/device', component: SpaceDeviceComponent, title: "绑定设备", data: {breadcrumb: "绑定设备"}},

    {path: 'user', component: ProjectUserComponent, title: "用户列表", data: {breadcrumb: "用户列表"}},


    {path: "web", component: WebViewComponent, title: "扩展页面", data: {breadcrumb: "扩展页面"}},
    {path: "alarm", component: AlarmComponent, title: "告警日志", data: {breadcrumb: "告警日志"}},
    {path: "**", component: UnknownComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {
}
