export class Order {
    
    title: string;
    pickupAddress: string;
    dropOffAddress: string;
    pickUpLocation: Location;
    dropOffLocation: Location;
    pickupDate: Date;
    dropOffDate: Date;
    dimension: Dimension;
    fragile: boolean;
    vehicleType: number;
    image: string;

    constructor() {
        this.dimension = new Dimension();
        this.pickUpLocation = new Location();
        this.dropOffLocation = new Location();
    }
}
    
export class Location{
    
    latitude: number;
    longitude: number;
}
    
export class Dimension{

    width: number;
    height: number;
    length: number;
}

export class OrdersInAreaRequest{
    location: Location;
    offset: number;
}