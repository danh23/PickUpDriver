import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverSettingsPage } from './driver-settings';

@NgModule({
  declarations: [
    DriverSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverSettingsPage),
  ],
})
export class DriverSettingsPageModule {}
