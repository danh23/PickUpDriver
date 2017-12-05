import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { HomePage } from "./home";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    HttpModule,
    IonicModule,
    ComponentsModule
  ],
})
export class HomePageModule {}