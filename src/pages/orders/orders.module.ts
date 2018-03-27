import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { OrdersFilter } from "../../filters/orders-filter";
import { OrderService } from "../../shared/order/order-service";

@NgModule({
  declarations: [
    OrdersPage,
    OrdersFilter
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
  ],
  providers: [
    OrderService
  ]
})
export class OrdersPageModule {}
