export class Order {
    
        pickup: string;
        dropoff: string;
        pickupDate: Date;
        size: Size;
        fragile: boolean;
        vehicleType: number;
        image: string;

        constructor() {
            this.size = new Size();
        }
}
    
export class Size {

    height: number;
    width: number;
    length: number;
}