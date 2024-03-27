import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebViewComponent} from "../components/web-view/web-view.component";
import {AlarmComponent} from "../pages/alarm/alarm.component";
import {UnknownComponent} from "../../../projects/smart/src/lib/unknown/unknown.component";
import {DashComponent} from "../pages/dash/dash.component";
import {ProductsComponent} from "../pages/product/products/products.component";
import {ProductEditComponent} from "../pages/product/product-edit/product-edit.component";
import {ProductDetailComponent} from "../pages/product/product-detail/product-detail.component";
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
import {ProductVersionComponent} from "../pages/product/product-version/product-version.component";
import {VersionDetailComponent} from "../pages/version/version-detail/version-detail.component";
import {VersionEditComponent} from "../pages/version/version-edit/version-edit.component";
import {ServerComponent} from "../pages/server/server/server.component";
import {ServerEditComponent} from "../pages/server/server-edit/server-edit.component";
import {ServerDetailComponent} from "../pages/server/server-detail/server-detail.component";
import {LinkComponent} from "../pages/link/link/link.component";
import {LinkEditComponent} from "../pages/link/link-edit/link-edit.component";
import {LinkDetailComponent} from "../pages/link/link-detail/link-detail.component";
import {SerialComponent} from "../pages/serial/serial/serial.component";
import {SerialEditComponent} from "../pages/serial/serial-edit/serial-edit.component";
import {SerialDetailComponent} from "../pages/serial/serial-detail/serial-detail.component";
import {ClientComponent} from "../pages/client/client/client.component";
import {ClientEditComponent} from "../pages/client/client-edit/client-edit.component";
import {ClientDetailComponent} from "../pages/client/client-detail/client-detail.component";

const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "dash"},
    {path: 'dash', component: DashComponent, title: "控制台"},

    {path: 'product', component: ProductsComponent, title: "产品列表"},
    {path: 'product/create', component: ProductEditComponent, title: "创建产品"},
    {path: 'product/:id', component: ProductDetailComponent, title: "产品详情"},
    {path: 'product/:id/edit', component: ProductEditComponent, title: "编辑产品"},
    {path: 'product/:id/version', component: ProductVersionComponent, title: "产品版本"},
    {path: 'product/:id/version/:version', component: VersionDetailComponent, title: "产品版本详情"},
    {path: 'product/:id/version/:version/edit', component: VersionEditComponent, title: "产品版本编辑"},

    {path: 'device', component: DevicesComponent, title: "设备列表"},
    {path: 'device/create', component: DeviceEditComponent, title: "创建设备"},
    {path: 'device/:id', component: DeviceDetailComponent, title: "设备详情"},
    {path: 'device/:id/edit', component: DeviceEditComponent, title: "编辑设备"},

    {path: 'gateway', component: GatewaysComponent, title: "网关列表"},
    {path: 'gateway/create', component: GatewayEditComponent, title: "创建网关"},
    {path: 'gateway/:id', component: GatewayDetailComponent, title: "网关详情"},
    {path: 'gateway/:id/edit', component: GatewayEditComponent, title: "编辑网关"},

    {path: 'project', component: ProjectsComponent, title: "项目列表"},
    {path: 'project/create', component: ProjectEditComponent, title: "创建项目"},
    {path: 'project/:id', component: ProjectDetailComponent, title: "项目详情"},
    {path: 'project/:id/edit', component: ProjectEditComponent, title: "编辑项目"},
    {path: 'project/:id/user', component: ProjectUserComponent, title: "绑定用户"},

    {path: 'space', component: SpacesComponent, title: "空间列表"},
    {path: 'space/create', component: SpaceEditComponent, title: "创建空间"},
    {path: 'space/:id', component: SpaceDetailComponent, title: "空间详情"},
    {path: 'space/:id/edit', component: SpaceEditComponent, title: "空间编辑"},
    {path: 'space/:id/device', component: SpaceDeviceComponent, title: "绑定设备"},

    {path: 'plugin', component: PluginComponent, title: "插件列表"},
    {path: 'plugin/create', component: PluginEditComponent, title: "创建插件"},
    {path: 'plugin/:id', component: PluginDetailComponent, title: "插件详情"},
    {path: 'plugin/:id/edit', component: PluginEditComponent, title: "编辑插件"},


    {path: 'server', component: ServerComponent},
    {path: 'server/create', component: ServerEditComponent},
    {path: 'server/:id', component: ServerDetailComponent},
    {path: 'server/:id/edit', component: ServerEditComponent},

    {path: 'link', component: LinkComponent},
    {path: 'link/create', component: LinkEditComponent},
    {path: 'link/:id', component: LinkDetailComponent},
    {path: 'link/:id/edit', component: LinkEditComponent},

    {path: 'serial', component: SerialComponent},
    {path: 'serial/create', component: SerialEditComponent},
    {path: 'serial/:id', component: SerialDetailComponent},
    {path: 'serial/:id/edit', component: SerialEditComponent},

    {path: 'client', component: ClientComponent},
    {path: 'client/create', component: ClientEditComponent},
    {path: 'client/:id', component: ClientDetailComponent},
    {path: 'client/:id/edit', component: ClientEditComponent},

    {path: 'user', component: UsersComponent, title: "用户列表"},
    {path: 'user/create', component: UserEditComponent, title: "创建用户"},
    {path: 'user/:id', component: UserDetailComponent, title: "用户详情"},
    {path: 'user/:id/edit', component: UserEditComponent, title: "编辑用户"},

    {path: "setting/web", component: SettingWebComponent, title: "设置Web"},
    {path: "setting/database", component: SettingDatabaseComponent, title: "设置数据库"},
    {path: "setting/broker", component: SettingBrokerComponent, title: "设置数据总线"},
    {path: "setting/mqtt", component: SettingMqttComponent, title: "设置MQTT连接"},
    {path: "setting/log", component: SettingLogComponent, title: "设置日志"},
    {path: "setting/backup", component: SettingBackupComponent, title: "系统备份"},
    {path: "setting/attach", component: SettingAttachComponent, title: "附件管理"},

    {path: "web", component: WebViewComponent, title: "-"},
    {path: "alarm", component: AlarmComponent, title: "告警日志"},
    {path: "**", component: UnknownComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
