import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GatewayComponent} from "./gateway.component";
import {GatewayEditComponent} from "./gateway-edit/gateway-edit.component";
import {GatewayDetailComponent} from "./gateway-detail/gateway-detail.component";

const routes: Routes = [
  {path: '', component: GatewayComponent},
  {path: 'create', component: GatewayEditComponent},
  {path: ':id', component: GatewayDetailComponent},
  {path: ':id/edit', component: GatewayEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewayRoutingModule { }