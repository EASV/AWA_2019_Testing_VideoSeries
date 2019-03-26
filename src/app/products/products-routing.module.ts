import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductAddComponent} from './product-add/product-add.component';

const routes: Routes = [
  {
    // /products/add
    path: 'add',
    component: ProductAddComponent
  },
  {
    // /products
    path: '',
    component: ProductsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
