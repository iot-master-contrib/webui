import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingWebComponent} from "./setting-web/setting-web.component";
import {SettingDatabaseComponent} from "./setting-database/setting-database.component";
import {SettingBrokerComponent} from "./setting-broker/setting-broker.component";
import {SettingMqttComponent} from "./setting-mqtt/setting-mqtt.component";
import {SettingLogComponent} from "./setting-log/setting-log.component";
import {SettingBackupComponent} from "./setting-backup/setting-backup.component";
import {SettingAttachComponent} from "./setting-attach/setting-attach.component";

const routes: Routes = [
  //{path: '', pathMatch:"full", redirectTo:"web"},
  {path: "web", component: SettingWebComponent},
  {path: "database", component: SettingDatabaseComponent},
  {path: "broker", component: SettingBrokerComponent},
  {path: "mqtt", component: SettingMqttComponent},
  {path: "log", component: SettingLogComponent},
  {path: "backup", component: SettingBackupComponent},
  {path: "attach", component: SettingAttachComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
