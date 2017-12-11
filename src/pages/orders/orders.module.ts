import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { OrdersFilter } from "../../filters/orders-filter";

@NgModule({
  declarations: [
    OrdersPage,
    OrdersFilter
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
  ],
})
export class OrdersPageModule {}
