import { ILatLng } from "@ionic-native/google-maps";
import { Location } from "../shared/order/order";

export default class Utils {
    
    static computeDistanceBeetweenPoints(pointA: ILatLng, pointB: ILatLng){
        let earthRadiusKm = 6371;
      
        let dLat = this.degreesToRadians(pointB.lat-pointA.lat);
        let dLon = this.degreesToRadians(pointB.lng-pointA.lng);
      
        let lat1 = this.degreesToRadians(pointA.lat);
        let lat2 = this.degreesToRadians(pointB.lng);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }
  
    static degreesToRadians(degrees){
      return degrees * Math.PI / 180;
    }
}