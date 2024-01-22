import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PluginComponent} from "./plugin.component";
import {PluginDetailComponent} from "./plugin-detail/plugin-detail.component";
import {PluginEditComponent} from "./plugin-edit/plugin-edit.component";

const routes: Routes = [
  {path: '', component: PluginComponent},
  {path: ':id', component: PluginDetailComponent},
  {path: ':id/edit', component: PluginEditComponent},
  {path: 'create', component: PluginEditComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule { }
