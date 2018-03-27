import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order, Location, OrdersInAreaRequest } from "../../shared/order/order";
import { OrderDetailsPage } from "../order-details/order-details";
import { OrderService } from "../../shared/order/order-service";
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  location: Location = new Location();
  offset: number= 4;
  orders: Order[] = [];
  orderTitle: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    let orderRequest = new OrdersInAreaRequest();
    orderRequest.location = this.location;
    orderRequest.offset = this.offset;
    this.orderService.getOrdersInArea(orderRequest).subscribe(res => {
      this.orders = res;
    }, (err) => {console.log(err)});
  }

  orderSelected(order: Order) {
    this.navCtrl.push(OrderDetailsPage, order);
  }

}
