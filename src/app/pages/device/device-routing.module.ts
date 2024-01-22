import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeviceComponent} from "./device.component";
import {DeviceDetailComponent} from "./device-detail/device-detail.component";
import {DeviceEditComponent} from "./device-edit/device-edit.component";

const routes: Routes = [
  {path: '', component: DeviceComponent},
  {path: ':id', component: DeviceDetailComponent},
  {path: ':id/edit', component: DeviceEditComponent},
  {path: 'create', component: DeviceEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
