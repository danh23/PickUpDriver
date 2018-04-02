import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { OrdersPage } from "../pages/orders/orders";
import { LocalDataService } from "../shared/local-data.service";
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var cordova: any, PushNotification: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;

  rootPage:any = LoginPage;
  pages: Array<{index: number, title: string, component: any}>;

  constructor(
    private platform: Platform,
     private statusBar: StatusBar,
      private splashScreen: SplashScreen,
       public menuCtrl: MenuController,
        private localData: LocalDataService,
        private androidPermissions: AndroidPermissions) {

    this.pages = [
      { index: 0, title: 'Orders', component: OrdersPage }
    ];

    this.initCordova(() => {
      if(this.localData.checkIsLoggedIn() === "true"){
        this.rootPage = HomePage;
      }
    });
  }

  initCordova(callback) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
      //this.listenToNotificationEvents();
      callback && callback();
    });
  }

  requestPermisions(){
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
    ]);
  }

  changePage(index: number) {
    this.menuCtrl.close();
    let page = this.pages.find(page => page.index == index);
    this.nav.push(page.component);
  }

  logout(){
    this.menuCtrl.close();
    this.localData.logout();
    this.nav.setRoot(LoginPage);
  }
}

