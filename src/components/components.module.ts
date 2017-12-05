import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { MapControlsComponent } from './map-controls/map-controls';
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "ionic-angular";
import { GoogleMaps } from "@ionic-native/google-maps";

@NgModule({
	declarations: [MapComponent,
    MapControlsComponent],
	imports: [
		BrowserModule,
		IonicModule
	],
	exports: [
		MapComponent,
		MapControlsComponent
	]
})
export class ComponentsModule {}
