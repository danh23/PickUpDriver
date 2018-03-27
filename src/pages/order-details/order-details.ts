import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedService } from "../../shared/shared-service";
import { OrderService } from "../../shared/order/order-service";
import { Order } from "../../shared/order/order";

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  order: Order = new Order();

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedService, private orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    console.log(this.navParams.data);
    this.orderService.getOrdersInArea(this.navParams.get("order").id).subscribe(res => {
      this.order = res;
    });
  }

  selectOrder() {
    this.sharedService.displayOrderOnMap(this.navParams.data);
  }

}
