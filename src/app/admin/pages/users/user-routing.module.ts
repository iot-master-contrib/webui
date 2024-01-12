import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';  
import { UserComponent } from './user/user.component'; 
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";  
const routes: Routes = [
  {path: '', component: UserComponent}, 
 
  {path: 'detail/:id', component: UserDetailComponent},
  {path: 'edit/:id', component: UserEditComponent},
  {path: 'create', component: UserEditComponent},  
 
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
