import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController, IonicPage } from 'ionic-angular';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() { 
      cordova.plugins.notification.local.schedule({
        title: 'You have a nearby pickup',
        text: 'Do you want to take it?',
        actions: [
          { id: 'yes', title: 'Yes' },
          { id: 'no',  title: 'No' }
      ]
      });

    console.log(cordova.plugins.notification.local.getDefaults());
  }

}