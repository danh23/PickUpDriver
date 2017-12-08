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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.orders.push(new Order());
    this.orders.push(new Order());
    this.orders.push(new Order());
  }

  orderSelected(order: Order) {
    this.navCtrl.push(OrderDetailsPage, order);
  }

}
