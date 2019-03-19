import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FilesModule} from '../files/files.module';
import { ProductAddComponent } from './product-add/product-add.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [ProductsListComponent, ProductAddComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FilesModule,
    ImageCropperModule
  ]
})
export class ProductsModule { }
