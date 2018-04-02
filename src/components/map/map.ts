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
  ILatLng,
  Polyline,
  Geocoder,
  GeocoderResult
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
 import { SharedService } from "../../shared/shared-service";
 import { Order, Location, DriverToClientNotification } from "../../shared/order/order";
 import { LocalDataService } from "../../shared/local-data.service";
 import Utils from "../../utils/utils";
 import { OrderService } from "../../shared/order/order-service";

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

  end: any;
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

  circleOptions: CircleOptions = {
    center: {lat: this.myLocation.latitude, lng: this.myLocation.longitude},
    radius: this.area,
    strokeWidth: 2,
    strokeColor: "rgba(25, 189, 255, 0.7)",
    fillColor: "rgba(25, 189, 255, 0.3)"
  }

  circle: Circle;  

  mapElement: HTMLElement;
  navigatorOptions: LaunchNavigatorOptions = {
    //app: this.launchNavigator.APP.GOOGLE_MAPS,
    transportMode: this.launchNavigator.TRANSPORT_MODE.DRIVING,
  };

  order: Order;
  orderInArea = false;
  timer: any = undefined;

  polyline: Polyline;
  marker: Marker;

  constructor(private googleMaps: GoogleMaps,
     private geolocation: Geolocation,
      private launchNavigator: LaunchNavigator,
       private sharedService: SharedService,
        private localData: LocalDataService,
      private orderService: OrderService, 
      private geocoder: Geocoder) {
    this.sharedService.sendOrder$.subscribe(
      (res: Order) =>{
        this.order = res;
        this.end = {lat: res.pickUpLocation.latitude, lng: res.pickUpLocation.longitude};
        this.setTimer(10000);
        this.calculateAndDisplayRoute({lat: this.myLocation.latitude, lng: this.myLocation.longitude}, this.end);
      });
    }

  ngOnInit() {
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
      
      this.moveCamera(this.myLocation).then(res =>{
        this.map.setVisible(true);
        this.map.setClickable(true);
        this.map.addCircle(this.circleOptions).then((circle: Circle) =>{
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
    });
  }

  addMarker(position: ILatLng) {
    if(this.marker !== undefined){
      this.marker.remove();
    }
    console.log("add order marker");
    this.map.addMarker({
      title: this.order.title,
      icon: 'red',
      animation: 'DROP',
      position: position
    }).then(marker => this.marker = marker);
  }

  moveCamera(location: Location) {
    this.mapOptions.camera.target.lat = location.latitude;
    this.mapOptions.camera.target.lng = location.longitude;
    console.log(location);
    return this.map.moveCamera(this.mapOptions.camera);
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

  calculateAndDisplayRoute(start: ILatLng, end: ILatLng) {
    if(this.polyline !== undefined){
      this.polyline.remove();
    }
    console.log("navigate");
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
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
          points: points,
          color: "black",
          width: 10
        }).then((polyline) => {
          this.polyline = polyline
          this.addMarker(end);
          console.log(polyline);
          this.geocodeCoordToAddress(end).then(res => {
            this.launchNavigator.navigate(res, this.navigatorOptions)
            .then(
              success => console.log('Launched navigator'),
              error => console.log('Error launching navigator', error)
            );
          }); 
        }); 
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  changeArea(value: number) {
    this.circle.setRadius(value);
    let offset = Utils.computeDistanceBeetweenPoints(this.circle.getCenter(), this.circle.getBounds().northeast);
    this.localData.setSearchingArea({location: {latitude: this.circle.getCenter().lat, longitude: this.circle.getCenter().lng}, offset: offset});
  }

  notifyClientOfPosition(){
    let request = new DriverToClientNotification();
    let user = this.localData.getUser();
    request.driverId = user.id;
    request.driverLocation = this.myLocation;
    request.orderId = this.order.id;
    request.orderTitle = this.order.title;
    request.topic = this.order.userId.toString();
    this.orderService.notifyClient(request).subscribe(
      res => {
        console.log("messageId: " + res)
      }, (err) => {console.log(err)});
  }

  setTimer(interval:number){
		this.timer = setInterval(() => {
            this.notifyClientOfPosition(); 
            let distance = Utils.computeDistanceBeetweenPoints({lat: this.myLocation.latitude, lng: this.myLocation.longitude}, {lat: this.order.pickUpLocation.latitude, lng: this.order.pickUpLocation.longitude}); 
            if(distance < 0.03){
              this.orderInArea = true;
            } else {
              this.orderInArea = false;
            }
        }, interval);
  }

  takeOrder(){
    this.clearTimeout();
    this.orderInArea = false;
    this.calculateAndDisplayRoute({lat: this.myLocation.latitude, lng: this.myLocation.longitude}, {lat: this.order.dropOffLocation.latitude, lng: this.order.dropOffLocation.longitude});
  }

  clearTimeout(){
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  cancelOrder(){
    this.clearTimeout();
    this.polyline.remove();
    this.marker.remove();
  }

  geocodeCoordToAddress(position: ILatLng){
    return Geocoder.geocode({position: position}).then((result: GeocoderResult[]) => {
      return result[0].extra.lines[0];
    });
  }
}
