import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
declare var cordova: any, PushNotification: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;

  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController) {

    this.pages = [
      { title: 'Hello Ionic', component: HomePage }
    ];

    this.initCordova();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initCordova() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
      //this.listenToNotificationEvents();
      this.initFCM();
    });
  }

  initFCM() {
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
      push.subscribe('JavaSampleApproach', () => {
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

  changePage() {
    this.menuCtrl.close();
    //this.nav.push(UserInputPage);
  }
}

