import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class OrderService {

    constructor(private http: Http) {   
    }

    getAllOrders() {
        return this.http.get("")
        .map(resp => resp.json())
        .catch((err) => {
            return Observable.throw(err);
        });
    }

}