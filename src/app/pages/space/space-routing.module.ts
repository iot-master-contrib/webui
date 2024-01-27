import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpaceDetailComponent} from "./space-detail/space-detail.component";
import {SpaceEditComponent} from "./space-edit/space-edit.component";
import {SpacesComponent} from "./spaces/spaces.component";
import {SpaceDeviceComponent} from "./space-device/space-device.component";

const routes: Routes = [
  {path: '', component: SpacesComponent},
  {path: 'create', component: SpaceEditComponent},
  {path: ':id', component: SpaceDetailComponent},
  {path: ':id/edit', component: SpaceEditComponent},
  {path: ':id/device', component: SpaceDeviceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceRoutingModule {
}
