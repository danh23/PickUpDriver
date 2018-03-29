import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedService } from "../../shared/shared-service";
import { OrderService } from "../../shared/order/order-service";
import { Order, DriverToClientNotification } from "../../shared/order/order";
import { LocalDataService } from "../../shared/local-data.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedService, private orderService: OrderService, private localData: LocalDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    console.log(this.navParams.data);
    this.orderService.getOrdersById(this.navParams.data.id).subscribe(res => {
      this.order = res;
    });
  }

  selectOrder() {
    this.notifyClient();
    this.sharedService.displayOrderOnMap(this.order);
  }

  notifyClient(){
    let request = new DriverToClientNotification();
    let user = this.localData.getUser();
    request.driverId = user.id;
    request.driverLocation = this.localData.getUserLocation();
    request.orderId = this.order.id;
    request.orderTitle = this.order.title;

    this.orderService.notifyClient(request).subscribe(
      res => {
        console.log("messageId: " + res)
      }, (err) => {console.log(err)});
  }

}
