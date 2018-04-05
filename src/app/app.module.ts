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
import { SharedService } from "../shared/shared-service";
import { RequestOptions } from "@angular/http";
import { Interceptor } from "../config/interceptor";
import { OrderService } from "../shared/order/order-service";
import { LocalDataService } from "../shared/local-data.service";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { DriverSettingsPageModule } from "../pages/driver-settings/driver-settings.module";

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
    OrderDetailsPageModule,
    DriverSettingsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    LocalDataService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GoogleMaps,
    Geocoder,
    Geolocation,
    AndroidPermissions,
    LaunchNavigator,
    SharedService,
    OrderService,
    {provide: RequestOptions, useClass: Interceptor},
  ]
})
export class AppModule {}
