import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
declare var google: any;
/**
 * Generated class for the MapControlsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map-controls',
  templateUrl: 'map-controls.html'
})
export class MapControlsComponent implements AfterViewInit{

  startLocationInput: HTMLInputElement;
  startAutocomplete: any;
  endLocationInput: HTMLInputElement;
  endAutocomplete: any;

  @Output() 
  placesUpdated = new EventEmitter();

  constructor() {
    console.log("View map controls constructed");
  }

  ngAfterViewInit(): void {
    console.log("View map controls init");
    this.startLocationInput = <HTMLInputElement>document.getElementById('pickup').getElementsByTagName('input')[0];
    this.startAutocomplete = new google.maps.places.Autocomplete(this.startLocationInput);
    this.endLocationInput = <HTMLInputElement>document.getElementById('dropoff').getElementsByTagName('input')[0];
    this.endAutocomplete = new google.maps.places.Autocomplete(this.endLocationInput);
  }

  calculateAndDisplayRoute() {
    alert(this.startAutocomplete + ' ' + this.endAutocomplete);
    this.placesUpdated.emit("");
  }

  // calculateAndDisplayRoute() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

}