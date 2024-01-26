import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'create', component: UserEditComponent},
  {path: ':id', component: UserDetailComponent},
  {path: 'edit/:id', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
