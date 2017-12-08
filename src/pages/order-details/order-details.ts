import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedService } from "../../shared/shared-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    console.log(this.navParams.data);
  }

  selectOrder() {
    this.sharedService.displayOrderOnMap(this.navParams.data);
  }

}
