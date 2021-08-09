import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OrderComponent, OrderSummaryComponent, OrderDetailComponent],
  imports: [
    FormsModule,
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
