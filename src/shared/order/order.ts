export class Order {
    
    id: number;
    userId: number;
    title: string;
    pickUpAddress: string;
    dropOffAddress: string;
    pickUpLocation: Location;
    dropOffLocation: Location;
    pickupDate: Date;
    dropOffDate: Date;
    dimensions: Dimension;
    fragile: boolean;
    vehicleType: number;
    image: string;

    constructor() {
        this.dimensions = new Dimension();
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
    
    constructor(){
        this.location = new Location();
    }
}

export class DriverToClientNotification {
    topic: string;
    driverId: number;
    orderId: number;
    orderTitle: string;
    driverLocation: Location;
    scope: string;
    estimatedTime: string;

    constructor(){
        this.driverLocation = new Location();
    }
}