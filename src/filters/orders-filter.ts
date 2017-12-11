import { Pipe, PipeTransform } from '@angular/core';
import { Order } from "../shared/order/order";

@Pipe({
    name: 'ordersFilter',
    pure: false
})
export class OrdersFilter implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter || filter == "") {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.title == filter);
    }
}