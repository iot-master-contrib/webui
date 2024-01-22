import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductEditEventComponent} from "./product-edit-event/product-edit-event.component";
import {ProductEditActionComponent} from "./product-edit-action/product-edit-action.component";
import {ProductComponent} from "./product.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductEditPropertyComponent} from "./product-edit-property/product-edit-property.component";

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: ':id', component: ProductDetailComponent},
  {path: ':id/edit', component: ProductEditComponent},
  {path: ':id/edit/property', component: ProductEditPropertyComponent},
  {path: ':id/edit/event', component: ProductEditEventComponent},
  {path: ':id/edit/action', component: ProductEditActionComponent},
  {path: 'create', component: ProductEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
