import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarType } from "../../shared/carType/car-type";
import { User } from "../../shared/user/user";
import { UserProvider } from "../../providers/user/user";
import { Observable } from "rxjs/Observable";
import { LocalDataService } from "../../shared/local-data.service";

/**
 * Generated class for the DriverSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver-settings',
  templateUrl: 'driver-settings.html',
})
export class DriverSettingsPage {

  carType: CarType = new CarType();
  carTypes: Observable<CarType[]>;
  user: User = new User();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserProvider,
    private localData: LocalDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverSettingsPage');
    this.user = this.localData.getUser();
    this.carTypes = this.userService.getCarTypes();
  }

  saveDriverSettings(){

  }

}
