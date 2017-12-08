import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from "../pages/login/login";

import { GoogleMaps, Geocoder} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { LoginPageModule } from "../pages/login/login.module";
import { ComponentsModule } from "../components/components.module";
import { HomePageModule } from "../pages/home/home.module";
import { OrdersPageModule } from "../pages/orders/orders.module";
import { OrderDetailsPageModule } from "../pages/order-details/order-details.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    LoginPageModule,
    ComponentsModule,
    OrdersPageModule,
    OrderDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GoogleMaps,
    Geocoder,
    Geolocation,
    LaunchNavigator
  ]
})
export class AppModule {}
