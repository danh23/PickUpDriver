import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  CircleOptions,
  Circle,
  ILatLng
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
 import { SharedService } from "../../shared/shared-service";
 import { Order, Location } from "../../shared/order/order";
 import { LocalDataService } from "../../shared/local-data.service";
 import Utils from "../../utils/utils";

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

  start: any = 'bucuresti';
  end: any = 'vaslui';
  map: GoogleMap;
  myLocation: Location = {
    latitude: 0,
    longitude: 0
  };
  area: number = 10;
  
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

  areaOptions: CircleOptions = {
    center: {lat: this.myLocation.latitude, lng: this.myLocation.longitude},
    radius: this.area,
    strokeWidth: 2
  }

  circle: Circle;  

  mapElement: HTMLElement;
  navigatorOptions: LaunchNavigatorOptions = {
    //app: this.launchNavigator.APP.GOOGLE_MAPS,
    transportMode: this.launchNavigator.TRANSPORT_MODE.DRIVING
  };

  constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, private launchNavigator: LaunchNavigator, private sharedService: SharedService, private localData: LocalDataService) { }

  ngOnInit() {
    console.log("map view loaded");
    this.sharedService.sendOrder$.subscribe((order: Order) => {
      console.log("order marker added");
      this.addOrderMarker(order);
      this.end = {lat: order.dropOffLocation.latitude, lng: order.dropOffLocation.longitude }
    });
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
      this.myLocation.latitude = resp.coords.latitude;
      this.myLocation.longitude= resp.coords.longitude;

      this.localData.setUserLocation(this.myLocation);
      
      this.moveCamera(this.myLocation);
      this.map.setVisible(true);
      this.map.setClickable(true);
      this.map.addCircle(this.areaOptions).then((circle: Circle) =>{
        this.circle = circle;
        this.localData.setSearchingArea({location: this.myLocation, offset: Utils.computeDistanceBeetweenPoints(this.circle.getCenter(), this.circle.getBounds().northeast)});
        this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe(() => {
          circle.setCenter(this.map.getCameraTarget());
          this.localData.setSearchingArea({location: {latitude: this.map.getCameraTarget().lat, longitude: this.map.getCameraTarget().lng}, offset: Utils.computeDistanceBeetweenPoints(this.circle.getCenter(), this.circle.getBounds().northeast)});
        });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });  
  }

  addMarker(location: Location) {
      console.log("add marker");
      console.log(location);
      this.map.addMarker({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {lat: location.latitude, lng: location.longitude}
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            alert('clicked');
          });
      });
    }

    addOrderMarker(order: Order) {
      console.log("add order marker");
      this.map.addMarker({
        title: order.title,
        icon: 'red',
        animation: 'DROP',
        position: {lat: order.pickUpLocation.latitude, lng: order.pickUpLocation.longitude}
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            alert('clicked');
          });
      });
    }

  moveCamera(location: Location) {
    this.mapOptions.camera.target.lat = location.latitude;
    this.mapOptions.camera.target.lng = location.longitude;
    console.log(location);
    this.map.moveCamera(this.mapOptions.camera).then(()=>{
      console.log("camera moved");
    });
  }

  getCurrentPosition() {
    return this.geolocation.getCurrentPosition();
  }

  updatePosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((resp) => {
      this.myLocation.latitude = resp.coords.latitude;
      this.myLocation.longitude = resp.coords.longitude;
      this.localData.setUserLocation(this.myLocation);
    });
  }

  calculateAndDisplayRoute() {
      console.log("navigate");
        this.directionsService.route({
          origin: {lat: this.myLocation.latitude, lng: this.myLocation.longitude},
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

  changeArea(value: number) {
    this.circle.setRadius(value);
    let offset = Utils.computeDistanceBeetweenPoints(this.circle.getCenter(), this.circle.getBounds().northeast);
    this.localData.setSearchingArea({location: {latitude: this.circle.getCenter().lat, longitude: this.circle.getCenter().lng}, offset: offset});
  }
}
