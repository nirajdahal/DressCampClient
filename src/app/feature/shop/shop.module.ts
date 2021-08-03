import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopComponent } from './shop.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    ProductItemComponent,
    ShopComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class ShopModule { }
