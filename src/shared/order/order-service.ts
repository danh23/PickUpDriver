import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Config } from "../../config/config";
import { endpoints } from "../../config/endpoint";
import { OrdersInAreaRequest, DriverToClientNotification } from "./order";


@Injectable()
export class OrderService {

    private options: RequestOptions;
    
    constructor(private http: Http) {}

    getOrdersInArea(request: OrdersInAreaRequest) {
        let url = Config.apiUrl + endpoints.getOrdersInArea
        let result = this.http.post(url, request, this.options)
          .map(response => response.json())
          .do(data => console.log("Do data: " + JSON.stringify(data)))
          .catch(this.handleError);
        return result;
    }

    public getOrdersById(orderId: number) {
        let url = Config.apiUrl + endpoints.getOrderById + "/" + orderId;
        let result = this.http.get(url, this.options)
        .map(response => response.json())
        .do(data => console.log("Do data: " + JSON.stringify(data)))
        .catch(this.handleError);
        return result;
    }

    notifyClient(request: DriverToClientNotification) {
        let url = Config.apiUrl + endpoints.notifyClient
        let result = this.http.post(url, request, this.options)
          .map(response => response.json())
          .do(data => console.log("Do data: " + JSON.stringify(data)))
          .catch(this.handleError);
        return result;
    }

    private handleError(err) {
        let errMessage: string;
        if (err instanceof Response) {
            let body = err.json() || '';
            errMessage = body.message;
        } else {
            errMessage = err.meessage ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
    }
}