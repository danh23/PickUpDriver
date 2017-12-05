import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";

 declare var google: any;
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit{

  start = 'bucuresti';
  end = 'vaslui';
  map: GoogleMap;
  myLocation = {
    lat: 0,
    lng: 0
  };
  
  directionsService = new google.maps.DirectionsService;
  mapOptions: GoogleMapOptions = {
    controls: {
      compass: true,
      myLocationButton: true,
      indoorPicker: true,
      zoom: true
    },
    camera: {
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30,
    },
    mapType: 'MAP_TYPE_ROADMAP'
  };
  mapElement: HTMLElement;
  navigatorOptions: LaunchNavigatorOptions = {
    //app: this.launchNavigator.APP.GOOGLE_MAPS,
    transportMode: this.launchNavigator.TRANSPORT_MODE.DRIVING
  };
  constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, private launchNavigator: LaunchNavigator) { }

  ngOnInit() {
    console.log("map view loaded");
    this.loadMap();
  }

 loadMap() {
   console.log("load map");
  this.mapElement = document.getElementById('map');

    this.map = GoogleMaps.create(this.mapElement, this.mapOptions);
    this.map.setVisible(false);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.initMap();
      });
  }

  initMap() {
    this.getCurrentPosition().then((resp) => {
      this.myLocation.lat = resp.coords.latitude;
      this.myLocation.lng = resp.coords.longitude;
      this.moveCamera(this.myLocation);
      this.map.setVisible(true);
      this.map.setClickable(true);
    }).catch((error) => {
      console.log('Error getting location', error);
    });  
  }

  addMarker(latLng) {
      console.log("add marker");
      console.log(latLng);
      this.map.addMarker({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {lat: latLng.lat, lng: latLng.lng}
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            alert('clicked');
          });
      });
    }

  moveCamera(location) {
    this.mapOptions.camera.target.lat = location.lat;
    this.mapOptions.camera.target.lng = location.lng;
    console.log(location);
    this.map.moveCamera(this.mapOptions.camera).then(()=>{
      this.addMarker(location);
      console.log("camera moved");
    });
  }

  getCurrentPosition() {
    return this.geolocation.getCurrentPosition();
  }

  updatePosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((resp) => {
      this.myLocation.lat = resp.coords.latitude;
      this.myLocation.lng = resp.coords.longitude;
    });
  }

  calculateAndDisplayRoute() {
      console.log("navigate");
        this.directionsService.route({
          origin: {lat: this.myLocation.lat, lng: this.myLocation.lng},
          destination: this.end,
          travelMode: 'DRIVING'
        }, (response, status) => {
          debugger;
          console.log(response);
          if (status === 'OK') {
            let points = [];
            let steps = response.routes[0].legs[0].steps;
            steps.forEach(step => {
              step.path.forEach(point => {
                points.push({lat: point.lat(), lng: point.lng()})
              });
            });
            this.map.addPolyline({
              "points": points,
              color: "black",
              width: 10
            }).then((polyline) => {
              console.log(polyline);
            }) 
          } else {
            window.alert('Directions request failed due to ' + status);
          }
          this.launchNavigator.navigate(this.end, this.navigatorOptions)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
        });
      }

}
