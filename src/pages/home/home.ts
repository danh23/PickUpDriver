import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController, IonicPage } from 'ionic-angular';
import { LocalDataService } from "../../shared/local-data.service";
declare var cordova: any, PushNotification: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private localData: LocalDataService) {
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
    this.initFCM();
  }

  initFCM() {
    let user = this.localData.getUser();

    const push = PushNotification.init({
      android: {
      },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false'
      },
    });

    push.on('registration', (data) => {
      console.log("FCM registrationID: " + data.registrationId);
      console.log("FCM registrationType: " + data.registrationType);
      push.subscribe(user.id, () => {
        console.log('success');
      }, (e) => {
        console.log('error:', e);
      });
    });

    push.on('notification', (data) => {
      console.log("notification received");
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });
  }

}