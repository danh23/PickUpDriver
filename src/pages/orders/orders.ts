import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from "../../shared/order/order";
import { OrderDetailsPage } from "../order-details/order-details";

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

  orders: Order[] = [];
  orderTitle: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    let order = new Order();
    order.title = "Order 1";
    this.orders.push(order);
    order = new Order();
    order.title = "Order 2";
    this.orders.push(order);
    order = new Order();
    order.title = "Order 3";
    this.orders.push(order);
  }

  orderSelected(order: Order) {
    this.navCtrl.push(OrderDetailsPage, order);
  }

}
