import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DevicesComponent} from "./devices/devices.component";
import {DeviceDetailComponent} from "./device-detail/device-detail.component";
import {DeviceEditComponent} from "./device-edit/device-edit.component";

const routes: Routes = [
  {path: '', component: DevicesComponent},
  {path: 'create', component: DeviceEditComponent},
  {path: ':id', component: DeviceDetailComponent},
  {path: ':id/edit', component: DeviceEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
