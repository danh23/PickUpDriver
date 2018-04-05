import { Dimension } from "../order/order";

export class CarType {

    private id: number;
    private name: string;
    private dimensions: Dimension;
    private weight: number;

    constructor(){
        this.dimensions = new Dimension();
    }
}