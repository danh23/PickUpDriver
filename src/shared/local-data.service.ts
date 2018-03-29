import { Injectable } from "@angular/core";
import { User } from "./user/user";
import { Location, OrdersInAreaRequest } from "./order/order";

@Injectable()
export class LocalDataService {
    private isLoggedIn: boolean = false;
    private isAdmin: boolean;
    private user: User;
    private userLocation: Location;
    private searchingArea: OrdersInAreaRequest;

    constructor() {
    }

    public login(user: User){
        this.user = user;
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("loggedIn", "true");
    }

    public checkIsLoggedIn(){
        return localStorage.getItem("loggedIn");
    }

    public getUser(){
        if(this.user === undefined){
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        return this.user;
    }

    public logout(){
        localStorage.clear();
    }

    public setUserLocation(location: Location){
        this.userLocation = location;
    }

    public getUserLocation(){
        return this.userLocation;
    }

    public setSearchingArea(area: OrdersInAreaRequest){
        this.searchingArea = area;
    }

    public getSearchingArea(){
        return this.searchingArea;
    }

}