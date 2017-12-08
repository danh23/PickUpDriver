import { Injectable } from "@angular/core";
import { Subject }    from 'rxjs/Subject';
import { Order } from "./order/order";

@Injectable()
export class SharedService {

    private sendOrder = new Subject<Order>();  

    sendOrder$ = this.sendOrder.asObservable();

    displayOrderOnMap(data: Order) {
        this.sendOrder.next(data);
    }

}